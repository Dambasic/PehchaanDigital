export const PRIMARY_PHONE = '+91 9284072718';
export const SECONDARY_PHONE = '+91 8237370063';
export const PRIMARY_WHATSAPP_NUMBER = '919284072718';

/**
 * Generates an encoded WhatsApp wa.me direct link
 */
export function getWhatsAppUrl(message: string): string {
  const cleanNumber = PRIMARY_WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export const COMMON_MESSAGES = {
  heroTalk: "Hello Pehchaan Digital! I visited your website and would like to discuss digital solutions for my business.",
  getStarted: "Hello Pehchaan Digital! I visited your website and want to explore growing my business online.",
  customQuote: "Hello Pehchaan Digital! I have a custom requirement for my business. I would like to discuss a personalized digital solution.",
};

export const WHATSAPP_MESSAGES = {
  TALK_TO_TEAM: COMMON_MESSAGES.heroTalk,
  GET_STARTED: COMMON_MESSAGES.getStarted,
  CUSTOM_QUOTE: COMMON_MESSAGES.customQuote,
};

export interface ContactFormData {
  fullName: string;
  businessName: string;
  phone: string;
  email?: string;
  service: string;
  requirement: string;
}

/**
 * Formats user enquiry into the exact WhatsApp message template
 */
export function buildContactEnquiryMessage(data: ContactFormData): string {
  const lines = [
    "Hello Pehchaan Digital!",
    "",
    "I would like to enquire about your services.",
    "",
    `Name: ${data.fullName.trim()}`,
    `Business: ${data.businessName.trim()}`,
    `Phone: +91 ${data.phone.replace(/^(\+91|91)/, '').trim()}`,
    `Email: ${data.email && data.email.trim() ? data.email.trim() : 'Not provided'}`,
    `Service: ${data.service.trim()}`,
    "",
    "My Requirement:",
    data.requirement && data.requirement.trim() ? data.requirement.trim() : "Let's discuss my digital goals on WhatsApp.",
    "",
    "Please contact me to discuss further.",
    "",
    "Thank you!"
  ];

  return lines.join("\n");
}
