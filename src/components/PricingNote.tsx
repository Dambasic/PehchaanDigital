import React from 'react';
import { MessageSquarePlus, ShieldCheck, ArrowUpRight, Info } from 'lucide-react';
import { getWhatsAppUrl, COMMON_MESSAGES } from '../utils/whatsapp';

export const PricingNote: React.FC = () => {
  return (
    <section id="pricing" className="py-12 bg-brand-soft border-t border-brand-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Transparent Pricing Disclaimer Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-7 border border-brand-border shadow-soft flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-soft border border-brand-border flex items-center justify-center text-brand-navy shrink-0">
            <Info className="w-5 h-5 text-brand-orange" />
          </div>
          <div className="text-xs sm:text-sm text-brand-navy-deep/80 leading-relaxed font-normal">
            <strong className="text-brand-navy-deep font-bold block sm:inline">Transparent Scope & Pricing: </strong>
            All prices are starting prices. Custom requirements, additional pages, integrations, advertising budgets, hosting, domains, and third-party subscriptions may be charged separately based on project requirements.
          </div>
        </div>

        {/* Need Something Custom Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-navy to-brand-navy-deep text-white rounded-3xl p-8 sm:p-10 shadow-card relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-brand-orange">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tailored Solutions</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Need Something Custom?
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Have a unique requirement? Tell us about your business, and we will suggest the right solution.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={getWhatsAppUrl(COMMON_MESSAGES.customQuote)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-base font-bold px-7 py-4 rounded-full shadow-orange-glow transition-all duration-200 active:scale-95 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange"
              >
                <MessageSquarePlus className="w-5 h-5" />
                <span>Get Custom Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
