import React from 'react';
import {
  ExternalLink,
  Globe,
  Instagram,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';

export const FeaturedWork: React.FC = () => {
  return (
    <section id="work" className="py-20 lg:py-28 bg-white" aria-labelledby="work-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-grey text-brand-navy text-xs font-semibold tracking-wide uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            Proven Client Results
          </div>
          <h2
            id="work-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-deep tracking-tight mb-4"
          >
            Real Work. Real Businesses.
          </h2>
          <div className="w-16 h-1 bg-brand-orange rounded-full mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            We don't rely on hypothetical concept designs. Here are real businesses thriving with websites and social media marketing crafted by Pehchaan Digital.
          </p>
        </div>

        {/* Real Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Project 1: Falcon Packwell (Website Development) */}
          <div className="flex flex-col bg-brand-soft border border-brand-grey rounded-3xl overflow-hidden hover:border-brand-navy/30 transition-all duration-300 shadow-xs hover:shadow-md group">
            {/* Mockup Header Preview */}
            <div className="bg-slate-900 p-4 sm:p-5 border-b border-slate-800">
              {/* Browser chrome header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                </div>
                <div className="px-3 py-1 rounded-md bg-slate-800/90 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 max-w-[240px] sm:max-w-xs truncate border border-slate-700/60">
                  <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">https://falconpackwell.in</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Live Site
                </div>
              </div>

              {/* Visual Website Interface Banner */}
              <div className="bg-gradient-to-br from-[#0c2340] to-[#071324] rounded-xl p-5 sm:p-6 text-white border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/15 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                      Website Built By Pehchaan Digital
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      ● Active Production
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Falcon Packwell
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm">
                      Industrial Packaging & Corrugated Box Manufacturing Solutions
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                      Responsive UI
                    </span>
                    <span>•</span>
                    <span>Product Catalog</span>
                    <span>•</span>
                    <span>WhatsApp Inquiry Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-brand-navy/10 text-brand-navy text-xs font-bold uppercase tracking-wider">
                    Website Development
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Pune / PCMC
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-navy-deep mb-2">
                  Falcon Packwell Corporate Website
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Designed and developed the official, high-speed corporate website for <strong>Falcon Packwell</strong>. Built from the ground up to showcase their complete packaging product range with seamless mobile browsing, clear specifications, and direct WhatsApp customer enquiry integration.
                </p>

                {/* Key Deliverables Provided */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Custom responsive 5+ page corporate architecture</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Industrial product showcase with enquiry call-to-actions</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Instant WhatsApp routing for B2B bulk orders</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mobile-first performance & search engine optimization</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-5 border-t border-brand-grey flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Client: <strong className="text-brand-navy-deep font-semibold">Falcon Packwell</strong>
                </div>
                <a
                  href="https://falconpackwell.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-navy hover:bg-brand-navy-deep text-white font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 group/link"
                >
                  <span>Visit falconpackwell.in</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 2: MH14 RTO Patil Enterprises (Social Media Marketing) */}
          <div className="flex flex-col bg-brand-soft border border-brand-grey rounded-3xl overflow-hidden hover:border-brand-navy/30 transition-all duration-300 shadow-xs hover:shadow-md group">
            {/* Mockup Header Preview */}
            <div className="bg-slate-900 p-4 sm:p-5 border-b border-slate-800">
              {/* Instagram App header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span className="text-xs font-bold text-white tracking-wide">Instagram Marketing</span>
                </div>
                <div className="px-3 py-1 rounded-md bg-slate-800/90 text-[11px] font-mono text-pink-300 flex items-center gap-1.5 max-w-[240px] sm:max-w-xs truncate border border-slate-700/60">
                  <span className="truncate">@mh14rtopatilenterprises</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Client Account
                </div>
              </div>

              {/* Visual Instagram Profile Card */}
              <div className="bg-gradient-to-br from-[#2a0845] via-[#1b1429] to-[#0d0d1a] rounded-xl p-5 sm:p-6 text-white border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col justify-between min-h-[140px]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
                      Marketed By Pehchaan Digital
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[10px] font-bold">
                      ● Active Campaign
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] shrink-0">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
                        MH14
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                        MH14 RTO Patil Enterprises
                      </h4>
                      <p className="text-xs text-slate-300">
                        @mh14rtopatilenterprises • Pune / PCMC
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/10 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 text-slate-300 font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
                      Content Strategy
                    </span>
                    <span>•</span>
                    <span>Post Creatives</span>
                    <span>•</span>
                    <span>Audience Growth</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study Details */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-xs font-bold uppercase tracking-wider">
                    Social Media Marketing
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Pune & MH-14 (PCMC)
                  </span>
                </div>

                <h3 className="text-xl font-bold text-brand-navy-deep mb-2">
                  MH14 RTO Patil Enterprises Social Growth
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Complete social media growth and creative strategy managed by <strong>Pehchaan Digital</strong>. Helping MH14 RTO Patil Enterprises build trust across Pimpri-Chinchwad and Pune through informative posts, service awareness creatives, and direct client acquisition for RTO consultations.
                </p>

                {/* Key Deliverables Provided */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Informative Instagram posts & carousels on vehicle documentation</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Brand-aligned social media creatives and carousels</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hyper-local audience targeting for MH14 / Pune vehicle owners</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct DM & WhatsApp enquiry conversion funnel</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-5 border-t border-brand-grey flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Client: <strong className="text-brand-navy-deep font-semibold">MH14 RTO Patil Enterprises</strong>
                </div>
                <a
                  href="https://www.instagram.com/mh14rtopatilenterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold text-xs tracking-wide transition-all shadow-sm active:scale-95 group/link"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>View on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom Conversion Banner */}
        <div className="mt-12 bg-gradient-to-br from-brand-navy-deep via-brand-navy to-brand-navy-deep text-white rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Want similar results for your business?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
              Whether you need a high-converting website like Falcon Packwell or active social media marketing like MH14 RTO Patil Enterprises, we build practical solutions tailored for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGES.TALK_TO_TEAM)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with us on WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wide transition-all border border-white/20"
              >
                Explore Launch Packages
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
