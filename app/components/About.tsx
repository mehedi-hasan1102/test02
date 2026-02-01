'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import styles from './about.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const headingText = SplitType.create(headingRef.current, {
          types: 'words',
        });

        // Animate heading
        gsap.from(headingText.words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
          opacity: 0.2,
          y: 40,
          stagger: 0.1,
        });
      }

      // Animate paragraphs with parallax
      paragraphsRef.current.forEach((para, index) => {
        if (para) {
          gsap.from(para, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${80 + index * 10}%`,
              end: `top ${60 + index * 10}%`,
              scrub: 1,
            },
            opacity: 0.3,
            x: -50,
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl" style={{
              border: '2px solid var(--accent)',
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.2)',
            }}>
              <Image
                src="/profile/profile - blue.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content with enhanced typography */}
          <div className="space-y-6">
            <div
              ref={headingRef}
              style={{ color: 'var(--text)' }}
            >
              <h2 className="text-5xl font-bold mb-4">About Me</h2>
              <div className="w-16 h-1 rounded-full mb-8" style={{
                background: 'linear-gradient(90deg, var(--accent), transparent)',
              }} />
            </div>
            {[
              "I’m a MERN Stack Developer from Bangladesh with 1–2 years of programming experience, building scalable and user-friendly web applications.",
              "I focus on clean code, performance, and modern web technologies across the full stack.",
              "I also write technical blogs and speak at developer meetups, continuously learning and growing as a developer.",
            ].map((text, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) paragraphsRef.current[index] = el;
                }}
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
               
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
