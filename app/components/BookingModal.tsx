'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FiX } from 'react-icons/fi';
import styles from './bookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Show modal with animation
      gsap.to(modalRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animate form
      const form = formRef.current;
      if (form) {
        gsap.from(form, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.1,
        });
      }

      document.body.style.overflow = 'hidden';
    } else {
      // Hide modal with animation
      gsap.to(modalRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.inOut',
      });

      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setSubmitStatus('success');
      setFormData({ email: '', message: '' });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === modalRef.current) {
          onClose();
        }
      }}
    >
      <form ref={formRef} className={styles.modalContent} onSubmit={handleSubmit}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        {/* Heading */}
        <h2 className={styles.modalHeading}>Get in Touch</h2>
        <p className={styles.modalSubheading}>
          I&apos;m open to job opportunities and collaborations. Let&apos;s connect!
        </p>

        {/* Form Fields */}
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="message"
            placeholder="Tell me about the opportunity or just say hi..."
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className={styles.textarea}
          />
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            ✓ Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            ✗ Something went wrong. Please try again.
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
