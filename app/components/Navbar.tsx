'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { FiMenu, FiX, FiMessageCircle, FiChevronDown } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';
import BookingModal from './BookingModal';
import { useTheme } from '../../lib/useTheme';

// Navigation links
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolyio', href: '/portfolyio' },
  { label: 'Blog', href: '/blog' },
];

// Dropdown menu items
const MORE_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  // { label: 'Spotify', href: '/spotify' },
  // { label: 'Feedback', href: '/feedback' },
  // { label: 'Snippets', href: '/snippets' },
  { label: 'Links', href: '/links' },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { isDark, toggleTheme: handleToggleTheme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const mobileMainItemClass =
    'group relative flex w-full cursor-pointer items-center gap-6 text-[var(--bg)] transition-all';
  const mobileMainNumberClass =
    'w-10 text-left text-3xl leading-none font-black opacity-40 transition-opacity group-hover:opacity-100';
  const mobileMainLabelClass =
    'flex items-center gap-3 text-3xl leading-none font-bold transition-transform origin-left group-hover:scale-105';

  // Theme toggle now handled by useTheme hook

  // ============================================
  // INITIAL ANIMATION
  // ============================================
  useEffect(() => {
    // Animate navbar on mount
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
      });
    }
  }, []);

  // ============================================
  // MOBILE MENU ANIMATION
  // ============================================
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      // Show menu
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Stagger animate menu links
      const links = mobileMenuRef.current.querySelectorAll('[data-menu-link]');
      gsap.killTweensOf(links);
      gsap.set(links, { opacity: 1, y: 0 });
      gsap.from(links, {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.1,
      });
    } else {
      // Hide menu
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  // ============================================
  // LINK HOVER EFFECT
  // ============================================
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const underline = link.querySelector('[data-underline]');

    gsap.to(link, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
        transformOrigin: 'left',
      });
    }
  };

  const handleLinkHoverEnd = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const underline = link.querySelector('[data-underline]');

    gsap.to(link, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.out',
        transformOrigin: 'left',
      });
    }
  };

  // ============================================
  // LOGO SCROLL TO TOP
  // ============================================
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only scroll to top if already on home page
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Otherwise allow normal navigation
  };

  const openDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const closeDropdownWithDelay = () => {
    // Only auto-close if not locked by click
    if (isDropdownLocked) return;
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 3000);
  };

  const toggleDropdownLock = () => {
    setIsDropdownLocked((prev) => {
      const newLocked = !prev;
      setIsDropdownOpen(newLocked ? true : false);
      return newLocked;
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setIsDropdownLocked(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);








  return (
    <>
      {/* Main Navbar */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-40 h-16 [font-family:'Staatliches',serif]"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container h-full flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            {/* Logo - Left Side with Pill Background */}
            <Link
              href="/"
              onClick={scrollToTop}
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[rgba(34,211,238,0.1)] px-2.5 py-1.5 text-base font-bold tracking-[0.05em] text-[var(--accent)] transition-all duration-300 hover:bg-[rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2),inset_0_0_10px_rgba(34,211,238,0.1)] active:opacity-85 sm:px-4 sm:py-2 sm:text-lg"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
              }}
            >
              <Image
                src="/profile/profile.png"
                alt="Mehedi Hasan's profile logo"
                width={28}
                height={28}
                className="rounded-full sm:mr-2"
              />
              <span className="hidden sm:inline">
                Mehedi Hasan<span style={{ fontSize: '0.75em', verticalAlign: 'super' }}></span>
              </span>
            </Link>
            <button
              type="button"
              onClick={handleToggleTheme}
              className="hidden rounded-full bg-[rgba(34,211,238,0.1)] p-2 text-[var(--accent)] transition-all duration-300 hover:bg-[rgba(34,211,238,0.15)]"
              aria-label="Toggle theme"
              title="Toggle theme"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
              }}
            >
              {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
          </div>

          {/* Desktop Navigation Links - Right Side with pill background */}
          <div className="hidden shrink-0 items-center rounded-full border border-[rgba(34,211,238,0.15)] bg-[rgba(34,211,238,0.08)] py-2 backdrop-blur-[10px] lg:flex lg:gap-4 lg:px-4 xl:gap-6 xl:px-6">
            <button
              type="button"
              onClick={handleToggleTheme}
              className="inline-flex rounded-full bg-[rgba(34,211,238,0.1)] p-2 text-[var(--accent)] transition-all duration-300 hover:bg-[rgba(34,211,238,0.15)]"
              aria-label="Toggle theme"
              title="Toggle theme"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
              }}
            >
              {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>

 <div className="h-6 w-px bg-[rgba(34,211,238,0.2)]" />

            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkHoverEnd}
                  className={`relative cursor-pointer whitespace-nowrap text-sm font-medium uppercase tracking-[0.025em] transition-all duration-300 ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                  }`}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                    />
                  )}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdownWithDelay}
            >
              {/* Trigger Button */}
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                className={`flex cursor-pointer items-center gap-1 whitespace-nowrap bg-transparent p-0 text-sm font-medium uppercase tracking-[0.025em] transition-all duration-300 hover:scale-105 ${
                  isDropdownOpen ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                }`}
                onClick={toggleDropdownLock}
                onFocus={openDropdown}
                onBlur={closeDropdownWithDelay}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, { color: 'var(--accent)', duration: 0.3 })
                }
                onMouseLeave={(e) => {
                  if (!isDropdownOpen) {
                    gsap.to(e.currentTarget, { color: 'var(--text)', duration: 0.3 });
                  }
                }}
              >
                More
                <span
                  aria-hidden
                  className={`inline-block transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <FiChevronDown size={16} />
                </span>
              </button>

              {/* Menu */}
              <div
                role="menu"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdownWithDelay}
                className={`absolute left-0 top-full mt-2 w-48 rounded-lg border border-[rgba(34,211,238,0.2)] bg-[var(--bg)] shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-opacity duration-300 ${
                  isDropdownOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                {MORE_ITEMS.map((item, idx) => {
                  const isLastItem = idx === MORE_ITEMS.length - 1;
                  const dropdownItemBaseClass =
                    'block w-full cursor-pointer bg-transparent px-4 py-3 text-left text-sm transition-all duration-200';

                  // Regular link items
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      tabIndex={isDropdownOpen ? 0 : -1}
                      className={`${dropdownItemBaseClass} ${
                        isLastItem ? 'border-none' : 'border-b border-[rgba(34,211,238,0.1)]'
                      } ${isActive ? 'bg-[rgba(34,211,238,0.1)] text-[var(--accent)]' : 'text-[var(--text)]'}`}
                      onClick={() => {
                        // Close dropdown and unlock when clicking a menu item
                        setIsDropdownOpen(false);
                        setIsDropdownLocked(false);
                      }}
                      onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, {
                          background: 'rgba(34, 211, 238, 0.1)',
                          color: 'var(--accent)',
                          paddingLeft: '1.25rem',
                          duration: 0.2,
                        })
                      }
                      onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, {
                          background: isActive ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                          color: isActive ? 'var(--accent)' : 'var(--text)',
                          paddingLeft: '1rem',
                          duration: 0.2,
                        })
                      }
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {isActive && (
                          <span className="inline-block h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-[rgba(34,211,238,0.2)]" />
            
            {/* Let's Talk CTA Button - Inside Pill */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-1.5 text-sm font-semibold text-[var(--bg)] transition-all duration-300 hover:scale-105 active:scale-95"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 8px 20px rgba(34, 211, 238, 0.4)',
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  boxShadow: '0 0px 0px rgba(34, 211, 238, 0)',
                  duration: 0.3,
                });
              }}
            >
              <FiMessageCircle
                size={18}
                className="shrink-0 transition-all duration-300 group-hover:scale-[1.15] group-hover:-rotate-20"
              />
              Let&apos;s Talk
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg bg-[rgba(34,211,238,0.1)] p-2 text-[var(--accent)] transition-all duration-300 lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Controls - Right Side (Hamburger + Theme) */}
          <div className="flex items-center gap-1.5 lg:hidden sm:gap-2">
            {/* Let's Talk Icon Button - Mobile Only */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="rounded-full bg-[rgba(6,182,212,0.2)] p-1.5 text-[var(--accent)] transition-all duration-300 hover:scale-110 sm:p-2"
              aria-label="Let's talk"
            >
              <FiMessageCircle size={18} />
            </button>

            <button
              type="button"
              onClick={handleToggleTheme}
              className="rounded-full bg-[rgba(34,211,238,0.1)] p-1.5 text-[var(--accent)] transition-all duration-300 hover:scale-110 sm:p-2"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Mobile Menu Button - Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full bg-[rgba(34,211,238,0.1)] p-1.5 text-[var(--accent)] transition-all duration-300 hover:scale-110 sm:p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-30 m-4 mt-16 rounded-2xl bg-[var(--accent)] [font-family:'Staatliches',serif] transition-opacity duration-300 lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={(e) => {
          if (e.target === mobileMenuRef.current) {
            setIsOpen(false);
          }
        }}
      >
        {/* Menu Content */}
        <div className="h-full flex flex-col overflow-y-auto px-6 pt-6 pb-12" onClick={(e) => e.stopPropagation()}>
          {/* Top Bar - Profile + Close */}
         
          {/* Navigation Items with Numbers */}
          <div className="mt-8 flex-1 min-h-0 space-y-3 overflow-y-auto pb-6 sm:mt-12">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={mobileMainItemClass}
                  data-menu-link
                  onClick={() => setIsOpen(false)}
                >
                  <span className={mobileMainNumberClass}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={mobileMainLabelClass}>
                    {link.label}
                    {isActive && (
                      <span className="inline-block h-2 w-2 rounded-full bg-[var(--bg)] shadow-[0_0_12px_var(--bg)]" />
                    )}
                  </span>
                </Link>
              );
            })}
            
            {/* More Item */}
            <button
              type="button"
              onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
              className={`${mobileMainItemClass} border-none bg-transparent text-left`}
              data-menu-link
            >
              <span className={mobileMainNumberClass}>
                {String(NAV_LINKS.length + 1).padStart(2, '0')}
              </span>
              <span className={mobileMainLabelClass}>
                More
                <span
                  aria-hidden
                  className={`inline-block transition-transform duration-300 ${
                    isMobileMoreOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <FiChevronDown size={20} />
                </span>
                </span>
              </button>

            {/* More Dropdown */}
            {isMobileMoreOpen && (
              <div className="pl-20 space-y-1">
                {MORE_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block cursor-pointer text-lg font-bold text-[var(--bg)] transition-transform origin-left hover:scale-105"
                      data-menu-link
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {isActive && (
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--bg)] shadow-[0_0_10px_var(--bg)]" />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Social Links - Bottom */}
          <div className="flex gap-8">
            <a
              href="https://github.com/mehedi-hasan1102"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--bg)] transition-transform hover:scale-110"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/mehedi-hasan1102"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--bg)] transition-transform hover:scale-110"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/mehedihasan1102"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--bg)] transition-transform hover:scale-110"
            >
              X
            </a>
          </div>
        </div>
      </div>

      {/* Padding for fixed navbar */}
      <div className="h-16" />
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
