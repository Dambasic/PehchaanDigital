import React from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Instagram,
  ArrowUp,
  Heart
} from 'lucide-react';
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  PRIMARY_WHATSAPP_NUMBER,
  getWhatsAppUrl,
  WHATSAPP_MESSAGES
} from '../utils/whatsapp';
import { SERVICES } from '../data/services';

interface FooterProps {
  onNavigateHome?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const scrollToTop = () => {
    if (onNavigateHome) onNavigateHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-navy-deep text-white border-t border-white/10" role="contentinfo">
      {/* Top Banner / Callout */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Ready to take your business digital?
            </h4>
            <p className="text-slate-400 text-sm mt-1">
              Chat with us directly on WhatsApp. Quick answers, no spam.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={getWhatsAppUrl(WHATSAPP_MESSAGES.TALK_TO_TEAM)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-dark-mode.png"
                alt="Pehchaan Digital Logo"
                className="h-10 w-auto object-contain"
                loading="lazy"
                onError={(e) => {
                  // Fallback if dark-mode logo fails
                  const target = e.target as HTMLImageElement;
                  target.src = '/logo-transparent.png';
                }}
              />
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  Pehchaan Digital
                </span>
                <span className="text-[11px] font-semibold text-brand-orange uppercase tracking-wider block">
                  Digital Agency • Pune
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              <strong className="text-white">“Apni Pehchaan, Digital Duniya Mein.”</strong>
              <br />
              Helping startups, local shops, and businesses build an authentic, conversion-focused online presence with modern web development and digital marketing.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/mh14rtopatilenterprises/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-all"
                aria-label="View our client marketing on Instagram: @mh14rtopatilenterprises"
                title="View client work: @mh14rtopatilenterprises"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white flex items-center justify-center transition-all"
                aria-label="Direct WhatsApp Message"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PRIMARY_PHONE.replace(/[^0-9+]/g, '')}`}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                aria-label="Call Pehchaan Digital"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="#home"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  Our Work
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="hover:text-brand-orange transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services List (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Services
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={() => onNavigateHome && onNavigateHome()}
                    className="hover:text-brand-orange transition-colors flex items-center justify-between"
                  >
                    <span>{service.name}</span>
                    <span className="text-[11px] text-brand-orange font-semibold">
                      {service.launchPrice}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  onClick={() => onNavigateHome && onNavigateHome()}
                  className="text-xs text-brand-orange hover:underline font-semibold"
                >
                  + View All 8 Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Headquarters
            </h5>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Primary WhatsApp</div>
                  <a
                    href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange transition-colors font-medium text-white"
                  >
                    {PRIMARY_PHONE}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Secondary Contact</div>
                  <a
                    href={`tel:${SECONDARY_PHONE.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-brand-orange transition-colors font-medium text-white"
                  >
                    {SECONDARY_PHONE}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">
                Working Hours: Mon–Sat, 10 AM – 7 PM IST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 bg-brand-navy-deep/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Pehchaan Digital. All rights reserved. Made with{' '}
            <Heart className="w-3 h-3 text-brand-orange inline mx-0.5 fill-brand-orange" /> in Pune, Maharashtra.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenPrivacy && onOpenPrivacy()}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenTerms && onOpenTerms()}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-brand-orange transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              Back to top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
