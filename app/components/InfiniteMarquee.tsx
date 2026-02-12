'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './infiniteMarquee.module.css';

const TEXT = "let's work together ✦";
const REPEAT_COUNT = 8;

export default function InfiniteMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 56,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const items = Array.from({ length: REPEAT_COUNT }, (_, index) => (
    <span className={styles.item} key={`marquee-item-${index}`}>
      {TEXT}
    </span>
  ));

  return (
    <div className={styles.marquee} aria-label={TEXT}>
      <div className={styles.track} ref={trackRef}>
        <div className={styles.group}>{items}</div>
        <div className={styles.group} aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
