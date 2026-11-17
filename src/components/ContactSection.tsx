import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  PRIMARY_WHATSAPP_NUMBER,
  getWhatsAppUrl,
  buildContactEnquiryMessage,
  ContactFormData
} from '../utils/whatsapp';
import { SERVICES } from '../data/services';

const SERVICE_OPTIONS = [
  ...SERVICES.map((s) => `${s.name} (${s.launchPrice})`),
  'Custom Digital Package',
  'General Enquiry / Multiple Services'
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    requirement: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Please enter your business or company name.';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your 10-digit mobile number.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Mobile number must be exactly 10 digits.';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid mobile number starting with 6, 7, 8, or 9.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildContactEnquiryMessage(formData);
    const whatsappUrl = getWhatsAppUrl(message);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);

    // Reset feedback after 8 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 8000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      // Disallow anything other than digits and limit strictly to max 10 digits
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-grey text-brand-navy text-xs font-semibold tracking-wide uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            Direct Communication
          </div>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy-deep tracking-tight mb-4"
          >
            Let's Build Your Digital Identity.
          </h2>
          <div className="w-16 h-1 bg-brand-orange rounded-full mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Reach out via WhatsApp or submit the enquiry form below. We'll connect with you promptly to discuss your project.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card (Left) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy-deep via-brand-navy to-brand-navy-deep text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-orange inline-block mb-3">
                Get In Touch
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
                Start the conversation today.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Whether you need a fresh website, a Google Business Profile setup, or a complete digital overhaul, our team in Pune is ready to assist.
              </p>

              {/* Direct Info List */}
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-orange">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Location
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      Pune, Maharashtra, India
                    </div>
                    <div className="text-xs text-slate-300">
                      Serving clients across India
                    </div>
                  </div>
                </div>

                {/* Primary WhatsApp & Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Primary Contact & WhatsApp
                    </div>
                    <a
                      href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-brand-orange transition-colors mt-0.5 inline-block"
                    >
                      {PRIMARY_PHONE}
                    </a>
                    <div className="text-xs text-emerald-300 font-medium mt-0.5">
                      Available for WhatsApp enquiries
                    </div>
                  </div>
                </div>

                {/* Secondary Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-sky-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Secondary Contact Number
                    </div>
                    <a
                      href={`tel:${SECONDARY_PHONE.replace(/[^0-9+]/g, '')}`}
                      className="text-sm font-semibold text-white hover:text-brand-orange transition-colors mt-0.5 inline-block"
                    >
                      {SECONDARY_PHONE}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-brand-orange">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Operating Hours
                    </div>
                    <div className="text-sm font-medium text-white mt-0.5">
                      Monday – Saturday: 10:00 AM – 7:00 PM IST
                    </div>
                    <div className="text-xs text-slate-400">
                      Sunday: WhatsApp enquiries responded by Monday
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <a
                href={`https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello Pehchaan Digital! I would like to quickly chat about my digital requirements.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                Quick Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Form Card (Right) */}
          <div className="lg:col-span-7 bg-brand-soft border border-brand-grey rounded-3xl p-6 sm:p-10 shadow-xs">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-deep mb-2">
              Send an Enquiry
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Fill in your details and click submit. We will formulate a ready-to-send enquiry directly into WhatsApp.
            </p>

            {isSubmitted && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold">Opening WhatsApp!</p>
                  <p className="text-emerald-700 mt-0.5">
                    Your details have been prefilled. If WhatsApp didn't open automatically,{' '}
                    <a
                      href={getWhatsAppUrl(buildContactEnquiryMessage(formData))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold text-emerald-900 hover:text-emerald-950"
                    >
                      click here to open WhatsApp now
                    </a>.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-brand-navy-deep text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange/40 ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-brand-grey focus:border-brand-navy'
                    }`}
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                    Business / Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma Sweets / Apex Logistics"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-brand-navy-deep text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange/40 ${
                      errors.businessName
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-brand-grey focus:border-brand-navy'
                    }`}
                    aria-required="true"
                    aria-invalid={Boolean(errors.businessName)}
                  />
                  {errors.businessName && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.businessName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-navy">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] font-medium text-slate-400">
                      {formData.phone.length}/10 digits
                    </span>
                  </div>
                  <div className={`relative flex rounded-xl border bg-white overflow-hidden transition-all focus-within:ring-2 focus-within:ring-brand-orange/40 ${
                    errors.phone ? 'border-red-400 bg-red-50/20' : 'border-brand-grey focus-within:border-brand-navy'
                  }`}>
                    <span className="inline-flex items-center px-3.5 text-xs font-bold text-slate-500 bg-slate-50 border-r border-brand-grey select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength={10}
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full px-4 py-3 text-brand-navy-deep text-sm bg-transparent focus:outline-none"
                      aria-required="true"
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address (Optional) */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                    Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-grey bg-white text-brand-navy-deep text-sm transition-all focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-orange/40"
                  />
                </div>
              </div>

              {/* Service Interested In */}
              <div>
                <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-grey bg-white text-brand-navy-deep text-sm transition-all focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-orange/40"
                >
                  {SERVICE_OPTIONS.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brief Requirement */}
              <div>
                <label htmlFor="requirement" className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-1.5">
                  Brief Requirement / Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="requirement"
                  name="requirement"
                  rows={4}
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="Tell us about your business goals, timeline, or any specific ideas you have..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-grey bg-white text-brand-navy-deep text-sm transition-all focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-orange/40"
                ></textarea>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send WhatsApp Enquiry
              </button>

              <p className="text-xs text-slate-500 mt-2">
                🔒 We respect your privacy. Submitting opens a direct WhatsApp chat with us.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
