'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './experience.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech?: string[];
}

// Experience Skeleton Loader
const ExperienceSkeleton = () => {
  const isDarkMode = typeof document !== 'undefined' ? !document.documentElement.classList.contains('light-mode') : true;
  const shimmerBg = isDarkMode ? '#2a2a2a' : '#d1d5db';
  const shimmerAnimation = `
    @keyframes shimmer {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;

  return (
    <div style={{ padding: '4rem 2rem' }}>
      <style>{shimmerAnimation}</style>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div
            style={{
              height: '48px',
              background: shimmerBg,
              borderRadius: '8px',
              marginBottom: '1rem',
              animation: 'shimmer 1.5s infinite',
              width: '70%',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Timeline Items Skeleton */}
        <div style={{ position: 'relative', paddingLeft: '3rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                marginBottom: '3rem',
                paddingLeft: '2rem',
                position: 'relative',
              }}
            >
              {/* Timeline Dot Skeleton */}
              <div
                style={{
                  position: 'absolute',
                  left: '-32px',
                  top: '0',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: shimmerBg,
                  animation: 'shimmer 1.5s infinite',
                }}
              />

              {/* Content Skeleton */}
              <div style={{ padding: '1.5rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px' }}>
                <div
                  style={{
                    height: '24px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                    animation: 'shimmer 1.5s infinite',
                    width: '70%',
                  }}
                />
                <div
                  style={{
                    height: '18px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                    animation: 'shimmer 1.5s infinite',
                    width: '50%',
                  }}
                />
                <div
                  style={{
                    height: '16px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    animation: 'shimmer 1.5s infinite',
                    width: '100%',
                  }}
                />
                <div
                  style={{
                    height: '16px',
                    background: shimmerBg,
                    borderRadius: '6px',
                    animation: 'shimmer 1.5s infinite',
                    width: '90%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load experience data from JSON
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const response = await fetch('/data/experience.json');
        const data = await response.json();
        setExperiences(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading experience data:', error);
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const glow = glowRefs.current[index];
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    // Don't run animations until data is loaded
    if (loading || experiences.length === 0) return;

    // Animate header
    if (headerRef.current) {
      const children = headerRef.current.children;
      gsap.from(children, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
        },
      });
    }

    // Progress bar animation - fills on scroll
    if (progressFillRef.current && timelineRef.current) {
      gsap.to(progressFillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
          markers: false, // Set to true for debugging
          invalidateOnRefresh: true,
        },
      });
    }

    // Animate each timeline item
    itemsRef.current.forEach((item) => {
      if (!item) return;

      const line = item.querySelector(`.${styles.timelineLine}`);
      const dot = item.querySelector(`.${styles.timelineDot}`);
      const content = item.querySelector(`.${styles.timelineContent}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
        },
      });

      if (line) {
        tl.to(line, {
          scaleY: 1,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (dot) {
        tl.to(
          dot,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
          },
          '-=0.3'
        );
      }

      if (content) {
        tl.to(
          content,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.2'
        );
      }

      // Pulsing dot animation
      if (dot) {
        gsap.to(dot, {
          boxShadow: '0 0 0 15px rgba(6, 182, 212, 0)',
          duration: 2,
          repeat: -1,
          ease: 'ease-out',
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading, experiences]);

  return (
    <section ref={sectionRef} className={styles.experienceSection}>
      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className="sectionTitleGlobal">
            EXPERIENCE & <span style={{ color: 'var(--accent)' }}>EDUCATION</span>
          </h2>
        </div>

        {loading ? (
          <ExperienceSkeleton />
        ) : (
          /* Timeline */
          <div ref={timelineRef} className={styles.timeline}>
            <div className={styles.timelineProgressTrack} />
            <div ref={progressFillRef} className={styles.timelineProgressFill} />

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              {/* Timeline Marker */}
              <div className={styles.timelineMarker}>
                <div className={styles.timelineLine} />
                <div className={styles.timelineDot} />
              </div>

              {/* Timeline Content */}
              <div className={styles.timelineContent}>
                <div 
                  className={styles.timelineCard}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                >
                  <div 
                    ref={(el) => {
                      glowRefs.current[index] = el;
                    }} 
                    className={styles.cardGlow} 
                  />
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <span className={`${styles.cardType} ${exp.type === 'education' ? styles.education : ''}`}>
                      {exp.type === 'work' ? '💼 WORK' : '🎓 EDUCATION'}
                    </span>
                    <span className={styles.period}>{exp.period}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className={styles.cardTitle}>{exp.title}</h3>

                  {/* Company Info */}
                  <div className={styles.companyInfo}>
                    <p className={styles.company}>{exp.company}</p>
                    <p className={styles.location}>{exp.location}</p>
                  </div>

                  {/* Description */}
                  <p className={styles.description}>{exp.description}</p>

                  {/* Achievements */}
                  <ul className={styles.achievements}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className={styles.techStack}>
                      {exp.tech.map((tech, idx) => (
                        <span key={idx} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Card Number */}
                  <div className={styles.cardNumber}>{String(exp.id).padStart(2, '0')}</div>
                </div>
                <div className={styles.cardBorder} />
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}
