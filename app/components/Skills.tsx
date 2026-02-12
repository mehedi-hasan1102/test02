import { useEffect, useRef, useState } from "react";
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

const orbitSkills = ["CREATIVE", "INNOVATIVE", "DEDICATED", "CURIOUS", "ADAPTABLE", "FOCUSED"];

// Skills Skeleton Loader
const SkillsSkeleton = () => {
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
    <section style={{ padding: '4rem 2rem', background: 'var(--bg)', minHeight: '600px' }}>
      <style>{shimmerAnimation}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Skeleton */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div
            style={{
              height: '48px',
              background: shimmerBg,
              borderRadius: '8px',
              marginBottom: '1rem',
              animation: 'shimmer 1.5s infinite',
              width: '60%',
              margin: '0 auto 1rem',
            }}
          />
          <div
            style={{
              height: '20px',
              background: shimmerBg,
              borderRadius: '8px',
              animation: 'shimmer 1.5s infinite',
              width: '40%',
              margin: '0 auto',
            }}
          />
        </div>

        {/* Skills Grid Skeleton */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ padding: '2rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px' }}>
              <div
                style={{
                  height: '24px',
                  background: shimmerBg,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  animation: 'shimmer 1.5s infinite',
                }}
              />
              <div
                style={{
                  height: '16px',
                  background: shimmerBg,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  animation: 'shimmer 1.5s infinite',
                  width: '90%',
                }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.5rem',
                }}
              >
                {Array.from({ length: 3 }).map((_, j) => (
                  <div
                    key={j}
                    style={{
                      height: '32px',
                      background: shimmerBg,
                      borderRadius: '6px',
                      animation: 'shimmer 1.5s infinite',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const orbitCardRef = useRef<HTMLDivElement>(null);
  const orbitGlowRef = useRef<HTMLDivElement>(null);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Load skills data from JSON
  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch("/data/skills.json");
        const data = await response.json();
        setSkillCategories(data);
      } catch (error) {
        console.error("Error loading skills data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

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
      {loading && <SkillsSkeleton />}
      {!loading && (
        <>
        

      <div className={styles.skillsContainer}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.skillsHeader}>
          <h2 className="sectionTitleGlobal">
            MY <span style={{ color: 'var(--accent)' }}>TOOLKIT</span>
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

      </div>
        </>
      )}
    </section>
  );
}
