"use client";

import React, { useRef } from "react";

interface PythonSyntaxEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  readOnly?: boolean;
  minRows?: number;
  autoFocus?: boolean;
}

export function highlightPythonLine(line: string): React.ReactNode {
  const commentIndex = findCommentStart(line);
  let codePart = line;
  let commentPart = "";

  if (commentIndex !== -1) {
    codePart = line.slice(0, commentIndex);
    commentPart = line.slice(commentIndex);
  }

  const tokenRegex =
    /(f?"[^"]*"|f?'[^']*'|"""[\s\S]*?"""|'''[\s\S]*?'''|\b(?:def|return|if|elif|else|match|case|for|while|in|and|or|not|True|False|None|try|except|finally|break|continue|import|from|as|class|pass|lambda|global|nonlocal)\b|\b(?:print|input|type|int|float|str|bool|len|range|list|dict|set|tuple|enumerate|sorted|sum|min|max|round|abs|zip|map|filter|ZeroDivisionError|TypeError|ValueError|IndexError|KeyError)\b|\b\d+(?:_\d+)*(?:\.\d+)?\b)/g;

  const parts = codePart.split(tokenRegex);

  const keywords = new Set([
    "def",
    "return",
    "if",
    "elif",
    "else",
    "match",
    "case",
    "for",
    "while",
    "in",
    "and",
    "or",
    "not",
    "True",
    "False",
    "None",
    "try",
    "except",
    "finally",
    "break",
    "continue",
    "import",
    "from",
    "as",
    "class",
    "pass",
    "lambda",
    "global",
    "nonlocal",
  ]);

  const builtins = new Set([
    "print",
    "input",
    "type",
    "int",
    "float",
    "str",
    "bool",
    "len",
    "range",
    "list",
    "dict",
    "set",
    "tuple",
    "enumerate",
    "sorted",
    "sum",
    "min",
    "max",
    "round",
    "abs",
    "zip",
    "map",
    "filter",
    "ZeroDivisionError",
    "TypeError",
    "ValueError",
    "IndexError",
    "KeyError",
  ]);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (
          part.startsWith('"') ||
          part.startsWith("'") ||
          part.startsWith('f"') ||
          part.startsWith("f'")
        ) {
          return (
            <span key={i} className="text-emerald-300">
              {part}
            </span>
          );
        }
        if (keywords.has(part)) {
          return (
            <span key={i} className="text-pink-400 font-semibold">
              {part}
            </span>
          );
        }
        if (builtins.has(part)) {
          return (
            <span key={i} className="text-sky-300">
              {part}
            </span>
          );
        }
        if (/^\d+(?:_\d+)*(?:\.\d+)?$/.test(part)) {
          return (
            <span key={i} className="text-amber-300">
              {part}
            </span>
          );
        }
        return (
          <span key={i} className="text-slate-100">
            {part}
          </span>
        );
      })}
      {commentPart && (
        <span className="text-slate-400 italic">{commentPart}</span>
      )}
    </>
  );
}

function findCommentStart(line: string): number {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === "#" && !inSingle && !inDouble) return i;
  }
  return -1;
}

export default function PythonSyntaxEditor({
  value,
  onChange,
  readOnly = false,
  minRows = 4,
  autoFocus = false,
}: PythonSyntaxEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const lines = value.split("\n");
  const rowCount = Math.max(minRows, lines.length);
  const editorHeightPx = rowCount * 24 + 24; // 24px line-height + 24px vertical padding

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const nextValue = value.substring(0, start) + "    " + value.substring(end);
      onChange(nextValue);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            start + 4;
        }
      });
    }
  };

  return (
    <div className="relative flex bg-[#0f172a] font-mono text-sm leading-6 select-text">
      {/* Line numbers gutter */}
      <div
        aria-hidden="true"
        className="select-none py-3 px-3 text-right text-slate-500 bg-[#0b1120] border-r border-slate-800/90 shrink-0 min-w-[2.75rem]"
      >
        {lines.map((_, idx) => (
          <div key={idx} className="leading-6">
            {idx + 1}
          </div>
        ))}
      </div>

      {/* Layered Highlighted Code + Transparent Textarea */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{ minHeight: `${editorHeightPx}px` }}
      >
        {/* Syntax-Highlighted Backdrop */}
        <pre
          ref={preRef}
          aria-hidden="true"
          className="m-0 py-3 px-4 font-mono text-sm leading-6 whitespace-pre overflow-x-auto pointer-events-none select-none min-h-full"
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-6 min-h-[24px]">
              {line.length > 0 ? highlightPythonLine(line) : " "}
            </div>
          ))}
        </pre>

        {/* Editable Transparent Textarea Overlay */}
        {!readOnly && (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus={autoFocus}
            className="absolute inset-0 w-full h-full m-0 py-3 px-4 font-mono text-sm leading-6 bg-transparent text-transparent caret-amber-400 selection:bg-blue-500/35 resize-none focus:outline-none whitespace-pre overflow-x-auto"
          />
        )}
      </div>
    </div>
  );
}

