import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustIntro } from './components/TrustIntro';
import { ServicesCatalogue } from './components/ServicesCatalogue';
import { PricingNote } from './components/PricingNote';
import { FeaturedWork } from './components/FeaturedWork';
import { WhyChooseUs } from './components/WhyChooseUs';
import { WorkProcess } from './components/WorkProcess';
import { Industries } from './components/Industries';
import { AboutUs } from './components/AboutUs';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { AdminPanel } from './components/admin/AdminPanel';
import { trackPageView } from './utils/analytics';

type CurrentView = 'main' | 'privacy' | 'terms' | 'admin';

export const App: React.FC = () => {
  const [view, setView] = useState<CurrentView>('main');

  // Track initial page view telemetry
  useEffect(() => {
    trackPageView();
  }, []);

  // Handle URL hash & deep linking (e.g. #admin, #privacy, #terms)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (hash === '#admin' || search.includes('admin')) {
        setView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#privacy') {
        setView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#terms') {
        setView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setView('main');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (newView: CurrentView, hashTarget?: string) => {
    setView(newView);
    if (newView === 'admin') {
      window.location.hash = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (newView === 'privacy') {
      window.location.hash = 'privacy';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (newView === 'terms') {
      window.location.hash = 'terms';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (hashTarget) {
        window.location.hash = hashTarget;
        setTimeout(() => {
          const el = document.querySelector(hashTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.history.pushState(null, '', window.location.pathname);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Admin View
  if (view === 'admin') {
    return (
      <>
        <AdminPanel onBackToSite={() => navigateTo('main')} />
        <Analytics />
      </>
    );
  }

  // Legal Pages
  if (view === 'privacy') {
    return (
      <>
        <PrivacyPolicy onBack={() => navigateTo('main')} />
        <Analytics />
      </>
    );
  }

  if (view === 'terms') {
    return (
      <>
        <TermsConditions onBack={() => navigateTo('main')} />
        <Analytics />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#061B3A] flex flex-col selection:bg-brand-orange selection:text-white">
      {/* Sticky Compact Navbar */}
      <Navbar 
        onNavigateHome={() => navigateTo('main')} 
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-grow">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Trust / Introduction */}
        <TrustIntro />

        {/* Section 3: Services Catalogue (Launch Offers + WhatsApp CTAs) */}
        <ServicesCatalogue />

        {/* Section 4: Pricing Disclaimer Note & Custom Quote */}
        <PricingNote />

        {/* Section 5: Real Client Work / Portfolio (Falcon Packwell & MH14 RTO Patil Enterprises) */}
        <FeaturedWork />

        {/* Section 6: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 7: Our Work Process */}
        <WorkProcess />

        {/* Section 8: Industries We Serve */}
        <Industries />

        {/* Section 9: About Us */}
        <AboutUs />

        {/* Section 10: FAQ (Semantic Modern Accordion) */}
        <Faq />

        {/* Section 11: Contact & WhatsApp Enquiry Form */}
        <ContactSection />
      </main>

      {/* Section 12: Dark Navy Footer */}
      <Footer
        onNavigateHome={() => navigateTo('main')}
        onOpenPrivacy={() => navigateTo('privacy')}
        onOpenTerms={() => navigateTo('terms')}
        onOpenAdmin={() => navigateTo('admin')}
      />

      {/* Floating Action WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
