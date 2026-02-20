'use client';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
  onClick={() => router.back()}
  className="group mt-16 inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-transparent bg-transparent px-0 py-0 font-['Inter',sans-serif] text-[0.95rem] font-medium text-[var(--accent)] transition-all duration-300 hover:-translate-x-[2px]"
  aria-label="Go back to blog"
>
  <FaArrowLeft
    size={16}
    className="transition-transform duration-300 group-hover:-translate-x-1"
  />
  Back to Blog
</button>
  );
}
