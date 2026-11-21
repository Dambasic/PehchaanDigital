import React from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faq';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { trackWhatsAppClick } from '../utils/analytics';

export const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-brand-soft" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-grey text-brand-navy text-xs font-semibold tracking-wide uppercase mb-4 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-brand-orange" />
            Clear Answers
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-deep tracking-tight mb-4"
          >
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-brand-orange rounded-full mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Got questions? We've got clear, transparent answers about our services, process, and pricing.
          </p>
        </div>

        {/* Accordion List adhering to Modern Web Guidance:
            Native <details> & <summary>, with NO headings inside <summary> (to ensure TalkBack/JAWS compatibility) */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group border border-brand-grey bg-white rounded-2xl overflow-hidden transition-colors hover:border-brand-navy/30 shadow-xs"
            >
              <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none text-brand-navy-deep font-bold text-base sm:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">
                <span className="text-left font-semibold">{faq.question}</span>
                <ChevronDown className="accordion-chevron w-5 h-5 text-brand-orange shrink-0 transition-transform duration-200" />
              </summary>
              <div className="px-5 sm:px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Quick WhatsApp Assistance Callout */}
        <div className="mt-12 text-center p-6 bg-white border border-brand-grey rounded-2xl shadow-xs">
          <p className="text-sm sm:text-base text-slate-700 font-medium">
            Still have a question or need a tailored package for your business?
          </p>
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.TALK_TO_TEAM)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('FAQ Direct WhatsApp')}
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-deep text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-brand-orange" />
            Chat With Us Directly on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
