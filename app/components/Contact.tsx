'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { FiDownload } from 'react-icons/fi';
import styles from './contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const headingText = SplitType.create(headingRef.current, {
          types: 'words',
        });

        // Animate heading on scroll into view
        if (headingText.words) {
          gsap.from(headingText.words, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 0.5,
            },
            opacity: 0.2,
            y: 50,
            stagger: 0.1,
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative overflow-hidden py-20 md:py-32 px-4 md:px-8 ${styles.contactSection}`}
      style={{ background: 'var(--bg)' }}
    >
      {/* Background Gradient Orbs */}
      <div className={styles.contactDecor1} />
      <div className={styles.contactDecor2} />

      <div className="container relative z-10 max-w-7xl">
        {/* Main Heading */}
        <div ref={headingRef} className={styles.footerHeading}>
          LET&apos;S TALK
        </div>

        {/* Email */}
        <a
          href="mailto:mehedi.hasani1o23@gmail.com"
          className={styles.emailDisplay}
        >
          mehedi.hasani1o23@gmail.com
        </a>

        {/* Content Grid */}
        <div className={styles.footerGrid}>
          {/* Socials */}
          <div className={styles.footerColumn}>
            <p className={styles.columnLabel}>SOCIALS</p>
            <div className={styles.socialButtons}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className={styles.footerColumn}>
            <p className={styles.columnLabel}>LOCATION</p>
            <div className={styles.locationInfo}>
              <p className={styles.locationCity}>DHAKA</p>
              <p className={styles.locationCountry}>BANGLADESH</p>
            </div>
          </div>

          {/* Availability */}
          <div className={styles.footerColumn}>
            <p className={styles.columnLabel}>AVAILABILITY</p>
            <div className={styles.availabilityStatus}>
              <span className={styles.availabilityDot} />
              <span className={styles.availabilityText}>OPEN FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>

        {/* Download CV Button */}
        <div className={styles.downloadSection}>
          <a href="/cv.pdf" download className={styles.downloadButton}>
            DOWNLOAD CV
            <FiDownload size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
