"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import styles from "./projects.module.css";

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
    <Link href={`/projects/${project.slug}`}>
      <div
        ref={cardRef}
        className={styles.projectCard}
        onMouseMove={handleMouseMove}
      >
        <div ref={glowRef} className={styles.projectGlow} />
        <span className={styles.projectLinkIcon} aria-hidden="true">
          <FiExternalLink size={18} />
        </span>
        
        {/* Project Image */}
        <div className={styles.projectImageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={styles.projectImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          <div className={styles.projectImageOverlay} />
        </div>
        
        <div ref={contentRef} className={styles.projectContent}>
          <div className={styles.projectHeader}>
            <span className={styles.projectNumber}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.projectTitle}>{project.title}</h3>
          </div>
          <p className={styles.projectCategory}>{project.category}</p>
          <p className={styles.projectDescription}>{project.description}</p>
          <div className={styles.projectTags}>
            {project.tech.map((tag) => (
              <span key={tag} className={styles.projectTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.projectBorder} />
      </div>
    </Link>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data.slice(0, 6)); // Show first 4 projects
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
    <section ref={sectionRef} className={styles.projectsSection} id="projects">
    

      <div className={styles.projectsContainer}>
        {/* Section Header */}
        <div ref={headerRef} className={styles.projectsHeader}>
          <h2 className="sectionTitleGlobal">
            Featured <span style={{ color: "var(--accent)" }}>PROJECTS</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* More Projects Button */}
        <div className={styles.moreProjectsSection}>
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
