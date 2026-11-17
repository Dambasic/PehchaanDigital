import React from 'react';
import { Lightbulb, Target, Sparkles } from 'lucide-react';

export const TrustIntro: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange-light px-3.5 py-1 rounded-full border border-brand-orange/20">
            Our Purpose
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy-deep tracking-tight">
            Your Business Deserves a Digital Identity.
          </h2>
          <p className="text-base sm:text-lg text-brand-navy-deep/80 leading-relaxed font-normal">
            At Pehchaan Digital, we believe every business deserves to be seen, recognized, and remembered. We help startups, local businesses, and growing companies build their digital presence with creative and practical solutions.
          </p>
        </div>

        {/* 3 Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-5xl mx-auto">
          {/* Highlight 1 */}
          <div className="p-6 rounded-2xl bg-brand-soft border border-brand-border/80 hover:border-brand-orange/40 transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-border/80 shadow-xs flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy-deep mb-2 flex items-center gap-2">
              <span>Creative Solutions</span>
            </h3>
            <p className="text-sm text-brand-navy-deep/70 leading-relaxed">
              Custom designs and modern digital assets crafted specifically to reflect your unique brand identity.
            </p>
          </div>

          {/* Highlight 2 */}
          <div className="p-6 rounded-2xl bg-brand-soft border border-brand-border/80 hover:border-brand-navy/30 transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-border/80 shadow-xs flex items-center justify-center text-brand-navy group-hover:scale-110 transition-transform mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy-deep mb-2 flex items-center gap-2">
              <span>Business-Focused Approach</span>
            </h3>
            <p className="text-sm text-brand-navy-deep/70 leading-relaxed">
              Every deliverable is engineered to attract genuine customer inquiries and support your real business growth.
            </p>
          </div>

          {/* Highlight 3 */}
          <div className="p-6 rounded-2xl bg-brand-soft border border-brand-border/80 hover:border-brand-orange/40 transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-border/80 shadow-xs flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy-deep mb-2 flex items-center gap-2">
              <span>Affordable Launch Packages</span>
            </h3>
            <p className="text-sm text-brand-navy-deep/70 leading-relaxed">
              Transparent, premium introductory rates designed to help local businesses step into the digital era with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
