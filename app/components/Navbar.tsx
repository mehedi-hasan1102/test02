'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

// Navigation links
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
];

// Dropdown menu items
const MORE_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Spotify', href: '/spotify' },
  { label: 'Feedback', href: '/feedback' },
  { label: 'Snippets', href: '/snippets' },
  { label: 'Social corner', href: '/social-corner' },
  { label: 'Light Mode', isThemeToggle: true },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const themeInitRef = useRef(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownLocked, setIsDropdownLocked] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);

  // ============================================
  // THEME TOGGLE EFFECT
  // ============================================
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Animate theme toggle button
    const button = document.querySelector('[data-theme-toggle-btn]');
    if (button) {
      gsap.to(button, {
        rotation: 360,
        duration: 0.6,
        ease: 'expo.out',
      });
    }

    // Update HTML class
    if (newIsDark) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // ============================================
  // NAVBAR ALWAYS VISIBLE (FIXED)
  // ============================================
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolling = currentScrollY > 50;

      // Set background style only
      setScrolled(isScrolling);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
  // LOAD SAVED THEME (without setState)
  // ============================================
  useLayoutEffect(() => {
    if (themeInitRef.current) return;
    themeInitRef.current = true;

    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(false);
      document.documentElement.classList.add('light-mode');
    } else if (saved === 'dark') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      document.documentElement.classList.remove('light-mode');
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
  // HANDLE NAVIGATION CLICK
  // ============================================
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ============================================
  // LOGO SCROLL TO TOP
  // ============================================
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        className="fixed top-0 left-0 right-0 z-40 h-16"
        style={{
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container h-full flex items-center justify-between px-4 md:px-6">
          {/* Logo - Left Side with Pill Background */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="text-lg md:text-xl font-bold hover:scale-110 active:scale-95 flex-shrink-0 px-4 py-2 rounded-full transition-all"
            style={{
              background: 'rgba(34, 211, 238, 0.1)',
              color: 'var(--accent)',
              letterSpacing: '0.05em',
              transition: 'transform 0.3s ease, background 0.3s ease',


 
            
            



            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
            }}
          >
            MEHEDI<span style={{ fontSize: '0.75em', verticalAlign: 'super' }}>®</span>
          </Link>

          {/* Desktop Navigation Links - Right Side with pill background */}
          <div className="hidden lg:flex items-center gap-6 px-6 py-2 rounded-full flex-shrink-0" style={{
            background: 'rgba(34, 211, 238, 0.08)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 211, 238, 0.15)',
          }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkHoverEnd}
                className="relative font-medium text-sm cursor-pointer whitespace-nowrap transition-colors"
                style={{
                  color: 'var(--text)',
                  letterSpacing: '0.025em',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
                {/* Underline that grows from left */}
                <span
                  data-underline
                  className="absolute bottom-0 left-0 w-full h-0.5 origin-left"
                  style={{
                    background: 'var(--accent)',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </Link>
            ))}

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
    className="relative font-medium text-sm flex items-center gap-1 hover:scale-105 transition-transform whitespace-nowrap"
    style={{
      color: isDropdownOpen ? 'var(--accent)' : 'var(--text)',
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
      transition: 'color 0.3s ease, transform 0.2s ease',
    }}
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
      style={{
        display: 'inline-block',
        transition: 'transform 0.3s ease',
        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      ▼
    </span>
  </button>

  {/* Menu */}
  <div
    role="menu"
    onMouseEnter={openDropdown}
    onMouseLeave={closeDropdownWithDelay}
    className="absolute top-full left-0 mt-2 w-48 rounded-lg border"
    style={{
      background: 'var(--bg)',
      borderColor: 'rgba(34, 211, 238, 0.2)',
      opacity: isDropdownOpen ? 1 : 0,
      pointerEvents: isDropdownOpen ? 'auto' : 'none',
      transition: 'opacity 0.3s ease',
      boxShadow: '0 10px 30px rgba(34, 211, 238, 0.15)',
    }}
  >
    {MORE_ITEMS.map((item, idx) => {
      // Theme toggle item
      if (item.isThemeToggle) {
        return (
          <button
            key="theme-toggle"
            onClick={() => {
              toggleTheme();
              setIsDropdownOpen(false);
              setIsDropdownLocked(false);
            }}
            className="w-full text-left block px-4 py-3 text-sm transition-all duration-300 hover:pl-5 cursor-pointer"
            style={{
              color: 'var(--text)',
              borderTop: '1px solid rgba(34, 211, 238, 0.1)',
              background: 'transparent',
              border: 'none',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                duration: 0.2,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                background: 'transparent',
                color: 'var(--text)',
                duration: 0.2,
              });
            }}
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        );
      }

      // Regular link items
      return (
        <Link
          key={item.href || 'theme-toggle'}
          href={item.href || '#'}
          role="menuitem"
          tabIndex={isDropdownOpen ? 0 : -1}
          className="block px-4 py-3 text-sm transition-all duration-300 hover:pl-5 cursor-pointer"
          style={{
            color: 'var(--text)',
            borderBottom:
              idx < MORE_ITEMS.length - 1
                ? '1px solid rgba(34, 211, 238, 0.1)'
                : 'none',
          }}
          onClick={(e) => {
            e.preventDefault();
            // Close dropdown and unlock when clicking a menu item
            setIsDropdownOpen(false);
            setIsDropdownLocked(false);
          }}
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, {
              background: 'rgba(34, 211, 238, 0.1)',
              color: 'var(--accent)',
              duration: 0.2,
            })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, {
              background: 'transparent',
              color: 'var(--text)',
              duration: 0.2,
            })
          }
        >
          {item.label}
        </Link>
      );
    })}
  </div>
</div>

            {/* Divider */}
            <div style={{ width: '1px', height: '24px', background: 'rgba(34, 211, 238, 0.2)' }} />
            
            {/* Book a Call CTA Button - Inside Pill */}
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-5 py-1.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm whitespace-nowrap"
              style={{
                background: 'var(--accent)',
                color: 'var(--bg)',
              }}
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
              Book a Call
            </button>

            {/* Theme Toggle on Mobile Only */}
            <button
              data-theme-toggle-mobile
              onClick={toggleTheme}
              className="p-2 rounded-lg lg:hidden"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'transform 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)';
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'all 0.3s ease',
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Controls - Right Side (Hamburger + Theme) */}
          <div className="lg:hidden ">
           
           

            {/* Mobile Menu Button - Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full"
              style={{
                background: 'rgba(34, 211, 238, 0.1)',
                color: 'var(--accent)',
                transition: 'all 0.3s ease',
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="mt-16 m-4 rounded-2xl fixed inset-0 z-30 lg:hidden opacity-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'var(--accent)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={(e) => {
          if (e.target === mobileMenuRef.current) {
            setIsOpen(false);
          }
        }}
      >
        {/* Menu Content */}
        <div className="h-full flex flex-col px-6 pt-6 pb-12" onClick={(e) => e.stopPropagation()}>
          {/* Top Bar - Profile + Close */}
         
          {/* Navigation Items with Numbers */}
          <div className="flex-1 space-y-8 mt-12">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-baseline gap-6 group cursor-pointer transition-all"
                style={{
                  color: 'var(--bg)',
                }}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-3xl font-black opacity-40 group-hover:opacity-100 transition-opacity">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-3xl font-bold group-hover:scale-105 transition-transform origin-left">
                  {link.label}
                </span>
              </Link>
            ))}
            
            {/* More Item */}
            <button
              onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
              className="flex items-baseline gap-6 group w-full text-left cursor-pointer transition-all"
              style={{
                color: 'var(--bg)',
                background: 'transparent',
                border: 'none',
              }}
            >
              <span className="text-3xl font-black opacity-40 group-hover:opacity-100 transition-opacity">
                05
              </span>
              <span className="text-3xl font-bold group-hover:scale-105 transition-transform origin-left">
                More
              </span>
            </button>

            {/* More Dropdown */}
            {isMobileMoreOpen && (
              <div className="pl-20 space-y-3">
                {MORE_ITEMS.map((item) => {
                  if (item.isThemeToggle) {
                    return (
                      <button
                        key="theme-toggle-mobile"
                        onClick={() => {
                          toggleTheme();
                        }}
                        className="text-lg font-semibold block hover:scale-105 cursor-pointer transition-transform origin-left"
                        style={{
                          color: 'var(--bg)',
                          background: 'transparent',
                          border: 'none',
                        }}
                      >
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={item.href || 'theme-toggle'}
                      href={item.href || '#'}
                      className="text-lg font-semibold block hover:scale-105 cursor-pointer transition-transform origin-left"
                      style={{
                        color: 'var(--bg)',
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
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
              className="font-semibold hover:scale-110 transition-transform"
              style={{ color: 'var(--bg)' }}
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/mehedi-hasan1102"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:scale-110 transition-transform"
              style={{ color: 'var(--bg)' }}
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/mehedihasan1102"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:scale-110 transition-transform"
              style={{ color: 'var(--bg)' }}
            >
              X
            </a>
          </div>
        </div>
      </div>

      {/* Padding for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
