'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import styles from './projectDetails.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  frontendUrl: string;
  backendUrl: string;
  year: string;
  challenges?: string[];
  futurePlans?: string[];
}

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const projects = await response.json();
        const foundProject = projects.find((p: Project) => p.slug === params.slug);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading project:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // GSAP animations
  useEffect(() => {
    if (!project || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero title split animation
      const titleChars = gsap.utils.toArray('.hero-title-char') as Element[];
      gsap.from(titleChars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'power4.out',
      });

      // Hero content animations
      gsap.from('[data-hero-animate]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: 'power3.out',
      });

      // Parallax image effect
      gsap.to('[data-parallax-image]', {
        scrollTrigger: {
          trigger: '[data-parallax-image]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
      });

      // Reveal sections with scale
      const sections = gsap.utils.toArray('[data-reveal-section]') as Element[];
      if (sections.length > 0) {
        sections.forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
          });
        });
      }

      // Challenge items reveal
      const challengeItems = gsap.utils.toArray('[data-challenge-item]') as Element[];
      if (challengeItems.length > 0) {
        challengeItems.forEach((item) => {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            ease: 'power2.out',
          });
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text)' }}>Loading project...</p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
        <h1 style={{ color: 'var(--text)' }} className="text-4xl font-bold mb-4">
          Project Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="mb-8">
          The project you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link
          href="#works"
          className="px-6 py-3 rounded-lg font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--accent), #7c3aed)',
            color: 'white',
          }}
        >
          Back to Works
        </Link>
      </div>
    );
  }

  return (
    <div ref={pageRef} className={styles.page}>
      {/* Back Button */}
      <div className={styles.backSection}>
        <button onClick={() => router.back()} className={styles.backLink} data-hero-animate>
          ← Back to Portfolio
        </button>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroLeft}>
            <p className={styles.categoryLabel} data-hero-animate>
              {project.category}
            </p>

            <h1 className={styles.heroTitle}>
              {project.title.split('').map((char, i) => (
                <span key={i} className="hero-title-char" style={{ display: 'inline-block' }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <p className={styles.heroDescription} data-hero-animate>
              {project.description}
            </p>

            <div className={styles.heroButtons} data-hero-animate>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                Live Demo
              </a>
              {project.frontendUrl && (
                <a
                  href={project.frontendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnSecondary}
                >
                  View Code
                </a>
              )}
            </div>
          </div>

          <div className={styles.heroRight} data-hero-animate>
            <div className={styles.projectPreview}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.previewImage}
                data-parallax-image
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.techSection} data-reveal-section>
        <h2 className={styles.techTitle}>TECH STACK</h2>
        <div className={styles.techGrid}>
          {project.tech.map((tech) => (
            <div key={tech} className={styles.techBadge}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection} data-reveal-section>
        <h2 className={styles.sectionTitle}>KEY FEATURES</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛒</div>
            <h3 className={styles.featureTitle}>Smart Cart System</h3>
            <p className={styles.featureDesc}>
              Persistent shopping cart with real-time updates, quantity management, and saved items for later.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3 className={styles.featureTitle}>Secure Payments</h3>
            <p className={styles.featureDesc}>
              Integrated Stripe payment processing with support for multiple payment methods and currencies.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>Analytics Dashboard</h3>
            <p className={styles.featureDesc}>
              Comprehensive admin dashboard with sales analytics, inventory reporting, and customer insights.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h3 className={styles.featureTitle}>Auth & Security</h3>
            <p className={styles.featureDesc}>
              Robust authentication system with JWT tokens, role-based access control, and data encryption.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDesc}>
              Optimized performance with lazy loading, image optimization, and caching for quick response times.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌍</div>
            <h3 className={styles.featureTitle}>Multi-language</h3>
            <p className={styles.featureDesc}>
              Full i18n support with multiple language detection and seamless locale switching.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className={styles.screenshotsSection} data-reveal-section>
        <h2 className={styles.sectionTitle}>SCREENSHOTS</h2>
        <div className={styles.screenshotsGrid}>
          <div className={styles.screenshot}>
            <img src={project.image} alt={`${project.title} screenshot 1`} />
          </div>
          <div className={styles.screenshot}>
            <img src={project.image} alt={`${project.title} screenshot 2`} />
          </div>
          <div className={styles.screenshot}>
            <img src={project.image} alt={`${project.title} screenshot 3`} />
          </div>
        </div>
      </section>

      {/* Challenges & Key Learnings */}
      <section className={styles.bottomSection} data-reveal-section>
        <div className={styles.bottomGrid}>
          <div className={styles.bottomCard}>
            <div className={styles.cardIcon}>💡</div>
            <h3 className={styles.cardTitle}>Challenges</h3>
            <ul className={styles.cardList}>
              {(project.challenges && project.challenges.length > 0
                ? project.challenges
                : [
                    'Implementing real-time inventory sync across multiple sessions without race conditions',
                    'Optimizing database queries for large product catalogs with complex filtering',
                    'Building a flexible cart system that handles promotions, discounts, and tax calculations',
                    'Ensuring PCI compliance while maintaining a smooth checkout experience',
                  ]
              ).map((challenge, index) => (
                <li key={index} data-challenge-item>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.bottomCard}>
            <div className={styles.cardIcon}>🎯</div>
            <h3 className={styles.cardTitle}>Key Learnings</h3>
            <ul className={styles.cardList}>
              {(project.futurePlans && project.futurePlans.length > 0
                ? project.futurePlans
                : [
                    'Mastered optimistic UI updates with proper rollback strategies',
                    'Learned advanced PostgreSQL indexing and query optimization techniques',
                    'Gained deep understanding of payment processing workflows and security',
                    'Improved skills in building accessible, responsive e-commerce interfaces',
                  ]
              ).map((learning, index) => (
                <li key={index}>
                  {learning}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
