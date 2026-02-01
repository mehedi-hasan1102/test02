'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  color: string;
  tags: string[];
  technologies: {
    frontend?: string[];
    backend?: string[];
    animation?: string[];
    payment?: string[];
    database?: string[];
    realtime?: string[];
  };
  features: string[];
  challenges: string[];
  solutions: string[];
  liveUrl: string;
  githubUrl: string;
  images: string[];
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
      // Animate hero section
      gsap.from('[data-animate-hero]', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // Animate sections on scroll
      const sections = gsap.utils.toArray('[data-section]') as Element[];
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
          opacity: 0,
          y: 40,
        });
      });
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

  const allTechs = Object.values(project.technologies).flat().filter(Boolean);

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-20 md:py-32"
        style={{
          background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div data-animate-hero className="flex items-center gap-2 mb-8">
              <button
                onClick={() => router.back()}
                className="text-sm font-semibold"
                style={{ color: project.color }}
              >
                ← Back
              </button>
              <span style={{ color: 'var(--text-secondary)' }}>/</span>
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                {project.category}
              </span>
            </div>

            {/* Title and Description */}
            <h1
              data-animate-hero
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              style={{
                color: 'var(--text)',
              }}
            >
              {project.title}
            </h1>

            <p
              data-animate-hero
              className="text-lg md:text-xl mb-8 max-w-2xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div data-animate-hero className="flex flex-wrap gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  background: project.color,
                  color: 'white',
                }}
              >
                View Live Project 🚀
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold transition-all border hover:scale-105"
                style={{
                  borderColor: project.color,
                  color: project.color,
                }}
              >
                View Source Code 💻
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.fullDescription}
          </p>
        </div>
      </section>

      {/* Technologies */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{
              color: 'var(--text)',
              backgroundImage: `linear-gradient(135deg, var(--text) 0%, ${project.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Technologies Used
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(project.technologies).map(([category, techs]) => (
              techs && techs.length > 0 && (
                <div key={category}>
                  <h3
                    className="text-lg font-semibold mb-4 capitalize"
                    style={{ color: project.color }}
                  >
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                          background: `${project.color}20`,
                          color: project.color,
                          border: `1px solid ${project.color}40`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{
              color: 'var(--text)',
              backgroundImage: `linear-gradient(135deg, var(--text) 0%, ${project.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Key Features
          </h2>

          <div className="space-y-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: project.color,
                    color: 'white',
                  }}
                >
                  ✓
                </div>
                <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section data-section className="py-16 md:py-24 border-b" style={{ borderColor: 'rgba(34, 211, 238, 0.1)' }}>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{
              color: 'var(--text)',
              backgroundImage: `linear-gradient(135deg, var(--text) 0%, ${project.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Challenges & Solutions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Challenges */}
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: project.color }}>
                🔴 Challenges
              </h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: project.color }} className="flex-shrink-0">
                      •
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-xl font-semibold mb-6" style={{ color: project.color }}>
                🟢 Solutions
              </h3>
              <ul className="space-y-3">
                {project.solutions.map((solution, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span style={{ color: project.color }} className="flex-shrink-0">
                      ✓
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            Interested in working together?
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="text-lg mb-8">
            Let&#39;s build something amazing together!
          </p>
          <Link
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}, #7c3aed)`,
              color: 'white',
            }}
          >
            Get in Touch 💌
          </Link>
        </div>
      </section>
    </div>
  );
}
