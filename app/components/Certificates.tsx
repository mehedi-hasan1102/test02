"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink } from "react-icons/fi";
import styles from "./certificates.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
  skills: string[];
  credentialUrl?: string;
}

const CertificateCard = ({
  certificate,
  index,
}: {
  certificate: Certificate;
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

        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          },
          0,
        );

        tl.to(
          content,
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          0.2,
        );
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

  const cardBody = (
    <div
      ref={cardRef}
      className={styles.certificateCard}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className={styles.certificateGlow} />
      {certificate.credentialUrl ? (
        <span className={styles.certificateLinkIcon} aria-hidden="true">
          <FiExternalLink size={18} />
        </span>
      ) : null}

      <div className={styles.certificateImageContainer}>
        <Image
          src={certificate.image}
          alt={certificate.title}
          fill
          className={styles.certificateImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
        />
        <div className={styles.certificateImageOverlay} />
      </div>

      <div ref={contentRef} className={styles.certificateContent}>
        <div className={styles.certificateHeader}>
          <span className={styles.certificateNumber}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.certificateTitle}>{certificate.title}</h3>
        </div>
        <p className={styles.certificateIssuer}>{certificate.issuer}</p>
        <p className={styles.certificateYear}>{certificate.year}</p>
        <div className={styles.certificateTags}>
          {certificate.skills.map((tag) => (
            <span key={tag} className={styles.certificateTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.certificateBorder} />
    </div>
  );

  if (certificate.credentialUrl) {
    return (
      <a
        href={certificate.credentialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.certificateLink}
      >
        {cardBody}
      </a>
    );
  }

  return <div className={styles.certificateLink}>{cardBody}</div>;
};

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("/data/certificates.json");
        const data = await response.json();
        setCertificates(data.slice(0, 6));
      } catch (error) {
        console.error("Error loading certificates:", error);
      }
    };

    fetchCertificates();
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

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={styles.certificatesSection}
      id="certificates"
    >
      <div className={styles.certificatesContainer}>
        <div ref={headerRef} className={styles.certificatesHeader}>
          <h2 className="sectionTitleGlobal">
            Career <span style={{ color: "var(--accent)" }}>Certifications</span>
          </h2>
        </div>

        <div className={styles.certificatesGrid}>
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
