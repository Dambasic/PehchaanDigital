export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export const WHY_CHOOSE_US: FeatureItem[] = [
  {
    number: "01",
    title: "Modern & Creative Designs",
    description: "Websites and visuals that make your brand stand out from competitors in the market.",
    iconName: "Layout"
  },
  {
    number: "02",
    title: "Mobile-First Approach",
    description: "Smooth, lightning-fast experiences engineered across smartphones, tablets, and desktops.",
    iconName: "Smartphone"
  },
  {
    number: "03",
    title: "Affordable Solutions",
    description: "Professional digital services with 100% transparent pricing and no hidden costs.",
    iconName: "BadgePercent"
  },
  {
    number: "04",
    title: "Business-Focused Strategy",
    description: "Every solution is intentionally designed around your business goals and customer conversions.",
    iconName: "Target"
  }
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Understand",
    description: "We understand your business, requirements, audience, and goals."
  },
  {
    step: "02",
    title: "Plan & Design",
    description: "We create a suitable strategy and design direction."
  },
  {
    step: "03",
    title: "Develop & Deliver",
    description: "We build, test, optimize, and deliver your solution."
  },
  {
    step: "04",
    title: "Support & Grow",
    description: "We provide assistance and help you improve your digital presence."
  }
];

export interface IndustryItem {
  name: string;
  description: string;
  iconName: string;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    name: "Manufacturing & Industrial",
    description: "Corporate portals, product catalogues, and lead capture for industrial manufacturers.",
    iconName: "Factory"
  },
  {
    name: "Retail & Local Shops",
    description: "Local SEO, Google Business Profiles, and digital catalogues to drive store walk-ins.",
    iconName: "Store"
  },
  {
    name: "Healthcare & Clinics",
    description: "Trustworthy websites, doctor profiles, and appointment enquiry systems.",
    iconName: "Activity"
  },
  {
    name: "Restaurants & Cafes",
    description: "Appealing digital menus, local discovery, and customer engagement.",
    iconName: "Utensils"
  },
  {
    name: "Real Estate",
    description: "High-impact project landing pages and WhatsApp lead capture systems.",
    iconName: "Building2"
  },
  {
    name: "Education & Coaching",
    description: "Student enquiry funnels, course landing pages, and institutional credibility.",
    iconName: "GraduationCap"
  },
  {
    name: "Startups & Entrepreneurs",
    description: "Fast-launch MVP landing pages, branding kits, and digital identity setup.",
    iconName: "Rocket"
  },
  {
    name: "Professional Services",
    description: "CA, legal, consulting, and agency websites that build authority and trust.",
    iconName: "Briefcase"
  }
];
