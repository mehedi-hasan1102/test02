"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

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
  githubUrl: string;
  year: string;
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    gsap.set(card, { opacity: 0, y: 40, rotateX: -10, scale: 0.9 });
    gsap.set(content, { opacity: 0 });

    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        const tl = gsap.timeline();

        tl.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }, 0);

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
    <Link href={`/projects/${project.slug}`} className="block h-full no-underline">
      <div
        ref={cardRef}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[rgba(6,182,212,0.1)] bg-transparent [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
        onMouseMove={handleMouseMove}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100"
        />
        <span className="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 translate-y-[-6px] scale-[0.95] transition-all duration-300 [transition-timing-function:ease] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
          <FiExternalLink size={18} />
        </span>
        
        {/* Project Image */}
        <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-[linear-gradient(135deg,rgba(6,182,212,0.05),rgba(6,182,212,0.02))] max-[1024px]:h-[clamp(120px,25vw,150px)] max-[768px]:h-[clamp(100px,20vw,150px)] max-[480px]:h-[clamp(80px,40vw,120px)]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="h-full w-full object-cover object-center transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
        
        <div
          ref={contentRef}
          className="relative z-[2] flex flex-1 flex-col justify-between bg-[var(--card-bg,transparent)] p-8 max-[1024px]:p-[clamp(1.25rem,3vw,1.5rem)] max-[768px]:p-[clamp(1rem,2.5vw,1.5rem)] max-[480px]:p-[clamp(0.875rem,2vw,1.5rem)]"
        >
          <div className="mb-3 flex items-start gap-4 max-[768px]:flex-col max-[768px]:gap-[clamp(0.5rem,1vw,1rem)]">
            <span className="min-w-[80px] font-['Staatliches',serif] text-[3rem] leading-none text-[rgba(6,182,212,0.08)] max-[1024px]:text-[clamp(1.5rem,4vw,2rem)] max-[768px]:min-w-[clamp(50px,10vw,80px)] max-[768px]:text-[clamp(1.25rem,3.5vw,2rem)] max-[480px]:min-w-[clamp(45px,8vw,60px)] max-[480px]:text-[clamp(1rem,3vw,1.5rem)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="flex-1 font-['Staatliches',serif] text-[1.5rem] tracking-[0.15em] text-[var(--accent)] max-[1024px]:text-[clamp(1rem,2.5vw,1.25rem)] max-[768px]:text-[clamp(0.9rem,2vw,1.25rem)] max-[480px]:text-[clamp(0.8rem,1.8vw,1rem)]">
              {project.title}
            </h3>
          </div>
          <p className="mb-2 font-['Inter',sans-serif] text-[0.875rem] uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            {project.category}
          </p>
          <p className="mb-6 flex-1 font-['Inter',sans-serif] text-[0.875rem] leading-[1.5] text-[var(--text-secondary)] max-[1024px]:text-[clamp(0.75rem,1.2vw,0.875rem)] max-[768px]:mb-[clamp(0.75rem,1.5vw,1.5rem)] max-[768px]:text-[clamp(0.7rem,1vw,0.875rem)] max-[480px]:text-[clamp(0.65rem,0.9vw,0.75rem)]">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-[0.625rem]">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-[8px] border border-[rgba(6,182,212,0.15)] bg-[rgba(6,182,212,0.05)] px-4 py-[0.625rem] font-['Staatliches',serif] text-[0.8125rem] tracking-[0.1em] text-[var(--text)] transition-all duration-300 [transition-timing-function:ease] hover:bg-[rgba(6,182,212,0.08)] max-[1024px]:px-[clamp(0.75rem,1.5vw,1rem)] max-[1024px]:py-[clamp(0.5rem,1vw,0.625rem)] max-[1024px]:text-[clamp(0.7rem,1vw,0.8125rem)] max-[768px]:gap-[clamp(0.3rem,0.5vw,0.5rem)] max-[768px]:px-[clamp(0.75rem,1.2vw,1rem)] max-[768px]:py-[clamp(0.5rem,0.8vw,0.625rem)] max-[768px]:text-[clamp(0.65rem,0.9vw,0.8125rem)] max-[480px]:px-[clamp(0.6rem,1vw,1rem)] max-[480px]:py-[clamp(0.4rem,0.7vw,0.625rem)] max-[480px]:text-[clamp(0.6rem,0.8vw,0.75rem)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-[rgba(6,182,212,0.1)] transition-colors duration-[400ms] [transition-timing-function:ease] group-hover:border-[rgba(6,182,212,0.4)]" />
      </div>
    </Link>
  );
};

export default function PortfolioPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data); // Show ALL projects
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const header = headerRef.current;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen overflow-hidden py-[clamp(4rem,8vw,8rem)]"
      style={{ background: "var(--bg)" }}
    >
      {/* Gradient Orbs Background */}
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />
      <div className="pointer-events-none absolute rounded-full opacity-40 blur-[120px]" />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        {/* Section Header */}
        <div ref={headerRef} className="mb-[clamp(2.5rem,5vw,5rem)] overflow-hidden text-center">
          <h2 className="sectionTitleGlobal">
            All My <span style={{ color: "var(--accent)" }}>PROJECTS</span>
          </h2>
        </div>

        {/* Projects Grid - ALL PROJECTS */}
        <div className="mb-[clamp(2rem,4vw,4rem)] grid grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] max-[1024px]:grid-cols-2 max-[1024px]:gap-[clamp(1rem,2vw,1.25rem)] max-[768px]:grid-cols-2 max-[768px]:gap-[clamp(0.875rem,2vw,1.25rem)] max-[480px]:grid-cols-1 max-[480px]:gap-[clamp(0.875rem,2vw,1.25rem)]">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* More Projects Button */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/mehedi-hasan1102"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FaGithub size={16} />
            <span>MORE PROJECTS</span>
          </a>
        </div>
      </div>
    </section>
  );
}
