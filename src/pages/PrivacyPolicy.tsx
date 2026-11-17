import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText, MapPin, Mail, Phone } from 'lucide-react';
import { PRIMARY_PHONE, SECONDARY_PHONE, PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <Shield className="w-3.5 h-3.5 text-brand-orange" />
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy-deep tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: November 2026 • Pehchaan Digital, Pune, Maharashtra, India
          </p>
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-orange" />
              1. Overview
            </h2>
            <p>
              Welcome to <strong>Pehchaan Digital</strong> ("we," "our," or "us"). We are a digital solutions agency based in Pune, Maharashtra, India. We are deeply committed to protecting your privacy and ensuring your personal information is handled in a safe, lawful, and ethical manner in compliance with the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023 (DPDP).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-orange" />
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you voluntarily provide to us when you submit an enquiry form or message us via WhatsApp:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Contact Information:</strong> Your full name, phone number, email address, and company/brand name.</li>
              <li><strong>Project Requirements:</strong> Information regarding the service you are interested in (e.g., website development, SEO, social media, branding) and specific project details you share.</li>
              <li><strong>Technical Metadata:</strong> Standard, non-identifying browser data, device type, and referral paths to optimize site speed and responsive rendering.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-orange" />
              3. How We Use Your Information
            </h2>
            <p className="mb-3">
              The data we collect is utilized strictly for legitimate business interactions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>To discuss your digital requirements and formulate accurate project quotes.</li>
              <li>To deliver agreed-upon digital services (websites, branding, SEO, social media).</li>
              <li>To respond to your questions submitted via our website or direct WhatsApp communications.</li>
              <li>We <strong>never sell, lease, or monetize</strong> your personal details with third-party telemarketers or advertisers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3">
              4. Direct WhatsApp Communication
            </h2>
            <p>
              Our website links directly to WhatsApp (operated by Meta Platforms, Inc.) to allow instant, transparent conversations. When you click our WhatsApp buttons, conversations take place on WhatsApp's platform under Meta's privacy policy and end-to-end encryption standards. We will only use your WhatsApp contact to address your enquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3">
              5. Data Security & Retention
            </h2>
            <p>
              We maintain administrative, technical, and physical safeguards designed to protect your personal information against unauthorized access, disclosure, or loss. Data is retained only as long as necessary to fulfill project requirements, warranty support, and statutory accounting records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy-deep mb-3">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections or updates, or request the deletion of your contact records. To exercise these rights, please contact our grievance officer using the details below.
            </p>
          </section>

          <section className="bg-brand-soft rounded-2xl p-6 border border-brand-grey">
            <h2 className="text-lg font-bold text-brand-navy-deep mb-3">
              7. Contact & Grievance Redressal
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <strong className="text-brand-navy">Business:</strong> Pehchaan Digital
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-orange" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Primary: {PRIMARY_PHONE} | Secondary: {SECONDARY_PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-orange" />
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
