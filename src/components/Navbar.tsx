import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl, COMMON_MESSAGES, PRIMARY_PHONE } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

interface NavbarProps {
  onNavigateHome: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenAdmin?: () => void;
  currentView?: 'home' | 'privacy' | 'terms' | 'admin';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onOpenAdmin, currentView = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Our Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border/70 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-brand-border/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-lg"
            aria-label="Pehchaan Digital Homepage"
          >
            <img
              src="/logo.png"
              alt="Pehchaan Digital - Apni Pehchaan, Digital Duniya Mein"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              width="150"
              height="44"
              loading="eager"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 text-sm font-semibold text-brand-navy-deep hover:text-brand-orange rounded-lg transition-colors duration-200 hover:bg-brand-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${PRIMARY_PHONE.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy-deep/80 hover:text-brand-orange px-2.5 py-1.5 transition-colors"
              title="Call Pehchaan Digital"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>{PRIMARY_PHONE}</span>
            </a>

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-xs font-semibold text-brand-navy-deep/60 hover:text-brand-orange px-2 py-1 rounded-lg hover:bg-brand-soft transition-colors"
                title="Admin Portal"
              >
                Admin
              </button>
            )}

            <a
              href={getWhatsAppUrl(COMMON_MESSAGES.getStarted)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Navbar "Get Started"')}
              className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-orange-glow transition-all duration-200 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden gap-2">
            <a
              href={getWhatsAppUrl(COMMON_MESSAGES.getStarted)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Navbar Mobile WhatsApp Icon')}
              className="inline-flex items-center justify-center bg-brand-orange text-white p-2 rounded-full shadow-sm"
              aria-label="Contact on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-navy-deep hover:text-brand-orange hover:bg-brand-soft rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-brand-border shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2.5 text-base font-semibold text-brand-navy-deep hover:text-brand-orange hover:bg-brand-soft rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-brand-border/60 flex flex-col gap-3">
              <a
                href={getWhatsAppUrl(COMMON_MESSAGES.getStarted)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('Navbar Mobile Drawer WhatsApp')}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange text-white font-bold py-3 px-4 rounded-xl shadow-orange-glow active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Get Started on WhatsApp</span>
              </a>

              <a
                href={`tel:${PRIMARY_PHONE.replace(/[^0-9+]/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-navy py-2 text-center hover:text-brand-orange"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {PRIMARY_PHONE}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
