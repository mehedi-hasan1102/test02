'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { FiDownload } from 'react-icons/fi';
import styles from './contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const bangladeshTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(bangladeshTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

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
    { label: 'GitHub', href: 'https://github.com/mehedi-hasan1102' },
    { label: 'X', href: 'https://x.com/mehedihasan1102' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehedi-hasan1102' },
  ];

  return (
    <>
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
          <div style={{ textAlign: 'center' }}>
            <a
              href="mailto:mehedi.hasan11023@gmail.com"
              className={styles.emailDisplay}
            >
              mehedi.hasan11023@gmail.com
            </a>
          </div>

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

            {/* Location & Local Time */}
            <div className={styles.footerColumn}>
              <p className={styles.columnLabel}>LOCATION & TIME</p>
              <div className={styles.locationInfo}>
                <p className={styles.locationCity}>DHAKA</p>
                <p className={styles.locationCountry}>BANGLADESH</p>
                <p className={styles.currentTime}>{currentTime || '00:00:00 AM'}</p>
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
            <a href="/Resume_of_Mehedi_Hasan.pdf" download className="btn-primary">
              <span>DOWNLOAD CV</span>
              <FiDownload size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Scrolling Text */}
      {/* <div className={styles.footerBigTextWrapper}>
        <div className={styles.bigTextScroll}>
          <span>
            HIRE ME • OPEN FOR OPPORTUNITIES • LET&apos;S BUILD SOMETHING GREAT •
          </span>
          <span>
            HIRE ME • OPEN FOR OPPORTUNITIES • LET&apos;S BUILD SOMETHING GREAT •
          </span>
        </div>
      </div> */}
    </>
  );
}
