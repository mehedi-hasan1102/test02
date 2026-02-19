import React from 'react';
import { CodeBlock } from './CodeBlock';
export { CodeBlock } from './CodeBlock';

type CalloutType = 'info' | 'warning' | 'success' | 'error';

const CALLOUT_VARIANTS: Record<CalloutType, string> = {
  info:
    'border-l-[#22d3ee] bg-[rgba(34,211,238,0.1)] [html.light-mode_&]:border-l-[#2563EB] [html.light-mode_&]:bg-[rgba(37,99,235,0.1)]',
  warning:
    'border-l-[#f97316] bg-[rgba(249,115,22,0.1)] [html.light-mode_&]:border-l-[#ea580c] [html.light-mode_&]:bg-[rgba(249,115,22,0.08)]',
  success:
    'border-l-[#22c55e] bg-[rgba(34,197,94,0.1)] [html.light-mode_&]:border-l-[#16a34a] [html.light-mode_&]:bg-[rgba(34,197,94,0.08)]',
  error:
    'border-l-[#ef4444] bg-[rgba(239,68,68,0.1)] [html.light-mode_&]:border-l-[#dc2626] [html.light-mode_&]:bg-[rgba(239,68,68,0.08)]',
};

export const Callout = ({
  type = 'info',
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) => (
  <div
    className={`my-6 flex gap-4 rounded-[12px] border-l-4 p-5 max-[768px]:p-4 ${CALLOUT_VARIANTS[type]}`}
  >
    <div className="shrink-0 text-[1.25rem]">
      {type === 'info' && '💡'}
      {type === 'warning' && '⚠️'}
      {type === 'success' && '✅'}
      {type === 'error' && '❌'}
    </div>
    <div className="flex-1 text-[var(--text-secondary)] [&>p+p]:mt-2 [&>p]:m-0">
      {children}
    </div>
  </div>
);

export const Img = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <figure className="my-8 text-center">
    <img
      src={src}
      alt={alt}
      className="w-full max-w-full rounded-[12px] border border-[rgba(255,255,255,0.1)] [html.light-mode_&]:border-[rgba(0,0,0,0.1)]"
    />
    {caption && (
      <figcaption className="mt-3 text-[0.9rem] text-[var(--text-secondary)]">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const Prose = ({ children }: { children: React.ReactNode }) => (
  <div className="grid gap-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
    {children}
  </div>
);

const getTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromNode).join('');
  }

  return '';
};

export const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const childArray = React.Children.toArray(props.children);
  const codeElement = childArray[0];

  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(codeElement)) {
    const className = typeof codeElement.props.className === 'string' ? codeElement.props.className : '';
    const languageMatch = className.match(/language-([^\s]+)/);
    const language = languageMatch?.[1];
    const code = getTextFromNode(codeElement.props?.children);

    return <CodeBlock language={language} code={code} />;
  }

  return <CodeBlock code={getTextFromNode(props.children)} />;
};
