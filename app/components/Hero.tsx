'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero on mount
    const ctx = gsap.context(() => {
      // Split text
      if (!titleRef.current || !descRef.current) return;
      
      const titleText = SplitType.create(titleRef.current, { types: 'chars' });
      const descText = SplitType.create(descRef.current, { types: 'words' });

      // Create timeline
      const tl = gsap.timeline();

      // Stagger animate chars with wave effect
      if (titleText.chars) {
        tl.from(titleText.chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          rotationZ: -45,
          duration: 0.9,
          stagger: { amount: 0.6, ease: 'sine.inOut' },
          ease: 'cubic.out',
        }, 0);
      }

      // Animate description words
      if (descText.words) {
        tl.from(
          descText.words,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
          },
          0.4
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={titleRef}
            className="mb-6 md:mb-8 flex flex-col"
            style={{ color: 'var(--text)' }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-2 tracking-tight uppercase leading-none">
              FULL-STACK
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none" style={{ 
              color: 'var(--accent)',
            }}>
              DEVELOPER
            </h1>
          </div>

          <div
            ref={descRef}
            className="text-base md:text-lg mb-12 leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            
          </div>

          {/* Scroll indicator with animation */}
          <div className="absolute -bottom-64 left-1/2 transform -translate-x-1/2 cursor-pointer group" onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            <div
              className="w-6 h-10 border-2 rounded-full flex justify-center group-hover:scale-110 transition-transform duration-300"
              style={{ borderColor: 'var(--accent)' }}
            >
              <div
                className="w-1 h-2 rounded-full mt-2"
                style={{ 
                  background: 'var(--accent)',
                  animation: 'bounce 2s infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
