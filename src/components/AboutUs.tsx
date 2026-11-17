import React from 'react';
import { MapPin, Target, Sparkles, ShieldCheck, ArrowUpRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-grey text-brand-navy text-xs font-semibold tracking-wide uppercase mb-4">
            <MapPin className="w-3.5 h-3.5 text-brand-orange" />
            Pune, Maharashtra, India
          </div>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-deep tracking-tight mb-6"
          >
            Meet Pehchaan Digital.
          </h2>
          <div className="w-16 h-1 bg-brand-orange rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium">
            Pehchaan Digital is a Pune-based digital solutions agency committed to helping startups, local businesses, and growing enterprises establish a meaningful online presence.
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-4">
            Our mission is simple: to make modern, high-quality digital services accessible, transparent, and result-driven for businesses of every scale.
          </p>
        </div>

        {/* Brand Mission Callout & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Mission & Tagline Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy-deep via-brand-navy to-brand-navy-deep text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-orange inline-block mb-3">
                Our Guiding Philosophy
              </span>
              <blockquote className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4 leading-snug">
                “Apni Pehchaan, <br />
                <span className="text-brand-orange">Digital Duniya Mein.</span>”
              </blockquote>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Your name is your reputation; your digital pehchaan is how the modern world discovers, trusts, and chooses you. We build digital assets that reflect your real-world credibility.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white block">Rooted in Pune</span>
                Serving businesses pan-India
              </div>
              <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGES.TALK_TO_TEAM)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-semibold text-xs tracking-wide transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Connect With Us
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Three Core Commitments */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-brand-soft border border-brand-grey rounded-2xl p-6 sm:p-7 hover:border-brand-navy/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-brand-navy text-white flex items-center justify-center mb-5 shadow-sm">
                  <Target className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy-deep mb-2">
                  No Artificial Gimmicks
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We don't sell bloated vanity metrics or inflated promises. Every website, campaign, and profile we create is designed to drive actual client enquiries and tangible business value.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/70 text-xs font-semibold text-brand-navy">
                Practical ROI & Clean Code
              </div>
            </div>

            <div className="bg-brand-soft border border-brand-grey rounded-2xl p-6 sm:p-7 hover:border-brand-navy/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-brand-navy text-white flex items-center justify-center mb-5 shadow-sm">
                  <Sparkles className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy-deep mb-2">
                  Design With Purpose
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A good website is not just aesthetic; it’s an effortless conversion funnel. We balance high-end visual elegance with mobile-first performance and clear WhatsApp actions.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/70 text-xs font-semibold text-brand-navy">
                Conversion-First UI/UX
              </div>
            </div>

            <div className="sm:col-span-2 bg-brand-soft border border-brand-grey rounded-2xl p-6 sm:p-7 hover:border-brand-navy/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-navy-deep mb-1">
                    Transparent & Accessible
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Transparent launch pricing, clearly defined deliverables, zero hidden fees, and dedicated direct communication via WhatsApp and phone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
