'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { AiOutlineHome } from 'react-icons/ai';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate 404 image
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0, scale: 0.5, y: -50 });
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Floating animation
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    // Animate title
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }

    // Animate description
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0, y: 20 });
      tl.to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    // Animate button
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, scale: 0.9 });
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.2'
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] p-8 transition-[background-color] duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] max-[768px]:p-4"
    >
      {/* Background Orbs */}
      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_70%)] opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-15%] top-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.2),transparent_70%)] opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_70%)] opacity-40 blur-[120px]" />

      <div className="relative z-[2] mx-auto max-w-[800px] text-center">
        {/* 404 Image */}
        <div ref={imageRef} className="mb-12 flex justify-center max-[768px]:mb-8">
          <Image
            src="/cute-cow-astronaut-driving-ufo-catching-meat-steak-cartoon-vector-icon-illustration-animal-food.png"
            alt="404 Not Found"
            width={400}
            height={400}
            className="h-auto w-full max-w-[400px] transition-[filter] duration-300 ease-in-out max-[768px]:max-w-[280px] max-[480px]:max-w-[220px]"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(var(--accent-rgb), 0.3))' }}
            priority
          />
        </div>

        {/* Content */}
        <div className="mt-8">
          <h1
            ref={titleRef}
            className="mb-6 font-['Staatliches'] text-[clamp(3rem,8vw,5rem)] font-normal leading-[1.2] tracking-[0.02em] text-[var(--text)] transition-[color] duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] max-[768px]:text-[clamp(2rem,6vw,3rem)] max-[480px]:mb-4 max-[480px]:text-[clamp(1.75rem,5vw,2.5rem)]"
          >
            404 - <span className="inline-block text-[var(--accent)]">PAGE NOT FOUND</span>
          </h1>
          <p
            ref={textRef}
            className="mx-auto mb-12 max-w-[600px] text-lg leading-[1.8] text-[var(--text-secondary)] transition-[color] duration-[600ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] max-[768px]:mb-8 max-[768px]:text-base max-[480px]:text-sm max-[480px]:leading-[1.6]"
          >
            Oops! Looks like this page took a trip to outer space. 
            The cow astronaut couldn&apos;t find what you&apos;re looking for!
          </p>

          <div ref={buttonRef} className="flex justify-center gap-4">
            <Link href="/" className="btn-primary">
              <AiOutlineHome size={20} />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
