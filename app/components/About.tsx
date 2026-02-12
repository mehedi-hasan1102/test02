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
  const profileImageRef = useRef<HTMLDivElement>(null);
  const profileBorderRef = useRef<HTMLDivElement>(null);

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

      // Profile image hover animation
      if (profileImageRef.current && profileBorderRef.current) {
        const profileImage = profileImageRef.current;
        const profileBorder = profileBorderRef.current;

        // Mouse enter animation
        const handleMouseEnter = () => {
          // Image scale
          gsap.to(profileImage, {
            scale: 1.08,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Border animation with glow
          gsap.to(profileBorder, {
            top: '0.5rem',
            left: '0.5rem',
            right: '-0.5rem',
            bottom: '-0.5rem',
            borderWidth: '3px',
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        // Mouse leave animation
        const handleMouseLeave = () => {
          // Reset image
          gsap.to(profileImage, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          });

          // Reset border
          gsap.to(profileBorder, {
            top: '1.5rem',
            left: '1.5rem',
            right: '-1.5rem',
            bottom: '-1.5rem',
            borderWidth: '2px',
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        profileImage.addEventListener('mouseenter', handleMouseEnter);
        profileImage.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          profileImage.removeEventListener('mouseenter', handleMouseEnter);
          profileImage.removeEventListener('mouseleave', handleMouseLeave);
        };
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
     

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left side - Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className={`${styles.profileWrap} relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-96`}>
              <div 
                ref={profileImageRef}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              >
                <Image
                  src="/profile/profile.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Animated border element */}
              <div ref={profileBorderRef} className={styles.profileImageBorder} />
            </div>
          </div>

          {/* Right side - Content with enhanced typography */}
          <div className="space-y-6">
            <div
              ref={headingRef}
              className={styles.aboutHeadingWrap}
              style={{ color: 'var(--text)' }}
            >
              <h2 className={styles.aboutHeading}>About <span style={{ color: 'var(--accent)' }}>Me</span></h2>
            </div>
            <div
              ref={(el) => {
                if (el) paragraphsRef.current[0] = el;
              }}
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ul className={`${styles.aboutList} list-disc pl-5 space-y-4`}>
                <li>
                  <strong className={styles.aboutLabel}>NAME:</strong>{' '}
                  <span className={styles.aboutValueStrong}>Mehedi Hasan</span>
                </li>
                <li>
                  <strong className={styles.aboutLabel}>LOCATION:</strong>{' '}
                  <span className={`${styles.aboutValueStrong} ${styles.aboutValuePillGreen}`}>
                    Dhaka, Bangladesh
                  </span>
                </li>
                <li>
                  <strong className={styles.aboutLabel}>EXPERIENCE:</strong>{' '}
                  <span className={styles.aboutValueStrong}>
                    Passionate Software Developer with 2+ years of experience building personal and open-source projects. Experienced in designing, developing, and deploying applications independently
                  </span>
                </li>
                <li className={styles.aboutNoWrapRow}>
                  <strong className={styles.aboutLabel}>CORE TECH STACK:</strong>{' '}
                  <span className={`${styles.aboutValueStrong} ${styles.aboutValuePill}`}>
                    React, Next.js, TypeScript, Tailwind CSS
                  </span>
                </li>
                <li>
                  <strong className={styles.aboutLabel}>HOBBIES:</strong>{' '}
                  <span className={styles.aboutValueStrong}>Reading, watching movies, and traveling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
