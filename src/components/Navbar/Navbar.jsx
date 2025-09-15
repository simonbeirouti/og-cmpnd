"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ContactModal from "../ContactModal/ContactModal";

import "./Navbar.css";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic navigation items array
  const navItems = [
    {
      type: 'link',
      href: '/updates',
      label: 'Updates'
    },
    {
      type: 'button',
      label: 'Contact',
      onClick: () => setIsModalOpen(true)
    }
  ];

  // Social links array
  const socialLinks = [
    {
      href: 'https://twitter.com',
      label: 'Twitter',
      icon: '🐦'
    },
    {
      href: 'https://linkedin.com',
      label: 'LinkedIn',
      icon: '💼'
    },
    {
      href: 'https://instagram.com',
      label: 'Instagram',
      icon: '📷'
    }
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={`navbar ${!isVisible ? 'navbar--hidden' : ''}`}>
        <div className="navbar-col">
          <div className="navbar-sub-col logo">
            <Link href="/" onClick={handleMobileMenuClose}>
              <h3>Compound</h3>
            </Link>
          </div>
        </div>
        <div className="navbar-col">
          <div className="navbar-sub-col nav-items">
            {navItems.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <Link key={index} href={item.href} className="contact-btn">
                    <p>{item.label}</p>
                  </Link>
                );
              } else if (item.type === 'button') {
                return (
                  <button
                    key={index}
                    className="contact-btn"
                    onClick={item.onClick}
                  >
                    <p>{item.label}</p>
                  </button>
                );
              }
              return null;
            })}
          </div>
          <div className="navbar-sub-col mobile-menu-btn">
            <button
              className="hamburger-btn"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <nav className="mobile-nav-items">
            {navItems.map((item, index) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={handleMobileMenuClose}
                  >
                    {item.label}
                  </Link>
                );
              } else if (item.type === 'button') {
                return (
                  <button
                    key={index}
                    className="mobile-nav-button"
                    onClick={handleContactClick}
                  >
                    {item.label}
                  </button>
                );
              }
              return null;
            })}
          </nav>

          <div style={{ flex: 1 }} />

          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;