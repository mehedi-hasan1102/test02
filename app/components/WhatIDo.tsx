'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './whatido.module.css';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  description: string;
  number: string;
}

const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Creating responsive, modern websites with React, Next.js, and TypeScript.',
    number: '01',
  },
  {
    title: 'UI/UX Design',
    description: 'Designing beautiful interfaces with Figma and Tailwind CSS with smooth animations.',
    number: '02',
  },
  {
    title: 'Backend Development',
    description: 'Building scalable server-side solutions with Node.js, Express, and databases.',
    number: '03',
  },
  {
    title: 'Full Stack Solutions',
    description: 'End-to-end development from frontend to backend with deployment on modern tools.',
    number: '04',
  },
  {
    title: 'Performance Optimization',
    description: 'Optimizing applications for speed, SEO, and user experience with best practices.',
    number: '05',
  },
  {
    title: 'Problem Solving',
    description: 'Tackling complex challenges with creative solutions and implementing best practices.',
    number: '06',
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    
    if (!card) return;

    gsap.set(card, { 
      opacity: 0, 
      y: 80, 
      rotateX: -15,
      scale: 0.9,
    });
    gsap.set(content, { opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }, 0);

        tl.to(content, {
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1 + 0.2,
        }, 0);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <div 
      ref={cardRef} 
      className={styles.bentoCard}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.bentoGlow} />
      <div ref={contentRef} className={styles.bentoContent}>
        <div className={styles.bentoHeader}>
          <div className={styles.bentoNumber}>{service.number}</div>
          <h3 className={styles.bentoTitle}>{service.title}</h3>
        </div>
        <p className={styles.bentoDescription}>{service.description}</p>
      </div>
      <div className={styles.bentoBorder} />
    </div>
  );
};

export default function WhatIDo() {
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    gsap.set(header.children, { y: 80, opacity: 0 });

    ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.whatidoSection} id="what-i-do">
      

      <div className={styles.whatidoContainer}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.whatidoHeader}>
          <h2 className={styles.whatidoTitle}>
            WHAT <span style={{ color: 'var(--accent)' }}>I DO</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className={styles.bentoGrid}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
