import React from 'react';
import { ArrowRight, MessageCircle, CheckCircle2, Sparkles, Globe, TrendingUp, Smartphone } from 'lucide-react';
import { getWhatsAppUrl, COMMON_MESSAGES } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-white via-brand-soft to-brand-soft">
      {/* Subtle background glow effect (minimal, non-distracting) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-orange/5 via-brand-navy/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Small Location / Agency Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange-light border border-brand-orange/30 text-brand-navy-deep text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span>Digital Agency in Pune, Maharashtra</span>
              <span className="text-brand-orange font-bold">•</span>
              <span className="text-brand-orange font-bold">Apni Pehchaan</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-brand-navy-deep tracking-tight leading-[1.12]">
              Build Your Brand.{' '}
              <span className="block mt-1 sm:mt-2 text-brand-navy">Grow Your Business.</span>{' '}
              <span className="text-brand-orange relative inline-block">
                Go Digital.
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-brand-orange/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-brand-navy-deep/80 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              We help businesses establish a powerful online presence through modern websites, creative branding, and result-driven digital marketing solutions.
            </p>

            {/* 4 Core Pillars Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-navy-deep/90 bg-white/80 border border-brand-border/60 py-2 px-3 rounded-lg shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Website Development</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-navy-deep/90 bg-white/80 border border-brand-border/60 py-2 px-3 rounded-lg shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Digital Marketing</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-navy-deep/90 bg-white/80 border border-brand-border/60 py-2 px-3 rounded-lg shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Social Media Growth</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-navy-deep/90 bg-white/80 border border-brand-border/60 py-2 px-3 rounded-lg shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                <span>SEO & Branding</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-navy hover:bg-brand-navy-deep text-white font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </a>

              <a
                href={getWhatsAppUrl(COMMON_MESSAGES.heroTalk)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-brand-orange-light text-brand-navy-deep border-2 border-brand-orange font-bold px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 group"
              >
                <MessageCircle className="w-5 h-5 text-brand-orange group-hover:scale-110 transition-transform" />
                <span>Talk to Our Team</span>
              </a>
            </div>

            {/* Launch Pricing Callout Pill */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-brand-navy-deep/70">
              <span className="inline-block px-2 py-0.5 rounded bg-brand-orange text-white font-bold text-[10px] tracking-wider uppercase">
                Launch Offer
              </span>
              <span>Websites starting from just <strong>₹7,999</strong> for Pune businesses</span>
            </div>
          </div>

          {/* Right Column: Lightweight, Minimal & Crisp Device Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual composition with Laptop and Smartphone Mockup */}
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Laptop Shell */}
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-card border border-brand-border relative z-10">
                {/* Browser bar */}
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/60 px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-brand-soft px-3 py-1 rounded-md text-[11px] font-mono text-brand-navy-deep/60 flex items-center gap-1.5 border border-brand-border/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>https://yourbusiness.com</span>
                  </div>
                  <div className="w-6" />
                </div>

                {/* Simulated Modern Agency Web UI */}
                <div className="pt-4 space-y-3">
                  {/* Mini Hero Header in mockup */}
                  <div className="bg-gradient-to-br from-brand-navy to-brand-navy-deep p-4 rounded-xl text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-white/20 rounded-md" />
                      <div className="h-5 px-2 bg-brand-orange rounded-full text-[10px] font-bold flex items-center">
                        Active
                      </div>
                    </div>
                    <div className="h-5 w-3/4 bg-white/90 rounded-md" />
                    <div className="h-3 w-1/2 bg-white/50 rounded-md" />
                    <div className="pt-2 flex gap-2">
                      <div className="h-7 w-20 bg-brand-orange rounded-md" />
                      <div className="h-7 w-16 bg-white/20 rounded-md" />
                    </div>
                  </div>

                  {/* 3 mini cards */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="bg-brand-soft p-2.5 rounded-lg border border-brand-border/50 text-center">
                      <Globe className="w-4 h-4 mx-auto text-brand-navy mb-1" />
                      <div className="text-[10px] font-bold text-brand-navy-deep">Responsive</div>
                      <div className="text-[9px] text-brand-navy-deep/60">Mobile & Web</div>
                    </div>
                    <div className="bg-brand-soft p-2.5 rounded-lg border border-brand-border/50 text-center">
                      <TrendingUp className="w-4 h-4 mx-auto text-brand-orange mb-1" />
                      <div className="text-[10px] font-bold text-brand-navy-deep">SEO Ready</div>
                      <div className="text-[9px] text-brand-navy-deep/60">Google Rank</div>
                    </div>
                    <div className="bg-brand-soft p-2.5 rounded-lg border border-brand-border/50 text-center">
                      <MessageCircle className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                      <div className="text-[10px] font-bold text-brand-navy-deep">WhatsApp</div>
                      <div className="text-[9px] text-brand-navy-deep/60">Instant Leads</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smartphone Shell - Overlapping in front */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 w-44 sm:w-48 bg-brand-navy-dark rounded-3xl p-2.5 shadow-2xl border-2 border-white z-20">
                {/* Notch */}
                <div className="w-12 h-2.5 bg-black rounded-full mx-auto mb-2" />
                {/* Phone screen */}
                <div className="bg-white rounded-2xl p-2.5 space-y-2 border border-brand-border/40">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-14 bg-brand-navy rounded" />
                    <div className="w-4 h-4 rounded-full bg-brand-orange/20 flex items-center justify-center">
                      <Smartphone className="w-2.5 h-2.5 text-brand-orange" />
                    </div>
                  </div>
                  <div className="h-10 bg-brand-soft rounded-lg p-1.5 flex flex-col justify-center">
                    <div className="text-[9px] font-bold text-brand-navy-deep">Mobile Experience</div>
                    <div className="text-[8px] text-emerald-600 font-semibold">100% Score</div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
                    <div className="text-[9px] font-extrabold text-emerald-800 flex items-center justify-center gap-1">
                      <MessageCircle className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span>WhatsApp Leads</span>
                    </div>
                    <div className="text-[8px] text-emerald-700">1-Tap Direct Enquiries</div>
                  </div>
                </div>
              </div>

              {/* Floating Pune Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white py-2 px-3.5 rounded-xl shadow-lg border border-brand-border z-30 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-xs font-bold text-brand-navy-deep">Pune & PCMC</div>
                  <div className="text-[10px] text-brand-navy-deep/60">Digital Growth Partner</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
