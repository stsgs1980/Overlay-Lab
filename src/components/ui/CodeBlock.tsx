"use client";

import { cn } from "@/lib/utils";
import type { JSX } from "react";
import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  filename?: string;
}

/** Консоль-стайл блок кода с копированием в один клик */
export function CodeBlock({ code, filename = "Pattern.tsx" }: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      /* буфер обмена недоступен — не роняем UI */
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/[.08] bg-[#0D0E13]">
      <div className="flex items-center gap-2 border-b border-white/[.06] px-3.5 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <i className="h-2.5 w-2.5 rounded-full bg-lime-400/70" />
        </span>
        <span className="ml-1 truncate font-mono text-[10.5px] text-zinc-500">{filename}</span>
        <button
          type="button"
          onClick={() => {
            void copy();
          }}
          className="ml-auto flex h-6 items-center gap-1 rounded-md px-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-colors hover:bg-white/[.06] hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-lime-400/60"
          aria-live="polite"
        >
          {copied ? (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 6.2 4.8 9 10 3.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              copied
            </>
          ) : (
            <>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="4" y="4" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
                <path
                  d="M8 4V2.6A1.1 1.1 0 0 0 6.9 1.5H2.6A1.1 1.1 0 0 0 1.5 2.6v4.3A1.1 1.1 0 0 0 2.6 8H4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
              copy
            </>
          )}
        </button>
      </div>
      <pre
        className={cn(
          "max-h-64 overflow-auto p-3.5 font-mono text-[10.5px] leading-[1.7] text-zinc-300",
          "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2",
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
