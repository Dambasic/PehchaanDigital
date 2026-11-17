import React from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { PRIMARY_PHONE, SECONDARY_PHONE, PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface TermsConditionsProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-soft text-brand-navy-deep py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-brand-grey">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-soft text-brand-navy hover:text-brand-orange text-sm font-semibold mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft text-brand-navy text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 text-brand-orange" />
            Service Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-deep tracking-tight mb-2">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: November 2026 • Pehchaan Digital, Pune, Maharashtra, India
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-orange" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the website of <strong>Pehchaan Digital</strong> or engaging our digital services (including Website Development, Redesign, Landing Pages, Social Media Management, SEO, Google Business Profile setup, Creatives, and Branding), you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-orange" />
              2. Scope of Services & Launch Pricing
            </h2>
            <p className="mb-3">
              All prices displayed on this website represent introductory launch offer rates for the explicitly listed deliverables:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>
                <strong>Scope Alignment:</strong> Any extra pages, e-commerce payment gateways, custom APIs, animated interactions, or advanced integrations beyond the listed scope will be quoted separately before work begins.
              </li>
              <li>
                <strong>Third-Party Costs:</strong> Domain registration, third-party web hosting, official API licenses, SMS gateways, and ad budgets (paid media) are billed directly to third parties or agreed separately and are not included in the agency development fee unless specified in writing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3">
              3. Project Timelines & Client Responsibilities
            </h2>
            <p className="mb-3">
              Standard website development usually takes between 7 to 14 working days. Delivery timelines are subject to timely receipt of essential client inputs, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>High-resolution brand logos, product photos, and imagery.</li>
              <li>Accurate business text, address, contact details, and price menus.</li>
              <li>Prompt feedback during design preview stages (within 48 to 72 hours).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3">
              4. Payment Milestones
            </h2>
            <p>
              Projects typically begin with an initial advance deposit (usually 50%), with the final balance payable upon completion and prior to final deployment on the client's production domain. For monthly retainer services (SEO, Social Media), payments are due at the commencement of each monthly billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3">
              5. Intellectual Property Rights
            </h2>
            <p>
              Upon 100% full financial settlement, the client holds full ownership and commercial rights to the final deliverables (including website code, customized graphic assets, and brand design files). Pehchaan Digital reserves the right to display the completed work in our agency portfolio and case studies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-brand-orange" />
              6. Limitation of Liability & Third-Party Platforms
            </h2>
            <p>
              While we adhere to industry best practices in web development and search engine optimization, Pehchaan Digital does not control Google algorithm changes, Meta advertising policy revisions, or third-party server downtimes. We cannot guarantee specific revenue numbers or immediate rank #1 placements on Google.
            </p>
          </section>

          <section className="bg-brand-soft rounded-2xl p-6 border border-brand-grey">
            <h2 className="text-lg font-bold text-brand-navy-deep mb-3">
              7. Governing Law & Jurisdiction
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Pune, Maharashtra, India</strong>.
            </p>
            <div className="space-y-1.5 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Pehchaan Digital — Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Contact: {PRIMARY_PHONE} | {SECONDARY_PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp: +{PRIMARY_WHATSAPP_NUMBER}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Back CTA */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-deep text-white text-sm font-semibold transition-all cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
