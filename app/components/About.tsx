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
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Animate stats with counter
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll('[data-stat]'), {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 0.5,
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
        });
      }
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
              "I'm a passionate full-stack developer and creative technologist specializing in building immersive web experiences with GSAP animations and modern web technologies. My mission is to bridge the gap between design and functionality, creating interfaces that not only look stunning but perform flawlessly.",
              "I leverage GSAP to craft premium animations and interactions that elevate user experiences. From timeline-driven sequences to scroll-triggered effects, I bring motion design principles into interactive digital products with precision and performance in mind.",
              "My development approach emphasizes performance optimization, accessibility, and clean code architecture. I'm constantly exploring cutting-edge web technologies, contributing to the developer community, and showcasing what's possible when creativity meets technical excellence.",
            ].map((text, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) paragraphsRef.current[index] = el;
                }}
                className="text-lg leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                <div className="h-px w-8 mb-4 rounded-full" style={{
                  background: 'var(--accent)',
                  opacity: 0.3,
                }} />
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 mt-20 pt-20"
          style={{ borderTop: '1px solid rgba(34, 211, 238, 0.2)' }}
        >
          {[
            { number: '100+', label: 'Web Projects' },
            { number: '50+', label: 'GSAP Animations' },
            { number: '5+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div
              key={index}
              data-stat
              className="text-center p-6 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(34, 211, 238, 0.05)',
                borderLeft: '3px solid var(--accent)',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  background: 'rgba(34, 211, 238, 0.1)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  background: 'rgba(34, 211, 238, 0.05)',
                  duration: 0.3,
                });
              }}
            >
              <div
                className="text-5xl font-bold mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {stat.number}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
