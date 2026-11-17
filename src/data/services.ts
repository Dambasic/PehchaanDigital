export interface ServiceItem {
  id: string;
  name: string;
  originalPrice: string;
  launchPrice: string;
  isMonthly?: boolean;
  description: string;
  deliverables: string[];
  buttonText: string;
  whatsappMessage: string;
  popular?: boolean;
  badge?: string;
  iconName: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "website-development",
    name: "Website Development",
    originalPrice: "₹14,999",
    launchPrice: "₹7,999",
    isMonthly: false,
    description: "Get a professional, mobile-friendly website that makes your business stand out online.",
    deliverables: [
      "Up to 5 pages",
      "Modern responsive design",
      "Mobile and desktop optimization",
      "WhatsApp integration",
      "Contact/enquiry form",
      "Basic on-page SEO",
      "Social media integration",
      "Basic performance optimization"
    ],
    buttonText: "Get Website",
    whatsappMessage: "Hello Pehchaan Digital! I'm interested in your Website Development package at ₹7,999 (Launch Offer). I would like to discuss a website for my business.",
    popular: true,
    badge: "MOST POPULAR",
    iconName: "Globe"
  },
  {
    id: "website-redesign",
    name: "Website Redesign",
    originalPrice: "₹9,999",
    launchPrice: "₹5,999",
    isMonthly: false,
    description: "Give your existing website a fresh, modern, and professional appearance.",
    deliverables: [
      "Modern UI redesign",
      "Responsive layouts",
      "Improved navigation",
      "Better visual hierarchy",
      "Performance improvements",
      "CTA optimization"
    ],
    buttonText: "Redesign My Website",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in your Website Redesign service at ₹5,999. I already have a website and would like to improve its design and performance.",
    iconName: "RefreshCw"
  },
  {
    id: "landing-page-development",
    name: "Landing Page Development",
    originalPrice: "₹7,999",
    launchPrice: "₹4,999",
    isMonthly: false,
    description: "High-converting landing pages designed to promote your products, services, and campaigns.",
    deliverables: [
      "Single-page landing website",
      "Conversion-focused design",
      "Responsive layout",
      "WhatsApp CTA",
      "Enquiry form",
      "Basic SEO setup"
    ],
    buttonText: "Get Landing Page",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in getting a professional landing page developed at the ₹4,999 launch price.",
    iconName: "Rocket"
  },
  {
    id: "social-media-management",
    name: "Social Media Management",
    originalPrice: "₹9,999",
    launchPrice: "₹7,499",
    isMonthly: true,
    description: "Build a consistent social media presence and connect with your target audience.",
    deliverables: [
      "12 social media posts monthly",
      "Custom post graphics & creative design",
      "Content planning & strategy",
      "Caption & hashtag writing",
      "Post scheduling",
      "Monthly performance report"
    ],
    buttonText: "Grow My Social Media",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in your Social Media Management package at ₹7,499 per month. Please share more details.",
    iconName: "Share2"
  },
  {
    id: "seo-services",
    name: "SEO Services",
    originalPrice: "₹5,999",
    launchPrice: "₹3,999",
    isMonthly: true,
    description: "Improve your website's search visibility and help potential customers discover your business.",
    deliverables: [
      "Basic keyword research",
      "On-page SEO",
      "Meta title and description optimization",
      "Image optimization",
      "Technical SEO checks",
      "Search Console setup",
      "Monthly progress report"
    ],
    buttonText: "Improve My SEO",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in your SEO services at ₹3,999 per month. I would like to improve my website's Google visibility.",
    iconName: "Search"
  },
  {
    id: "google-business-profile",
    name: "Google Business Profile Setup",
    originalPrice: "₹3,999",
    launchPrice: "₹2,499",
    isMonthly: false,
    description: "Make your business easier to discover on Google Search and Google Maps.",
    deliverables: [
      "Profile setup or optimization",
      "Business information",
      "Category selection",
      "Service listing",
      "Business description",
      "Photo upload assistance",
      "Basic optimization guidance"
    ],
    buttonText: "Setup My Google Profile",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in Google Business Profile setup and optimization at ₹2,499.",
    iconName: "MapPin"
  },
  {
    id: "whatsapp-business-setup",
    name: "WhatsApp Business Setup",
    originalPrice: "₹2,499",
    launchPrice: "₹1,499",
    isMonthly: false,
    description: "Make it easier for customers to discover and enquire about your products and services.",
    deliverables: [
      "WhatsApp Business profile setup",
      "Business description",
      "Catalogue configuration",
      "Greeting message",
      "Quick replies setup",
      "Business information optimization"
    ],
    buttonText: "Setup My WhatsApp Business",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in your WhatsApp Business setup service at ₹1,499.",
    iconName: "MessageCircle"
  },
  {
    id: "brand-identity-design",
    name: "Brand Identity & Design",
    originalPrice: "₹5,999",
    launchPrice: "₹3,499",
    isMonthly: false,
    description: "Create a consistent and recognizable identity for your business.",
    deliverables: [
      "Logo design",
      "Brand colour palette",
      "Typography selection",
      "Basic brand guidelines",
      "Social media profile branding"
    ],
    buttonText: "Build My Brand",
    whatsappMessage: "Hello Pehchaan Digital! I am interested in Brand Identity and Design services at ₹3,499. I would like to discuss branding for my business.",
    iconName: "Sparkles"
  }
];
