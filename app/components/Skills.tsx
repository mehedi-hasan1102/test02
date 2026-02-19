import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-[8px] border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-[0.625rem] transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform hover:bg-[rgba(6,182,212,0.08)]"
      style={{ "--skill-color": skill.color } as React.CSSProperties}
    >
      <span className="text-base opacity-80">{skill.icon}</span>
      <span className="font-['Staatliches',serif] text-[0.8125rem] tracking-[0.1em] text-[var(--text)]">
        {skill.name}
      </span>
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

  const cardPositionClass =
    index === 0
      ? "col-[1/2] row-[1/2] max-[768px]:col-[1/2] max-[768px]:row-auto"
      : index === 1
        ? "col-[2/3] row-[1/2] max-[768px]:col-[1/2] max-[768px]:row-auto"
        : index === 2
          ? "col-[1/2] row-[2/3] max-[768px]:col-[1/2] max-[768px]:row-auto"
          : index === 3
            ? "col-[2/3] row-[2/3] max-[768px]:col-[1/2] max-[768px]:row-auto"
            : "";

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${cardPositionClass} ${isLarge ? "col-span-1" : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_60%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
      />
      <div ref={contentRef} className="relative z-[2] flex h-full flex-col p-8 max-[768px]:p-6">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-['Staatliches',serif] text-[3rem] leading-none text-[rgba(6,182,212,0.08)] max-[768px]:text-[2rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-['Staatliches',serif] text-[1.5rem] tracking-[0.15em] text-[var(--accent)] max-[768px]:text-[1.25rem]">
            {category.title}
          </h3>
        </div>
        <p className="mb-6 font-['Inter',sans-serif] text-[0.875rem] leading-[1.5] text-[var(--text-secondary)]">
          {category.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-[0.625rem]">
          {category.skills.map((skill, skillIndex) => (
            <MagneticSkillTag key={skill.name} skill={skill} index={skillIndex} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
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
      className="absolute left-1/2 top-1/2 mt-[-15px] ml-[-50px] w-[100px] text-center"
      style={{
        transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
      }}
    >
      <span className="inline-block whitespace-nowrap rounded-[6px] border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.1)] px-3 py-2 font-['Staatliches',serif] text-[0.6875rem] tracking-[0.15em] text-[var(--text)] max-[768px]:px-2 max-[768px]:py-1.5 max-[768px]:text-[0.5625rem]">
        {skill}
      </span>
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
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen overflow-hidden py-32 max-[768px]:py-20"
      style={{ background: "var(--bg)" }}
    >
      {loading && <SkillsSkeleton />}
      {!loading && (
        <>
        

      <div className="relative z-[2] mx-auto max-w-[1400px] px-16 max-[768px]:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 overflow-hidden text-center">
          <h2 className="sectionTitleGlobal">
            MY <span style={{ color: 'var(--accent)' }}>TOOLKIT</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="mb-16 grid grid-cols-3 grid-rows-2 gap-6 max-[1200px]:grid-cols-2 max-[1200px]:grid-rows-3 max-[768px]:grid-flow-row max-[768px]:grid-cols-1 max-[768px]:grid-rows-none max-[768px]:gap-4">
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
            className="group relative col-[3/4] row-[1/3] flex min-h-[400px] items-center justify-center overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform max-[1200px]:col-[1/3] max-[1200px]:row-[3/4] max-[1200px]:min-h-[350px] max-[768px]:col-[1/-1] max-[768px]:row-auto max-[768px]:min-h-[300px]"
            onMouseMove={handleOrbitMouseMove}
          >
            <div
              ref={orbitGlowRef}
              className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_60%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
            />
            <div className="relative flex h-[320px] w-[320px] items-center justify-center max-[768px]:h-[260px] max-[768px]:w-[260px]">
              <div ref={orbitContainerRef} className="absolute h-full w-full">
                {orbitSkills.map((skill, index) => (
                  <OrbitingSkill
                    key={skill}
                    skill={skill}
                    index={index}
                    total={orbitSkills.length}
                  />
                ))}
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="block font-['Staatliches',serif] text-[1.25rem] tracking-[0.2em] text-[var(--text-secondary)]">
                  SOFT
                </span>
                <span className="block font-['Staatliches',serif] text-[1.75rem] tracking-[0.15em] text-[var(--accent)]">
                  SKILLS
                </span>
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(6,182,212,0.2)] max-[768px]:h-[220px] max-[768px]:w-[220px]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[rgba(6,182,212,0.1)] max-[768px]:h-[160px] max-[768px]:w-[160px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
          </div>
        </div>

      </div>
        </>
      )}
    </section>
  );
}
