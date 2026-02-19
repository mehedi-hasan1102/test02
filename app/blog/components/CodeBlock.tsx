'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

type CodeBlockProps = {
  children?: ReactNode;
  title?: string;
  language?: string;
  code?: string;
};

const getCodeText = (code?: string, children?: ReactNode) => {
  if (typeof code === 'string') {
    return code;
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
      .join('');
  }

  return '';
};

export const CodeBlock = ({ children, title, language, code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const codeText = useMemo(() => getCodeText(code, children), [code, children]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore clipboard errors and keep the UI unchanged.
    }
  };

  const headerClassName = title
    ? 'justify-between'
    : 'justify-end';

  return (
    <div className="my-6 overflow-hidden rounded-[12px] border border-[rgba(var(--accent-rgb),0.15)] bg-[var(--surface)] shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-300 [transition-timing-function:ease] max-[768px]:my-4">
      <div
        className={`flex items-center gap-3 border-b border-b-[rgba(var(--accent-rgb),0.2)] bg-[rgba(var(--accent-rgb),0.08)] px-5 py-3.5 font-mono text-[0.85rem] font-semibold uppercase tracking-[0.05em] text-[var(--accent)] ${headerClassName}`}
      >
        {title ? <span className="mr-auto">{title}</span> : null}
        <button
          type="button"
          className="cursor-pointer rounded-full border border-[rgba(var(--accent-rgb),0.4)] bg-[rgba(var(--accent-rgb),0.08)] px-[0.7rem] py-[0.35rem] text-[0.75rem] font-semibold tracking-[0.08em] text-[var(--accent)] transition-all duration-200 [transition-timing-function:ease] hover:border-[rgba(var(--accent-rgb),0.8)] hover:bg-[rgba(var(--accent-rgb),0.2)] disabled:cursor-not-allowed disabled:opacity-50 data-[copied=true]:border-[rgba(34,197,94,0.8)] data-[copied=true]:bg-[rgba(34,197,94,0.2)] data-[copied=true]:text-[#22c55e]"
          onClick={handleCopy}
          disabled={!codeText}
          data-copied={copied ? 'true' : 'false'}
          aria-label={copied ? 'Code copied' : 'Copy code'}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className={`mdx-code-block m-0 overflow-x-auto bg-inherit p-6 text-[0.9rem] leading-[1.6] max-[768px]:p-4 max-[768px]:text-[0.85rem] language-${language || 'text'}`}
      >
        <code className="block font-mono text-[var(--text)]">
          {code || children}
        </code>
      </pre>
    </div>
  );
};
