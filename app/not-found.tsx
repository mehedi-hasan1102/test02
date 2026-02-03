'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { AiOutlineHome } from 'react-icons/ai';
import styles from './not-found.module.css';

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
    <div ref={containerRef} className={styles.notFoundSection}>
      {/* Background Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.container}>
        {/* 404 Image */}
        <div ref={imageRef} className={styles.imageWrapper}>
          <Image
            src="/cute-cow-astronaut-driving-ufo-catching-meat-steak-cartoon-vector-icon-illustration-animal-food.png"
            alt="404 Not Found"
            width={400}
            height={400}
            className={styles.notFoundImage}
            priority
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h1 ref={titleRef} className={styles.title}>
            404 - <span className={styles.highlight}>PAGE NOT FOUND</span>
          </h1>
          <p ref={textRef} className={styles.description}>
            Oops! Looks like this page took a trip to outer space. 
            The cow astronaut couldn&apos;t find what you&apos;re looking for!
          </p>

          <div ref={buttonRef} className={styles.buttonWrapper}>
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
