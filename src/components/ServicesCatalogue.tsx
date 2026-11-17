import React from 'react';
import { 
  Globe, 
  RefreshCw, 
  Rocket, 
  Share2, 
  Search, 
  MapPin, 
  MessageCircle, 
  Sparkles, 
  Check, 
  ArrowUpRight,
  Tag
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/services';
import { getWhatsAppUrl } from '../utils/whatsapp';

export const ServicesCatalogue: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'RefreshCw':
        return <RefreshCw className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      case 'Share2':
        return <Share2 className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-brand-soft scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange-light border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-widest">
            <Tag className="w-3.5 h-3.5" />
            <span>Digital Solutions Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-deep tracking-tight">
            Our Services & Launch Packages
          </h2>
          <p className="text-base sm:text-lg text-brand-navy-deep/80 leading-relaxed font-normal">
            Choose the service your business needs today. Every package comes with transparent deliverables, launch pricing, and direct WhatsApp project onboarding.
          </p>
        </div>

        {/* Services Grid (Clean, Responsive, Beautiful) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SERVICES.map((service: ServiceItem) => {
            const isPopular = service.popular;

            return (
              <article
                key={service.id}
                className={`flex flex-col justify-between bg-white rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative group ${
                  isPopular
                    ? 'border-brand-orange shadow-card hover:shadow-card-hover ring-1 ring-brand-orange/30'
                    : 'border-brand-border hover:border-brand-navy/30 shadow-soft hover:shadow-card-hover'
                }`}
              >
                {/* Popular / Top badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-6 bg-brand-orange text-white text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-sm tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{service.badge || 'POPULAR CHOICE'}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isPopular 
                        ? 'bg-brand-orange-light text-brand-orange' 
                        : 'bg-brand-soft text-brand-navy group-hover:bg-brand-orange-light group-hover:text-brand-orange'
                    }`}>
                      {getIcon(service.iconName)}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-orange bg-brand-orange-light px-2.5 py-1 rounded-md border border-brand-orange/20 uppercase tracking-wider">
                      Launch Offer
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-brand-navy-deep tracking-tight mb-2 group-hover:text-brand-navy transition-colors">
                    {service.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-brand-navy-deep/75 leading-relaxed min-h-[40px] mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Pricing Box */}
                  <div className="bg-brand-soft/80 border border-brand-border/60 rounded-xl p-4 mb-6">
                    <div className="text-xs text-brand-navy-deep/60 flex items-center gap-2 mb-1">
                      <span>Regular Price:</span>
                      <span className="line-through text-brand-navy-deep/50 font-medium">
                        {service.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                        {service.launchPrice}
                      </span>
                      {service.isMonthly && (
                        <span className="text-xs font-semibold text-brand-navy-deep/60">
                          / month
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Special introductory launch rate</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-navy-deep/70">
                      What's Included:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-brand-navy-deep/85">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 text-sm font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange ${
                      isPopular
                        ? 'bg-brand-orange hover:bg-brand-orange-hover text-white shadow-orange-glow'
                        : 'bg-brand-navy hover:bg-brand-navy-deep text-white hover:text-white'
                    }`}
                    aria-label={`Enquire about ${service.name} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>{service.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-80" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
