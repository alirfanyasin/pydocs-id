"use client";

import { useEffect, useRef, useState } from "react";
import { flushDrafts, queueDraft, readDraft, type EditorSnapshot } from "./browser-storage";

export function useBrowserState<T>(key: string, initialValue: T, validate: (value: unknown) => value is T) {
  const [value, setValue] = useState(initialValue);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw && raw.length <= 64_000) {
        const parsed: unknown = JSON.parse(raw);
        if (validate(parsed)) setValue(parsed);
      }
    } catch { /* Invalid or unavailable storage must not break learning. */ }
    setReady(true);
  }, [key, validate]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage is optional. */ }
  }, [key, ready, value]);
  return [value, setValue] as const;
}

// Only edited/running examples are stored. One shared debounce batches all editors.
export function useEditorPersistence(key: string, snapshot: EditorSnapshot, restore: (saved: EditorSnapshot) => void) {
  const restoreRef = useRef(restore);
  const initial = useRef(snapshot);
  const lastSaved = useRef("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = readDraft(key);
    const merged = { ...initial.current };
    if (saved) {
      for (const field of Object.keys(merged)) {
        if (!Object.hasOwn(saved, field)) continue;
        const value = saved[field];
        const valid = merged[field] === null
          ? value === null || (field === "isPassed" ? typeof value === "boolean" : field === "execTimeMs" ? typeof value === "number" : typeof value === "string")
          : typeof merged[field] === typeof value;
        if (valid) merged[field] = value;
      }
      restoreRef.current(merged);
    }
    lastSaved.current = JSON.stringify(merged);
    setReady(true);
    return flushDrafts;
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    const serialized = JSON.stringify(snapshot);
    if (serialized === lastSaved.current) return;
    lastSaved.current = serialized;
    queueDraft(key, snapshot);
  }, [key, ready, snapshot]);
}
