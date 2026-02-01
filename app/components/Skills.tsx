"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./skills.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "FRONTEND",
    description: "Building beautiful, responsive interfaces",
    skills: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Next.js", icon: "▲", color: "#ffffff" },
      { name: "TypeScript", icon: "TS", color: "#3178C6" },
      { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
      { name: "Tailwind", icon: "🎨", color: "#06B6D4" },
      { name: "GSAP", icon: "●", color: "#88CE02" },
    ],
  },
  {
    title: "BACKEND",
    description: "Scalable server-side solutions",
    skills: [
      { name: "Node.js", icon: "⬢", color: "#339933" },
      { name: "Express", icon: "Ex", color: "#ffffff" },
      { name: "REST API", icon: "{ }", color: "#06B6D4" },
      { name: "GraphQL", icon: "◈", color: "#E10098" },
    ],
  },
  {
    title: "DATABASE",
    description: "Data storage & management",
    skills: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "PostgreSQL", icon: "🐘", color: "#4169E1" },
      { name: "MySQL", icon: "🐬", color: "#4479A1" },
      { name: "Firebase", icon: "🔥", color: "#FFCA28" },
    ],
  },
  {
    title: "TOOLS",
    description: "Development & deployment",
    skills: [
      { name: "Git", icon: "⎇", color: "#F05032" },
      { name: "Linux", icon: "🐧", color: "#FCC624" },
      { name: "Figma", icon: "◐", color: "#F24E1E" },
      { name: "VS Code", icon: "◆", color: "#007ACC" },
    ],
  },
];

const MagneticSkillTag = ({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) => {
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tagRef.current) return;

    gsap.set(tagRef.current, { opacity: 0, y: 20, scale: 0.8 });

    ScrollTrigger.create({
      trigger: tagRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(tagRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        });
      },
    });
  }, [index]);

  return (
    <div
      ref={tagRef}
      className={styles.magneticSkillTag}
      style={{ "--skill-color": skill.color } as React.CSSProperties}
    >
      <span className={styles.skillTagIcon}>{skill.icon}</span>
      <span className={styles.skillTagName}>{skill.name}</span>
    </div>
  );
};

const BentoCard = ({
  category,
  index,
  isLarge,
}: {
  category: SkillCategory;
  index: number;
  isLarge: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    
    if (!card) return;

    // Initial states
    gsap.set(card, { 
      opacity: 0, 
      y: 80, 
      rotateX: -15,
      scale: 0.9,
    });
    gsap.set(content, { opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      onEnter: () => {
        const tl = gsap.timeline();

        // Card entrance with scale and rotation
        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }, 0);

        // Content fade
        tl.to(content, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, 0.2);
      },
    });
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.bentoCard} ${isLarge ? styles.bentoCardLarge : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.bentoGlow} />
      <div ref={contentRef} className={styles.bentoContent}>
        <div className={styles.bentoHeader}>
          <span className={styles.bentoNumber}>{String(index + 1).padStart(2, "0")}</span>
          <h3 className={styles.bentoTitle}>{category.title}</h3>
        </div>
        <p className={styles.bentoDescription}>{category.description}</p>
        <div className={styles.bentoSkills}>
          {category.skills.map((skill, skillIndex) => (
            <MagneticSkillTag key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </div>
      </div>
      <div className={styles.bentoBorder} />
    </div>
  );
};

const OrbitingSkill = ({ skill, index, total }: { skill: string; index: number; total: number }) => {
  const skillRef = useRef<HTMLDivElement>(null);
  const angle = (index / total) * 360;
  const radius = 140;

  useEffect(() => {
    const el = skillRef.current;
    if (!el) return;

    // Set initial position
    gsap.set(el, {
      rotation: -angle,
    });

    // Continuous orbit animation
    gsap.to(el.parentElement, {
      rotation: "+=360",
      duration: 40,
      repeat: -1,
      ease: "none",
    });
  }, [angle]);

  return (
    <div
      ref={skillRef}
      className={styles.orbitingSkill}
      style={{
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      }}
    >
      <span>{skill}</span>
    </div>
  );
};

const orbitSkills = ["CREATIVE", "INNOVATIVE", "DEDICATED", "CURIOUS", "ADAPTABLE", "FOCUSED"];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const orbitCardRef = useRef<HTMLDivElement>(null);
  const orbitGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const orbitContainer = orbitContainerRef.current;

    if (!header) return;

    gsap.set(header.children, { y: 80, opacity: 0 });

    ScrollTrigger.create({
      trigger: header,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
    });

    // Orbit animation
    if (orbitContainer) {
      gsap.to(orbitContainer, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleOrbitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbitCardRef.current || !orbitGlowRef.current) return;
    const rect = orbitCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(orbitGlowRef.current, {
      x: x,
      y: y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    const header = headerRef.current;
    const orbitContainer = orbitContainerRef.current;

    if (!header) return;

    gsap.set(header.children, { y: 80, opacity: 0 });

    ScrollTrigger.create({
      trigger: header,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header.children, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      },
    });

    // Orbit animation
    if (orbitContainer) {
      gsap.to(orbitContainer, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.skillsSection} id="skills">
      {/* Gradient Orbs Background */}
      <div className={`${styles.skillsOrb} ${styles.skillsOrb1}`} />
      <div className={`${styles.skillsOrb} ${styles.skillsOrb2}`} />
      <div className={`${styles.skillsOrb} ${styles.skillsOrb3}`} />

      <div className={styles.skillsContainer}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.skillsHeader}>
          <h2 className={styles.skillsTitle}>
            MY <span className="text-accent">TOOLKIT</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          {skillCategories.map((category, index) => (
            <BentoCard
              key={category.title}
              category={category}
              index={index}
              isLarge={index === 0 || index === 3}
            />
          ))}

          {/* Center Orbit Card */}
          <div 
            ref={orbitCardRef}
            className={styles.bentoOrbitCard}
            onMouseMove={handleOrbitMouseMove}
          >
            <div ref={orbitGlowRef} className={styles.bentoGlow} />
            <div className={styles.orbitWrapper}>
              <div ref={orbitContainerRef} className={styles.orbitContainer}>
                {orbitSkills.map((skill, index) => (
                  <OrbitingSkill
                    key={skill}
                    skill={skill}
                    index={index}
                    total={orbitSkills.length}
                  />
                ))}
              </div>
              <div className={styles.orbitCenter}>
                <span className={styles.orbitText}>SOFT</span>
                <span className={styles.orbitTextAccent}>SKILLS</span>
              </div>
              <div className={styles.orbitRing} />
              <div className={`${styles.orbitRing} ${styles.orbitRing2}`} />
            </div>
            <div className={styles.bentoBorder} />
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className={styles.skillsTagline}>
          <span className={styles.taglineLine} />
          <p className={styles.taglineText}>
            ALWAYS LEARNING • ALWAYS GROWING • ALWAYS BUILDING
          </p>
          <span className={styles.taglineLine} />
        </div>
      </div>
    </section>
  );
}
