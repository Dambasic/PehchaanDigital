import React from 'react';
import { 
  Factory, 
  Store, 
  Activity, 
  Utensils, 
  Building2, 
  GraduationCap, 
  Rocket, 
  Briefcase 
} from 'lucide-react';
import { INDUSTRIES, IndustryItem } from '../data/content';

export const Industries: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Factory':
        return <Factory className="w-5 h-5 text-brand-navy" />;
      case 'Store':
        return <Store className="w-5 h-5 text-brand-orange" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-brand-navy" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-brand-orange" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-brand-navy" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-brand-orange" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-brand-navy" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-brand-orange" />;
      default:
        return <Briefcase className="w-5 h-5 text-brand-navy" />;
    }
  };

  return (
    <section className="py-20 md:py-24 bg-white border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange bg-brand-orange-light px-3.5 py-1 rounded-full border border-brand-orange/20">
            Domain Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-deep tracking-tight">
            Digital Solutions for Every Business.
          </h2>
          <p className="text-base sm:text-lg text-brand-navy-deep/75 leading-relaxed font-normal">
            Whether you operate an industrial workshop in Bhosari, a retail store in FC Road, a clinic in Kothrud, or an online startup in Hinjewadi, we understand your market.
          </p>
        </div>

        {/* 8 Industries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((item: IndustryItem) => (
            <div
              key={item.name}
              className="p-5 sm:p-6 rounded-2xl bg-brand-soft border border-brand-border/80 hover:border-brand-navy/30 hover:shadow-card transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-brand-border shadow-xs flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-base font-bold text-brand-navy-deep mb-2">
                {item.name}
              </h3>
              <p className="text-xs sm:text-sm text-brand-navy-deep/75 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
