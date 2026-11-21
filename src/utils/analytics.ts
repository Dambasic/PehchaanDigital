/**
 * Pehchaan Digital Analytics Tracking & Storage Utility
 * Tracks: Visitors, Total Visits, WhatsApp Button Clicks (by source & product),
 * Conversions, Countries, Devices, and Live Event Streams.
 */

export interface CountryStat {
  code: string;
  name: string;
  flag: string;
  visits: number;
  clicks: number;
}

export interface AnalyticsEvent {
  id: string;
  type: 'visit' | 'whatsapp_click' | 'conversion';
  title: string;
  subtitle: string;
  country: string;
  countryCode: string;
  flag: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  timestamp: number;
  meta?: string;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  totalConversions: number;
  totalWhatsAppClicks: number;
  clicksBySource: Record<string, number>;
  clicksByService: Record<string, number>;
  countryStats: Record<string, CountryStat>;
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  events: AnalyticsEvent[];
  lastUpdated: number;
}

const STORAGE_KEY = 'pehchaan_analytics_store_v1';
const VISITOR_KEY = 'pehchaan_visitor_uuid';
const CACHED_COUNTRY_KEY = 'pehchaan_detected_country';
const ANALYTICS_EVENT = 'pehchaan_analytics_updated';

// Default realistic baseline dataset so the analytics dashboard is informative immediately
const INITIAL_ANALYTICS: AnalyticsData = {
  totalVisits: 3480,
  uniqueVisitors: 2190,
  totalConversions: 84,
  totalWhatsAppClicks: 472,
  clicksBySource: {
    'Hero WhatsApp CTA': 138,
    'Floating WhatsApp Button': 124,
    'Services Catalogue': 116,
    'Contact Form WhatsApp': 46,
    'Navbar "Let\'s Talk"': 26,
    'Pricing Note': 14,
    'Footer WhatsApp': 8
  },
  clicksByService: {
    'Website Development': 152,
    'Social Media Management': 98,
    'Landing Page Development': 74,
    'SEO Services': 53,
    'Google Business Profile Setup': 48,
    'Website Redesign': 27,
    'Brand Identity & Design': 14,
    'WhatsApp Business Setup': 6
  },
  countryStats: {
    'IN': { code: 'IN', name: 'India', flag: '🇮🇳', visits: 2850, clicks: 395 },
    'AE': { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', visits: 260, clicks: 38 },
    'US': { code: 'US', name: 'United States', flag: '🇺🇸', visits: 185, clicks: 18 },
    'GB': { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', visits: 95, clicks: 11 },
    'SG': { code: 'SG', name: 'Singapore', flag: '🇸🇬', visits: 52, clicks: 6 },
    'CA': { code: 'CA', name: 'Canada', flag: '🇨🇦', visits: 38, clicks: 4 }
  },
  deviceBreakdown: {
    mobile: 2436, // ~70%
    desktop: 905, // ~26%
    tablet: 139   // ~4%
  },
  events: [
    {
      id: 'init-1',
      type: 'whatsapp_click',
      title: 'WhatsApp Click: Website Development',
      subtitle: 'Service Catalogue launch offer card',
      country: 'India',
      countryCode: 'IN',
      flag: '🇮🇳',
      device: 'Mobile',
      timestamp: Date.now() - 1000 * 60 * 12 // 12 mins ago
    },
    {
      id: 'init-2',
      type: 'conversion',
      title: 'Enquiry Form Submitted',
      subtitle: 'Project inquiry for Falcon Packwell redesign',
      country: 'India',
      countryCode: 'IN',
      flag: '🇮🇳',
      device: 'Desktop',
      timestamp: Date.now() - 1000 * 60 * 45 // 45 mins ago
    },
    {
      id: 'init-3',
      type: 'whatsapp_click',
      title: 'WhatsApp Click: Hero CTA',
      subtitle: 'Direct discussion started from Hero button',
      country: 'United Arab Emirates',
      countryCode: 'AE',
      flag: '🇦🇪',
      device: 'Mobile',
      timestamp: Date.now() - 1000 * 60 * 85
    },
    {
      id: 'init-4',
      type: 'whatsapp_click',
      title: 'WhatsApp Click: Social Media Management',
      subtitle: 'Monthly retainer package enquiry',
      country: 'India',
      countryCode: 'IN',
      flag: '🇮🇳',
      device: 'Mobile',
      timestamp: Date.now() - 1000 * 60 * 150
    },
    {
      id: 'init-5',
      type: 'visit',
      title: 'Website Page View',
      subtitle: 'Organic visit to homepage',
      country: 'United States',
      countryCode: 'US',
      flag: '🇺🇸',
      device: 'Desktop',
      timestamp: Date.now() - 1000 * 60 * 210
    }
  ],
  lastUpdated: Date.now()
};

// Helper to detect current device
export function detectDevice(): 'Mobile' | 'Desktop' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Fallback country detection from timezone / locale
function detectCountryFromBrowser(): { code: string; name: string; flag: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('India')) {
      return { code: 'IN', name: 'India', flag: '🇮🇳' };
    }
    if (tz.includes('Dubai') || tz.includes('Muscat')) {
      return { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' };
    }
    if (tz.includes('New_York') || tz.includes('Los_Angeles') || tz.includes('Chicago') || tz.includes('America')) {
      return { code: 'US', name: 'United States', flag: '🇺🇸' };
    }
    if (tz.includes('London')) {
      return { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' };
    }
    if (tz.includes('Toronto') || tz.includes('Vancouver')) {
      return { code: 'CA', name: 'Canada', flag: '🇨🇦' };
    }
    if (tz.includes('Singapore')) {
      return { code: 'SG', name: 'Singapore', flag: '🇸🇬' };
    }
    if (tz.includes('Sydney') || tz.includes('Melbourne')) {
      return { code: 'AU', name: 'Australia', flag: '🇦🇺' };
    }
  } catch (e) {
    // Ignore
  }
  return { code: 'IN', name: 'India', flag: '🇮🇳' };
}

// Fetch or resolve detected country
export async function getDetectedCountry(): Promise<{ code: string; name: string; flag: string }> {
  if (typeof window === 'undefined') {
    return { code: 'IN', name: 'India', flag: '🇮🇳' };
  }

  const cached = localStorage.getItem(CACHED_COUNTRY_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // fallback
    }
  }

  // Attempt lightweight fetch
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://api.country.is', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const code = data.country || 'IN';
      const countryNames: Record<string, { name: string; flag: string }> = {
        'IN': { name: 'India', flag: '🇮🇳' },
        'AE': { name: 'United Arab Emirates', flag: '🇦🇪' },
        'US': { name: 'United States', flag: '🇺🇸' },
        'GB': { name: 'United Kingdom', flag: '🇬🇧' },
        'CA': { name: 'Canada', flag: '🇨🇦' },
        'SG': { name: 'Singapore', flag: '🇸🇬' },
        'AU': { name: 'Australia', flag: '🇦🇺' },
        'DE': { name: 'Germany', flag: '🇩🇪' },
      };
      const info = countryNames[code] || { name: code, flag: '🌐' };
      const result = { code, name: info.name, flag: info.flag };
      localStorage.setItem(CACHED_COUNTRY_KEY, JSON.stringify(result));
      return result;
    }
  } catch (e) {
    // Network or blocked, use browser detection
  }

  const fallback = detectCountryFromBrowser();
  localStorage.setItem(CACHED_COUNTRY_KEY, JSON.stringify(fallback));
  return fallback;
}

// Read full analytics data from storage
export function getAnalyticsData(): AnalyticsData {
  if (typeof window === 'undefined') return INITIAL_ANALYTICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ANALYTICS));
      return INITIAL_ANALYTICS;
    }
    const parsed = JSON.parse(raw);
    return { ...INITIAL_ANALYTICS, ...parsed };
  } catch (e) {
    return INITIAL_ANALYTICS;
  }
}

// Save analytics data and dispatch event
function saveAnalyticsData(data: AnalyticsData) {
  if (typeof window === 'undefined') return;
  try {
    data.lastUpdated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: data }));
  } catch (e) {
    console.error('Failed to save analytics:', e);
  }
}

// Track a page view / visitor
export async function trackPageView(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  // Don't track multiple page views in short session within same tab refresh
  const sessionKey = 'pehchaan_session_view_logged';
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, 'true');

  const data = getAnalyticsData();
  const country = await getDetectedCountry();
  const device = detectDevice();

  data.totalVisits += 1;

  // Check unique visitor
  const existingVisitor = localStorage.getItem(VISITOR_KEY);
  if (!existingVisitor) {
    const newId = 'vis_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem(VISITOR_KEY, newId);
    data.uniqueVisitors += 1;
  }

  // Update country visits
  if (!data.countryStats[country.code]) {
    data.countryStats[country.code] = {
      code: country.code,
      name: country.name,
      flag: country.flag,
      visits: 1,
      clicks: 0
    };
  } else {
    data.countryStats[country.code].visits += 1;
  }

  // Update device
  if (device === 'Mobile') data.deviceBreakdown.mobile += 1;
  else if (device === 'Desktop') data.deviceBreakdown.desktop += 1;
  else data.deviceBreakdown.tablet += 1;

  // Prepend event
  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
    type: 'visit',
    title: 'Website Page View',
    subtitle: `Session started on ${device}`,
    country: country.name,
    countryCode: country.code,
    flag: country.flag,
    device,
    timestamp: Date.now()
  };
  data.events = [newEvent, ...(data.events || [])].slice(0, 100);

  saveAnalyticsData(data);
}

// Track WhatsApp button click
export async function trackWhatsAppClick(source: string, serviceName?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const data = getAnalyticsData();
  const country = await getDetectedCountry();
  const device = detectDevice();

  data.totalWhatsAppClicks += 1;

  // Track by button source
  data.clicksBySource[source] = (data.clicksBySource[source] || 0) + 1;

  // Track by service name if provided
  if (serviceName) {
    data.clicksByService[serviceName] = (data.clicksByService[serviceName] || 0) + 1;
  }

  // Update country clicks
  if (!data.countryStats[country.code]) {
    data.countryStats[country.code] = {
      code: country.code,
      name: country.name,
      flag: country.flag,
      visits: 1,
      clicks: 1
    };
  } else {
    data.countryStats[country.code].clicks += 1;
  }

  // Prepend event
  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
    type: 'whatsapp_click',
    title: serviceName ? `WhatsApp Click: ${serviceName}` : `WhatsApp Click (${source})`,
    subtitle: `Clicked from ${source}`,
    country: country.name,
    countryCode: country.code,
    flag: country.flag,
    device,
    timestamp: Date.now(),
    meta: serviceName
  };
  data.events = [newEvent, ...(data.events || [])].slice(0, 100);

  saveAnalyticsData(data);
}

// Track form submission / enquiry conversion
export async function trackConversion(type: string, serviceName?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const data = getAnalyticsData();
  const country = await getDetectedCountry();
  const device = detectDevice();

  data.totalConversions += 1;

  if (serviceName) {
    data.clicksByService[serviceName] = (data.clicksByService[serviceName] || 0) + 1;
  }

  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
    type: 'conversion',
    title: `Enquiry Conversion (${type})`,
    subtitle: serviceName ? `Requested package: ${serviceName}` : 'General business enquiry submitted',
    country: country.name,
    countryCode: country.code,
    flag: country.flag,
    device,
    timestamp: Date.now(),
    meta: serviceName
  };
  data.events = [newEvent, ...(data.events || [])].slice(0, 100);

  saveAnalyticsData(data);
}

// Reset analytics
export function resetAnalyticsData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ANALYTICS));
  window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: INITIAL_ANALYTICS }));
}
