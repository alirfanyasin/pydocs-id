export const DRAFT_KEY = "pydocs_editor_drafts_v1";
export const MAX_DRAFT_CHARS = 512_000; // At most ~1 MB in UTF-16, separate from progress.
const MAX_DRAFTS = 80;
const MAX_AGE = 90 * 24 * 60 * 60 * 1000;

export function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.length <= 1000 && value.every(item => typeof item === "string" && item.length < 200);
}
export function isQuizAnswers(value: unknown): value is Record<string, number> {
  return !!value && typeof value === "object" && !Array.isArray(value) && Object.entries(value).length <= 2000 && Object.entries(value).every(([key, answer]) => key.length < 200 && Number.isInteger(answer) && Number(answer) >= 0 && Number(answer) < 100);
}
export function isChapterId(value: unknown): value is string {
  return typeof value === "string" && value.length < 200;
}

export type EditorSnapshot = Record<string, string | number | boolean | null>;
interface Draft { updatedAt: number; data: EditorSnapshot }

export function compactDrafts(value: unknown, now = Date.now()): Record<string, Draft> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const entries = Object.entries(value).filter(([key, draft]) =>
    key.length < 250 && draft && typeof draft.updatedAt === "number" &&
    draft.updatedAt <= now && now - draft.updatedAt < MAX_AGE &&
    draft.data && typeof draft.data === "object" && !Array.isArray(draft.data),
  ).sort((a, b) => b[1].updatedAt - a[1].updatedAt).slice(0, MAX_DRAFTS);
  const result: Record<string, Draft> = {};
  let size = 2;
  for (const [key, draft] of entries) {
    const data: EditorSnapshot = {};
    for (const [field, val] of Object.entries(draft.data)) {
      if (field.length > 50) continue;
      if (typeof val === "string") {
        const limit = field === "code" ? 32_000 : field === "stdinValue" ? 8_000 : 4_000;
        data[field] = val.slice(0, limit);
      } else if (val === null || typeof val === "boolean" || (typeof val === "number" && Number.isFinite(val))) {
        data[field] = val;
      }
    }
    const entry = { updatedAt: draft.updatedAt, data };
    size += JSON.stringify({ [key]: entry }).length + 1;
    if (size > MAX_DRAFT_CHARS) continue;
    Object.defineProperty(result, key, { value: entry, enumerable: true, configurable: true, writable: true });
  }
  return result;
}

let drafts: Record<string, Draft> | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let dirty = false;
function getDrafts() {
  if (drafts) return drafts;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    drafts = compactDrafts(raw && raw.length <= MAX_DRAFT_CHARS ? JSON.parse(raw) : {});
  } catch { drafts = {}; }
  window.addEventListener("pagehide", flushDrafts);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushDrafts();
  });
  return drafts;
}
export function readDraft(key: string): EditorSnapshot | undefined {
  const all = getDrafts();
  return Object.hasOwn(all, key) ? all[key].data : undefined;
}
export function queueDraft(key: string, data: EditorSnapshot) {
  const all = getDrafts();
  Object.defineProperty(all, key, { value: { updatedAt: Date.now(), data }, enumerable: true, configurable: true, writable: true });
  dirty = true;
  clearTimeout(timer);
  timer = setTimeout(flushDrafts, 500);
}
export function flushDrafts() {
  clearTimeout(timer);
  if (!dirty || !drafts) return;
  drafts = compactDrafts(drafts);
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts)); } catch { /* Quota/private mode: keep the editor usable. */ }
  dirty = false;
}
