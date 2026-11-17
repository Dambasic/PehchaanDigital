import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS, ProcessStep } from '../data/content';

export const WorkProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-brand-soft border-t border-brand-border/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange-light px-3.5 py-1 rounded-full border border-brand-orange/20">
            Work Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-deep tracking-tight">
            From Idea to Digital Growth.
          </h2>
          <p className="text-base sm:text-lg text-brand-navy-deep/75 leading-relaxed font-normal">
            A simple, transparent 4-step workflow that ensures your digital assets are delivered on time and aligned with your expectations.
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Timeline */}
        <div className="relative">
          {/* Subtle horizontal connecting bar on desktop */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-brand-orange/30 via-brand-navy/30 to-brand-orange/30 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((item: ProcessStep, index: number) => (
              <div 
                key={item.step}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-brand-border shadow-soft flex flex-col justify-between hover:border-brand-navy/30 transition-all duration-300 group relative"
              >
                <div>
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-xl bg-brand-soft border border-brand-border flex items-center justify-center font-mono font-extrabold text-base text-brand-navy group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all duration-200">
                      {item.step}
                    </span>

                    {index < PROCESS_STEPS.length - 1 && (
                      <span className="hidden lg:inline-block text-brand-navy-deep/30">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy-deep mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-navy-deep/75 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
