import React from 'react';
import { Layout, Smartphone, BadgePercent, Target } from 'lucide-react';
import { WHY_CHOOSE_US, FeatureItem } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-brand-orange" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-brand-navy" />;
      case 'BadgePercent':
        return <BadgePercent className="w-6 h-6 text-brand-orange" />;
      case 'Target':
        return <Target className="w-6 h-6 text-brand-navy" />;
      default:
        return <Layout className="w-6 h-6 text-brand-orange" />;
    }
  };

  return (
    <section className="py-20 md:py-24 bg-white border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange-light px-3.5 py-1 rounded-full border border-brand-orange/20">
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-deep tracking-tight">
            Why Businesses Choose Pehchaan Digital
          </h2>
          <p className="text-base sm:text-lg text-brand-navy-deep/75 leading-relaxed font-normal">
            We focus on clean aesthetics, honest communication, and practical digital solutions that actually help you connect with your customers.
          </p>
        </div>

        {/* 4 Minimal Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item: FeatureItem) => (
            <div
              key={item.number}
              className="bg-brand-soft rounded-2xl p-6 sm:p-7 border border-brand-border/80 hover:border-brand-navy/30 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-brand-border shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-sm font-extrabold text-brand-navy-deep/30 font-mono">
                    {item.number}
                  </span>
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
    </section>
  );
};
