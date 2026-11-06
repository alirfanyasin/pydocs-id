"use client";

import React from "react";

interface InlineCodeTextProps {
  text: string;
  className?: string;
}

const CODE_BADGE_CLASS =
  "inline-block px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-200/90 dark:bg-slate-800 text-sky-700 dark:text-amber-300 border border-slate-300 dark:border-slate-600 font-mono text-[0.86em] font-semibold leading-snug";

const BOLD_TEXT_CLASS = "font-bold text-slate-900 dark:text-white";

// Auto-highlight clear code tokens even when not wrapped in backticks
const AUTO_CODE_REGEX =
  /(\b(?:str|int|float|bool|NoneType|None|True|False|f-string|match-case|if-elif-else|if-else)\b|\b[a-zA-Z_]\w*\([^)]*\)|\.[a-zA-Z_]\w*\([^)]*\)|\b[a-z]+_[a-z0-9_]+\b|\b(?:sep|end)=['"][^'"]*['"])/g;

const EXACT_AUTO_TOKENS = new Set([
  "str",
  "int",
  "float",
  "bool",
  "NoneType",
  "None",
  "True",
  "False",
  "f-string",
  "match-case",
  "if-elif-else",
  "if-else",
]);

function renderPlainWithAutoCode(segment: string, keyPrefix: string) {
  const parts = segment.split(AUTO_CODE_REGEX);
  return parts.map((part, idx) => {
    if (!part) return null;
    const isAutoMatch =
      EXACT_AUTO_TOKENS.has(part) ||
      /^[a-zA-Z_]\w*\([^)]*\)$/.test(part) ||
      /^\.[a-zA-Z_]\w*\([^)]*\)$/.test(part) ||
      /^[a-z]+_[a-z0-9_]+$/.test(part) ||
      /^(?:sep|end)=['"][^'"]*['"]$/.test(part);

    if (isAutoMatch) {
      return (
        <code key={`${keyPrefix}-${idx}`} className={CODE_BADGE_CLASS}>
          {part}
        </code>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${idx}`}>{part}</React.Fragment>;
  });
}

function renderBoldAndAutoCode(segment: string, keyPrefix: string) {
  // Match **bold** or *bold* (e.g., *Conditional Statement*) and render as bold
  const boldParts = segment.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*?\*)/g);
  return boldParts.map((part, idx) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const inner = part.slice(2, -2);
      return (
        <strong key={`${keyPrefix}-b-${idx}`} className={BOLD_TEXT_CLASS}>
          {renderPlainWithAutoCode(inner, `${keyPrefix}-bi-${idx}`)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      const inner = part.slice(1, -1);
      return (
        <strong key={`${keyPrefix}-s-${idx}`} className={BOLD_TEXT_CLASS}>
          {renderPlainWithAutoCode(inner, `${keyPrefix}-si-${idx}`)}
        </strong>
      );
    }
    return (
      <React.Fragment key={`${keyPrefix}-p-${idx}`}>
        {renderPlainWithAutoCode(part, `${keyPrefix}-pi-${idx}`)}
      </React.Fragment>
    );
  });
}

export default function InlineCodeText({
  text,
  className = "",
}: InlineCodeTextProps) {
  if (!text) return null;

  // Split by explicit markdown backticks `...` first so *args / **kwargs inside `...` stay intact
  const segments = text.split(/(`[^`]+`)/g);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.startsWith("`") && seg.endsWith("`") && seg.length > 2) {
          const inner = seg.slice(1, -1);
          return (
            <code key={i} className={CODE_BADGE_CLASS}>
              {inner}
            </code>
          );
        }
        return (
          <React.Fragment key={i}>
            {renderBoldAndAutoCode(seg, `seg-${i}`)}
          </React.Fragment>
        );
      })}
    </span>
  );
}
