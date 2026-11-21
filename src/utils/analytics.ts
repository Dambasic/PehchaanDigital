/**
 * Pehchaan Digital Analytics Tracking & Storage Utility
 * Pure Real-Time Telemetry: 0 fake data, tracks only real user visits,
 * real WhatsApp button clicks, and real enquiry conversions.
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

// Clean Real-Time Storage Keys
const STORAGE_KEY = 'pehchaan_analytics_realtime_v2';
const OLD_STORAGE_KEY = 'pehchaan_analytics_store_v1';
const VISITOR_KEY = 'pehchaan_visitor_uuid';
const CACHED_COUNTRY_KEY = 'pehchaan_detected_country';
const ANALYTICS_EVENT = 'pehchaan_analytics_updated';

// Zero-base initial real-time structure
const ZERO_ANALYTICS: AnalyticsData = {
  totalVisits: 0,
  uniqueVisitors: 0,
  totalConversions: 0,
  totalWhatsAppClicks: 0,
  clicksBySource: {},
  clicksByService: {},
  countryStats: {},
  deviceBreakdown: {
    mobile: 0,
    desktop: 0,
    tablet: 0
  },
  events: [],
  lastUpdated: Date.now()
};

// Clean up any legacy mock data from previous sessions
function cleanupLegacyMockData() {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(OLD_STORAGE_KEY)) {
      localStorage.removeItem(OLD_STORAGE_KEY);
    }
  } catch (e) {
    // ignore
  }
}

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

// Map country code to flag emoji
function getCountryFlag(code: string): string {
  const flags: Record<string, string> = {
    'IN': '🇮🇳',
    'AE': '🇦🇪',
    'US': '🇺🇸',
    'GB': '🇬🇧',
    'CA': '🇨🇦',
    'SG': '🇸🇬',
    'AU': '🇦🇺',
    'DE': '🇩🇪',
    'SA': '🇸🇦',
    'QA': '🇶🇦',
    'KW': '🇰🇼',
    'OM': '🇴🇲',
    'FR': '🇫🇷',
    'NL': '🇳🇱',
    'NZ': '🇳🇿',
    'MY': '🇲🇾',
    'ZA': '🇿🇦'
  };
  return flags[code] || '🌐';
}

// Fallback country detection from browser timezone / locale
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

// Resolve detected country in real-time
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

  // Attempt real lightweight IP country lookup
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('https://api.country.is', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      const code = data.country || 'IN';
      const countryNames: Record<string, string> = {
        'IN': 'India',
        'AE': 'United Arab Emirates',
        'US': 'United States',
        'GB': 'United Kingdom',
        'CA': 'Canada',
        'SG': 'Singapore',
        'AU': 'Australia',
        'DE': 'Germany',
        'SA': 'Saudi Arabia',
        'QA': 'Qatar',
        'KW': 'Kuwait',
        'OM': 'Oman',
        'FR': 'France',
        'NL': 'Netherlands',
        'NZ': 'New Zealand',
        'MY': 'Malaysia',
        'ZA': 'South Africa'
      };
      const name = countryNames[code] || code;
      const flag = getCountryFlag(code);
      const result = { code, name, flag };
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
  cleanupLegacyMockData();
  if (typeof window === 'undefined') return { ...ZERO_ANALYTICS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ZERO_ANALYTICS));
      return { ...ZERO_ANALYTICS };
    }
    const parsed = JSON.parse(raw);
    return {
      totalVisits: parsed.totalVisits || 0,
      uniqueVisitors: parsed.uniqueVisitors || 0,
      totalConversions: parsed.totalConversions || 0,
      totalWhatsAppClicks: parsed.totalWhatsAppClicks || 0,
      clicksBySource: parsed.clicksBySource || {},
      clicksByService: parsed.clicksByService || {},
      countryStats: parsed.countryStats || {},
      deviceBreakdown: parsed.deviceBreakdown || { mobile: 0, desktop: 0, tablet: 0 },
      events: Array.isArray(parsed.events) ? parsed.events : [],
      lastUpdated: parsed.lastUpdated || Date.now()
    };
  } catch (e) {
    return { ...ZERO_ANALYTICS };
  }
}

// Save analytics data and dispatch update event
function saveAnalyticsData(data: AnalyticsData) {
  if (typeof window === 'undefined') return;
  try {
    data.lastUpdated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: data }));
  } catch (e) {
    console.error('Failed to save real-time analytics:', e);
  }
}

// Track a real page view / visitor
export async function trackPageView(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  // Prevent duplicate page view within the same session tab
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

  // Update country stats
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

  // Update device stats
  if (device === 'Mobile') data.deviceBreakdown.mobile += 1;
  else if (device === 'Desktop') data.deviceBreakdown.desktop += 1;
  else data.deviceBreakdown.tablet += 1;

  // Record real event
  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    type: 'visit',
    title: 'Website Page View',
    subtitle: `Real session on ${device}`,
    country: country.name,
    countryCode: country.code,
    flag: country.flag,
    device,
    timestamp: Date.now()
  };
  data.events = [newEvent, ...(data.events || [])].slice(0, 200);

  saveAnalyticsData(data);
}

// Track real WhatsApp button click
export async function trackWhatsAppClick(source: string, serviceName?: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const data = getAnalyticsData();
  const country = await getDetectedCountry();
  const device = detectDevice();

  data.totalWhatsAppClicks += 1;

  // Track by touchpoint
  data.clicksBySource[source] = (data.clicksBySource[source] || 0) + 1;

  // Track by service name if applicable
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

  // Record real event
  const newEvent: AnalyticsEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    type: 'whatsapp_click',
    title: serviceName ? `WhatsApp: ${serviceName}` : `WhatsApp Click`,
    subtitle: source,
    country: country.name,
    countryCode: country.code,
    flag: country.flag,
    device,
    timestamp: Date.now(),
    meta: serviceName
  };
  data.events = [newEvent, ...(data.events || [])].slice(0, 200);

  saveAnalyticsData(data);
}

// Track real form submission / enquiry conversion
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
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    type: 'conversion',
    title: `Enquiry Conversion (${type})`,
    subtitle: serviceName ? `Package: ${serviceName}` : 'Enquiry submitted',
    country: country.name,
    countryCode: country.code,
    flag: country.flag,
    device,
    timestamp: Date.now(),
    meta: serviceName
  };
  data.events = [newEvent, ...(data.events || [])].slice(0, 200);

  saveAnalyticsData(data);
}

// Reset analytics strictly to zero
export function resetAnalyticsData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ZERO_ANALYTICS));
  window.dispatchEvent(new CustomEvent(ANALYTICS_EVENT, { detail: ZERO_ANALYTICS }));
}
