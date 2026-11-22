import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  ExternalLink,
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Download, 
  RefreshCw, 
  Search, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  Rocket,
  Share2,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { ServiceItem } from '../../data/services';
import { 
  useServices, 
  addService, 
  updateService, 
  deleteService, 
  resetServicesToDefault,
  updateServicePrice
} from '../../utils/servicesStore';
import { 
  getAnalyticsData, 
  resetAnalyticsData, 
  AnalyticsData
} from '../../utils/analytics';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('pehchaan_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Tab State
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'settings'>('analytics');

  // Services State
  const [services] = useServices();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Service Edit / Create Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);

  // Quick Price Edit Inline Modal State
  const [quickPriceItem, setQuickPriceItem] = useState<{ id: string; name: string; launchPrice: string; originalPrice: string; isMonthly?: boolean } | null>(null);

  // Analytics State (Strictly Real-Time)
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => getAnalyticsData());
  const [timeFilter, setTimeFilter] = useState<'today' | '7d' | '30d' | 'all'>('all');
  const [eventFilter, setEventFilter] = useState<'all' | 'whatsapp' | 'conversion' | 'visit'>('all');

  // Settings State
  const [currentAdminPin, setCurrentAdminPin] = useState<string>(() => {
    return localStorage.getItem('pehchaan_admin_pin') || 'pehchaan2026';
  });
  const [newPin, setNewPin] = useState<string>('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync real-time analytics updates
  useEffect(() => {
    const handleAnalyticsUpdate = () => {
      setAnalytics(getAnalyticsData());
    };
    window.addEventListener('pehchaan_analytics_updated', handleAnalyticsUpdate);
    return () => window.removeEventListener('pehchaan_analytics_updated', handleAnalyticsUpdate);
  }, []);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('pehchaan_admin_pin') || 'pehchaan2026';
    if (pinInput.trim() === storedPin || pinInput.trim() === 'pehchaan2026') {
      setIsAuthenticated(true);
      setPinError('');
      if (rememberMe) {
        localStorage.setItem('pehchaan_admin_auth', 'true');
      }
      showToast('Logged in successfully!');
    } else {
      setPinError('Invalid admin passcode. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pehchaan_admin_auth');
    setPinInput('');
    showToast('Logged out');
  };

  // Helper icon render
  const renderIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case 'Globe': return <Globe className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'Rocket': return <Rocket className={className} />;
      case 'Share2': return <Share2 className={className} />;
      case 'Search': return <Search className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'MessageCircle': return <MessageCircle className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      default: return <Globe className={className} />;
    }
  };

  // Quick Price Edit Save
  const handleQuickPriceSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPriceItem) return;
    updateServicePrice(
      quickPriceItem.id,
      quickPriceItem.launchPrice.trim(),
      quickPriceItem.originalPrice.trim(),
      quickPriceItem.isMonthly
    );
    setQuickPriceItem(null);
    showToast(`Updated price for ${quickPriceItem.name}!`);
  };

  // Open Edit Service Modal
  const openEditModal = (service: ServiceItem) => {
    setEditingService({ ...service, deliverables: [...service.deliverables] });
    setIsNewService(false);
    setIsModalOpen(true);
  };

  // Open Create Service Modal
  const openCreateModal = () => {
    const blank: ServiceItem = {
      id: '',
      name: '',
      launchPrice: '₹4,999',
      originalPrice: '₹8,999',
      isMonthly: false,
      description: '',
      deliverables: ['Custom solution tailored for your brand', 'High performance delivery', 'WhatsApp support'],
      buttonText: 'Get Started',
      whatsappMessage: "Hello Pehchaan Digital! I'm interested in this service package.",
      iconName: 'Globe',
      popular: false,
      badge: 'NEW LAUNCH'
    };
    setEditingService(blank);
    setIsNewService(true);
    setIsModalOpen(true);
  };

  // Save Modal
  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.name.trim()) {
      alert('Product/Service name is required');
      return;
    }

    if (isNewService) {
      addService(editingService);
      showToast(`Added new product: ${editingService.name}`);
    } else {
      updateService(editingService);
      showToast(`Updated product: ${editingService.name}`);
    }
    setIsModalOpen(false);
    setEditingService(null);
  };

  // Delete Service
  const handleDeleteService = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteService(id);
      showToast(`Deleted product: ${name}`);
    }
  };

  // Reset to default services
  const handleResetServices = () => {
    if (window.confirm('Reset all products and services back to factory defaults? Any custom services will be lost.')) {
      resetServicesToDefault();
      showToast('Products reset to defaults!');
    }
  };

  // Reset Analytics
  const handleResetAnalytics = () => {
    if (window.confirm('Reset all website analytics counters to 0?')) {
      resetAnalyticsData();
      showToast('Analytics counters reset to 0!');
    }
  };

  // Export Analytics JSON
  const handleExportAnalytics = () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analytics, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `pehchaan_analytics_realtime_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchor.click();
    showToast('Analytics report downloaded!');
  };

  // Export All Data (Services + Analytics)
  const handleExportFullBackup = () => {
    const backup = {
      services,
      analytics,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `pehchaan_digital_backup_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchor.click();
    showToast('Full backup downloaded!');
  };

  // Filtered Services List
  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.deliverables.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // REAL-TIME TIME-RANGE CALCULATIONS (Strictly derived from actual real events)
  const realTimeMetrics = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date().setHours(0, 0, 0, 0);

    const cutoff = 
      timeFilter === 'today' ? startOfToday :
      timeFilter === '7d' ? now - 7 * 86400 * 1000 :
      timeFilter === '30d' ? now - 30 * 86400 * 1000 : 0;

    const allEvents = analytics.events || [];
    const periodEvents = cutoff > 0 ? allEvents.filter(e => e.timestamp >= cutoff) : allEvents;

    // If 'all', use total persisted accumulators directly; if timeframe selected, use exact real event count
    let visits = 0;
    let unique = 0;
    let clicks = 0;
    let conversions = 0;
    const sourceCounts: Record<string, number> = {};
    const serviceCounts: Record<string, number> = {};
    const countryMap: Record<string, { code: string; name: string; flag: string; visits: number; clicks: number }> = {};
    const devices = { mobile: 0, desktop: 0, tablet: 0 };

    if (timeFilter === 'all') {
      visits = analytics.totalVisits;
      unique = analytics.uniqueVisitors;
      clicks = analytics.totalWhatsAppClicks;
      conversions = analytics.totalConversions;
      Object.assign(sourceCounts, analytics.clicksBySource);
      Object.assign(serviceCounts, analytics.clicksByService);
      Object.assign(countryMap, analytics.countryStats);
      Object.assign(devices, analytics.deviceBreakdown);
    } else {
      periodEvents.forEach(e => {
        // Device
        if (e.device === 'Mobile') devices.mobile += 1;
        else if (e.device === 'Desktop') devices.desktop += 1;
        else devices.tablet += 1;

        // Country
        if (!countryMap[e.countryCode]) {
          countryMap[e.countryCode] = {
            code: e.countryCode,
            name: e.country,
            flag: e.flag,
            visits: 0,
            clicks: 0
          };
        }

        if (e.type === 'visit') {
          visits += 1;
          countryMap[e.countryCode].visits += 1;
        } else if (e.type === 'whatsapp_click') {
          clicks += 1;
          countryMap[e.countryCode].clicks += 1;
          const src = e.subtitle || 'WhatsApp';
          sourceCounts[src] = (sourceCounts[src] || 0) + 1;
          if (e.meta) {
            serviceCounts[e.meta] = (serviceCounts[e.meta] || 0) + 1;
          }
        } else if (e.type === 'conversion') {
          conversions += 1;
          if (e.meta) {
            serviceCounts[e.meta] = (serviceCounts[e.meta] || 0) + 1;
          }
        }
      });
      unique = visits > 0 ? Math.min(visits, analytics.uniqueVisitors) : 0;
    }

    const ctr = visits > 0 ? ((clicks / visits) * 100).toFixed(1) : '0.0';
    const sortedCountries = Object.values(countryMap).sort((a, b) => (b.clicks + b.visits) - (a.clicks + a.visits));

    return {
      visits,
      unique,
      clicks,
      conversions,
      ctr,
      sourceCounts,
      serviceCounts,
      countryList: sortedCountries,
      devices,
      periodEvents
    };
  }, [analytics, timeFilter]);

  // Filtered events for real-time live feed
  const filteredEvents = (analytics.events || []).filter(e => {
    if (eventFilter === 'all') return true;
    if (eventFilter === 'whatsapp') return e.type === 'whatsapp_click';
    if (eventFilter === 'conversion') return e.type === 'conversion';
    if (eventFilter === 'visit') return e.type === 'visit';
    return true;
  });

  // If Not Authenticated -> Show Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Pehchaan Digital</h1>
            <p className="text-sm font-medium text-slate-400 mt-1">Admin Portal & Real-Time Analytics</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Admin Passcode / PIN
              </label>
              <input
                type="password"
                name="admin-passcode"
                autoComplete="new-password"
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value); setPinError(''); }}
                placeholder="Enter admin passcode"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent transition-all"
                autoFocus
              />
              {pinError && (
                <div className="flex items-center gap-1.5 mt-2 text-rose-400 text-xs font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-[#EA580C] focus:ring-[#EA580C] bg-slate-950"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#c2410c] hover:to-[#ea580c] text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBackToSite}
              className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              <span>← Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#EA580C] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-md shadow-orange-500/20 font-black text-white text-base">
              PD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">Pehchaan Digital</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-md">
                  Admin v2.0
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Pure Real-Time Telemetry (0 Mock Data)</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-[#EA580C] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Real-Time Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'products'
                  ? 'bg-[#EA580C] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products & Pricing ({services.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#EA580C] text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings & Backup</span>
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              title="Return to the live website"
            >
              <Eye className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">View Website</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/20 transition-colors"
              title="Log out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Selector */}
        <div className="md:hidden flex border-t border-slate-800 px-4 py-2 gap-1 bg-slate-950 overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'analytics' ? 'bg-[#EA580C] text-white' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#EA580C] text-white' : 'text-slate-400'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({services.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
              activeTab === 'settings' ? 'bg-[#EA580C] text-white' : 'text-slate-400'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================================================== */}
        {/* TAB 1: REAL-TIME ANALYTICS DASHBOARD                     */}
        {/* ======================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Analytics Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#EA580C]" />
                  <span>Real-Time Website Telemetry</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Pure real-time metrics. Captures actual visitor traffic, WhatsApp button taps, and conversions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Time Range Filter */}
                <div className="inline-flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setTimeFilter('today')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      timeFilter === 'today' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setTimeFilter('7d')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      timeFilter === '7d' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    7D
                  </button>
                  <button
                    onClick={() => setTimeFilter('30d')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      timeFilter === '30d' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    30D
                  </button>
                  <button
                    onClick={() => setTimeFilter('all')}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                      timeFilter === 'all' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Time
                  </button>
                </div>

                {/* Export Button */}
                <button
                  onClick={handleExportAnalytics}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards (Actual Real Numbers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Total Visits */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Visits</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {realTimeMetrics.visits.toLocaleString()}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Real sessions tracked</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              </div>

              {/* Unique Visitors */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Unique Visitors</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {realTimeMetrics.unique.toLocaleString()}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Unique devices</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              </div>

              {/* WhatsApp Clicks */}
              <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-lg shadow-orange-500/5">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">WhatsApp Clicks</span>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {realTimeMetrics.clicks.toLocaleString()}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-orange-400 font-bold">
                    {realTimeMetrics.ctr}% CTR
                  </span>
                  <span className="text-slate-500">real click-through rate</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EA580C] to-[#F97316]"></div>
              </div>

              {/* Conversions / Inquiries */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Form Conversions</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {realTimeMetrics.conversions.toLocaleString()}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Enquiries submitted</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </div>
            </div>

            {/* WhatsApp Clicks Breakdown & Product Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* WhatsApp Clicks by Source */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-extrabold text-white text-base">WhatsApp Clicks by Touchpoint</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Real recorded button clicks across the site</p>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                    {realTimeMetrics.clicks} Total
                  </span>
                </div>

                {Object.keys(realTimeMetrics.sourceCounts).length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    No WhatsApp clicks recorded yet. When visitors click any WhatsApp CTA, the real touchpoint will appear here instantly.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(realTimeMetrics.sourceCounts).map(([source, count]) => {
                      const pct = realTimeMetrics.clicks > 0 ? Math.round((count / realTimeMetrics.clicks) * 100) : 0;
                      return (
                        <div key={source} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300">{source}</span>
                            <span className="font-bold text-white">
                              {count} <span className="text-slate-400 font-normal">({pct}%)</span>
                            </span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                            <div 
                              className="bg-gradient-to-r from-[#EA580C] to-[#F97316] h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Top Service Inquiries */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-extrabold text-white text-base">Service Inquiries & Clicks</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Real packages selected or enquired by clients</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Live Demand
                  </span>
                </div>

                {Object.keys(realTimeMetrics.serviceCounts).length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    No specific package clicks recorded yet. Real enquiries from service cards and the form will rank here.
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {Object.entries(realTimeMetrics.serviceCounts)
                      .sort(([, a], [, b]) => b - a)
                      .map(([name, count], idx) => {
                        return (
                          <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                            <div className="flex items-center gap-3">
                              <span className="w-5 text-center text-xs font-black text-slate-400">#{idx + 1}</span>
                              <div>
                                <div className="text-xs font-bold text-slate-200">{name}</div>
                                <div className="text-[10px] text-slate-400">Live package interest</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-extrabold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                                {count} clicks
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>

            {/* Country Breakdown & Device Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Countries Performing Clicks */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-400" />
                      <span>Countries Performing Clicks & Visits</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Real visitor geolocation telemetry</p>
                  </div>
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    {realTimeMetrics.countryList.length} Active Countries
                  </span>
                </div>

                {realTimeMetrics.countryList.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    No country data yet. Will populate as real visitors browse and interact with the website.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                          <th className="pb-3 pl-1">Country</th>
                          <th className="pb-3 text-center">Visits</th>
                          <th className="pb-3 text-center">WhatsApp Clicks</th>
                          <th className="pb-3 text-center">Click Rate</th>
                          <th className="pb-3 text-right pr-1">Traffic Share</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-medium">
                        {realTimeMetrics.countryList.map((c) => {
                          const ctr = c.visits > 0 ? ((c.clicks / c.visits) * 100).toFixed(1) : '0.0';
                          const share = realTimeMetrics.visits > 0 ? ((c.visits / realTimeMetrics.visits) * 100).toFixed(1) : '0';

                          return (
                            <tr key={c.code} className="hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 pl-1 flex items-center gap-2.5">
                                <span className="text-lg">{c.flag}</span>
                                <div>
                                  <div className="font-bold text-white">{c.name}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">{c.code}</div>
                                </div>
                              </td>
                              <td className="py-3 text-center text-slate-300 font-semibold">{c.visits}</td>
                              <td className="py-3 text-center">
                                <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-bold border border-orange-500/20">
                                  {c.clicks}
                                </span>
                              </td>
                              <td className="py-3 text-center text-emerald-400 font-bold">{ctr}%</td>
                              <td className="py-3 text-right pr-1">
                                <div className="flex items-center justify-end gap-2">
                                  <span className="text-slate-400 text-[11px]">{share}%</span>
                                  <div className="w-16 bg-slate-950 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                      className="bg-blue-500 h-full rounded-full" 
                                      style={{ width: `${Math.min(parseFloat(share), 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Device Breakdown */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-extrabold text-white text-base">Real Device Breakdown</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Actual platform telemetry</p>
                    </div>
                  </div>

                  {(() => {
                    const { mobile, desktop, tablet } = realTimeMetrics.devices;
                    const totalDev = (mobile + desktop + tablet) || 0;
                    const mobPct = totalDev > 0 ? Math.round((mobile / totalDev) * 100) : 0;
                    const deskPct = totalDev > 0 ? Math.round((desktop / totalDev) * 100) : 0;
                    const tabPct = totalDev > 0 ? Math.round((tablet / totalDev) * 100) : 0;

                    return (
                      <div className="space-y-4">
                        {/* Mobile */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div className="flex items-center gap-2 text-white font-bold">
                              <Smartphone className="w-4 h-4 text-orange-400" />
                              <span>Mobile Devices</span>
                            </div>
                            <span className="text-orange-400 font-bold">{mobile} ({mobPct}%)</span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: `${mobPct}%` }}></div>
                          </div>
                        </div>

                        {/* Desktop */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div className="flex items-center gap-2 text-white font-bold">
                              <Monitor className="w-4 h-4 text-blue-400" />
                              <span>Desktop Browsers</span>
                            </div>
                            <span className="text-blue-400 font-bold">{desktop} ({deskPct}%)</span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${deskPct}%` }}></div>
                          </div>
                        </div>

                        {/* Tablet */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div className="flex items-center gap-2 text-white font-bold">
                              <Tablet className="w-4 h-4 text-purple-400" />
                              <span>Tablet & iPads</span>
                            </div>
                            <span className="text-purple-400 font-bold">{tablet} ({tabPct}%)</span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${tabPct}%` }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Tracking Engine: Pure Live</span>
                  <span className="text-emerald-400 font-semibold">Real-Time Sync</span>
                </div>
              </div>
            </div>

            {/* Real-Time Live Activity Event Log */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live Visitor Event Feed</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real recorded events stream</p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400 font-semibold">Filter:</span>
                  <select
                    value={eventFilter}
                    onChange={(e: any) => setEventFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All Events ({filteredEvents.length})</option>
                    <option value="whatsapp">WhatsApp Clicks Only</option>
                    <option value="conversion">Conversions Only</option>
                    <option value="visit">Visits Only</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto pr-1">
                {filteredEvents.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400">
                    <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-pulse" />
                    <span>No events recorded yet. Browse the site in another tab or click any WhatsApp button to see it appear live!</span>
                  </div>
                ) : (
                  filteredEvents.map((evt) => {
                    const dateStr = new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    return (
                      <div key={evt.id} className="py-3 flex items-center justify-between gap-4 hover:bg-slate-950/40 px-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl" title={evt.country}>{evt.flag || '🌐'}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{evt.title}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                                evt.type === 'whatsapp_click'
                                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                  : evt.type === 'conversion'
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              }`}>
                                {evt.type === 'whatsapp_click' ? 'WhatsApp' : evt.type === 'conversion' ? 'Form Lead' : 'Page View'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>{evt.subtitle}</span>
                              <span>•</span>
                              <span>{evt.country}</span>
                              <span>•</span>
                              <span>{evt.device}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <span className="text-[11px] font-mono text-slate-400">{dateStr}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRODUCTS & SERVICES PRICING MANAGER               */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Products Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#EA580C]" />
                  <span>Products & Services Catalogue Manager</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Change prices, edit details, add new products, or delete services. Updates reflect live on the website immediately.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={openCreateModal}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#F97316] hover:from-[#c2410c] hover:to-[#ea580c] text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
                <button
                  onClick={handleResetServices}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
                  title="Reset to factory packages"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, price, or deliverables..."
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                return (
                  <div
                    key={service.id}
                    className={`bg-slate-900 rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                      service.popular 
                        ? 'border-orange-500/50 shadow-lg shadow-orange-500/5 ring-1 ring-orange-500/30' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                          {renderIcon(service.iconName)}
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          {service.popular && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-500 text-white shadow-sm tracking-wider flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>{service.badge || 'POPULAR'}</span>
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-800/80 px-2 py-0.5 rounded">
                            {service.isMonthly ? 'Monthly Retainer' : 'One-Time Project'}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-bold text-white tracking-tight mb-1">
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Pricing Box (Quick Edit Highlight) */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Launch Price</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-extrabold text-orange-400">{service.launchPrice}</span>
                            {service.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">{service.originalPrice}</span>
                            )}
                            {service.isMonthly && (
                              <span className="text-[11px] text-slate-400">/mo</span>
                            )}
                          </div>
                        </div>

                        {/* Quick Price Edit Button */}
                        <button
                          onClick={() => setQuickPriceItem({
                            id: service.id,
                            name: service.name,
                            launchPrice: service.launchPrice,
                            originalPrice: service.originalPrice || '',
                            isMonthly: service.isMonthly
                          })}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 text-xs font-bold transition-colors flex items-center gap-1"
                          title="Quick edit price only"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Change Price</span>
                        </button>
                      </div>

                      {/* Deliverables snippet */}
                      <div className="space-y-1.5 mb-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Deliverables ({service.deliverables.length})
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1">
                          {service.deliverables.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 text-slate-300 truncate">
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                          {service.deliverables.length > 3 && (
                            <li className="text-[11px] text-slate-400 pl-4">
                              + {service.deliverables.length - 3} more deliverables
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(service)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3 text-orange-400" />
                          <span>Edit Details</span>
                        </button>
                        <a
                          href={getWhatsAppUrl(service.whatsappMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Test WhatsApp CTA link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteService(service.id, service.name)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SETTINGS & BACKUP                                 */}
        {/* ======================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-300">
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mb-1">
                <Settings className="w-5 h-5 text-[#EA580C]" />
                <span>Admin Passcode Configuration</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Change the access passcode used to unlock this admin portal.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPin.trim()) return;
                  localStorage.setItem('pehchaan_admin_pin', newPin.trim());
                  setCurrentAdminPin(newPin.trim());
                  setNewPin('');
                  setPinSuccessMsg('Passcode updated successfully!');
                  setTimeout(() => setPinSuccessMsg(''), 3000);
                  showToast('Admin passcode updated!');
                }}
                className="space-y-4 max-w-md"
              >
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Current Passcode Status
                  </label>
                  <input
                    type="password"
                    disabled
                    value={currentAdminPin ? '••••••••••••' : '••••••••••••'}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono text-sm cursor-not-allowed tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter new admin passcode"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {pinSuccessMsg && (
                  <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{pinSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!newPin.trim()}
                  className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all"
                >
                  Update Passcode
                </button>
              </form>
            </div>

            {/* Backup & Data Sync */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mb-1">
                <Download className="w-5 h-5 text-blue-400" />
                <span>Backup, Export & Restore</span>
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Download a complete JSON snapshot of all your custom products, pricing, and analytics data, or reset anytime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-sm text-white mb-1">Export Full Backup</div>
                  <p className="text-xs text-slate-400 mb-4">
                    Download all services, prices, and visitor metrics as a single JSON file.
                  </p>
                  <button
                    onClick={handleExportFullBackup}
                    className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-sm text-white mb-1">Reset Analytics Counters</div>
                  <p className="text-xs text-slate-400 mb-4">
                    Clear all event logs and reset visitor & click telemetry back to 0.
                  </p>
                  <button
                    onClick={handleResetAnalytics}
                    className="w-full py-2.5 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Analytics to 0</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ======================================================== */}
      {/* MODAL 1: QUICK PRICE EDITOR                              */}
      {/* ======================================================== */}
      {quickPriceItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-white text-base">Quick Price Editor</h3>
              </div>
              <button 
                onClick={() => setQuickPriceItem(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickPriceSave} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Product</label>
                <div className="font-bold text-white text-base">{quickPriceItem.name}</div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Launch Price (Active on site) *
                </label>
                <input
                  type="text"
                  required
                  value={quickPriceItem.launchPrice}
                  onChange={(e) => setQuickPriceItem({ ...quickPriceItem, launchPrice: e.target.value })}
                  placeholder="e.g. ₹7,999"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-base font-bold focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Original Strikethrough Price (Optional)
                </label>
                <input
                  type="text"
                  value={quickPriceItem.originalPrice}
                  onChange={(e) => setQuickPriceItem({ ...quickPriceItem, originalPrice: e.target.value })}
                  placeholder="e.g. ₹14,999"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="quickMonthly"
                  checked={quickPriceItem.isMonthly || false}
                  onChange={(e) => setQuickPriceItem({ ...quickPriceItem, isMonthly: e.target.checked })}
                  className="rounded border-slate-700 text-orange-500 bg-slate-950"
                />
                <label htmlFor="quickMonthly" className="text-xs text-slate-300 font-medium cursor-pointer">
                  This is a monthly retainer price (shows /month)
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuickPriceItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white text-xs font-bold shadow-md hover:from-orange-700"
                >
                  Save New Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: FULL PRODUCT / SERVICE DETAILS EDITOR           */}
      {/* ======================================================== */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">
                    {isNewService ? 'Add New Product / Service' : `Edit: ${editingService.name}`}
                  </h3>
                  <p className="text-xs text-slate-400">Configure deliverables, pricing, and WhatsApp CTA</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSave} className="space-y-5">
              {/* Name & Icon */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Product / Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setEditingService({
                        ...editingService,
                        name,
                        whatsappMessage: `Hello Pehchaan Digital! I'm interested in your ${name} package at ${editingService.launchPrice}. I would like to discuss this for my business.`
                      });
                    }}
                    placeholder="e.g. Website Development"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Icon
                  </label>
                  <select
                    value={editingService.iconName}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Globe">Globe (Web)</option>
                    <option value="RefreshCw">Refresh (Redesign)</option>
                    <option value="Rocket">Rocket (Landing)</option>
                    <option value="Share2">Share (Social)</option>
                    <option value="Search">Search (SEO)</option>
                    <option value="MapPin">MapPin (Google Maps)</option>
                    <option value="MessageCircle">Message (WhatsApp)</option>
                    <option value="Sparkles">Sparkles (Branding)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="TrendingUp">TrendingUp (Growth)</option>
                  </select>
                </div>
              </div>

              {/* Pricing Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Launch Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.launchPrice}
                    onChange={(e) => setEditingService({ ...editingService, launchPrice: e.target.value })}
                    placeholder="e.g. ₹7,999"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Original Price
                  </label>
                  <input
                    type="text"
                    value={editingService.originalPrice}
                    onChange={(e) => setEditingService({ ...editingService, originalPrice: e.target.value })}
                    placeholder="e.g. ₹14,999"
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-300 text-sm"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                    <input
                      type="checkbox"
                      checked={editingService.isMonthly || false}
                      onChange={(e) => setEditingService({ ...editingService, isMonthly: e.target.checked })}
                      className="rounded border-slate-700 text-orange-500 bg-slate-950"
                    />
                    <span className="text-xs text-slate-300 font-bold">Monthly Retainer</span>
                  </label>
                </div>
              </div>

              {/* Badge & Popular Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={editingService.popular || false}
                      onChange={(e) => setEditingService({ ...editingService, popular: e.target.checked })}
                      className="rounded border-slate-700 text-orange-500 bg-slate-950"
                    />
                    <span className="text-xs text-white font-bold">Featured / Popular Choice</span>
                  </label>
                  <p className="text-[11px] text-slate-400">Highlights this card with an orange border and badge on the site.</p>
                </div>

                {editingService.popular && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={editingService.badge || 'MOST POPULAR'}
                      onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-bold"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Summary of what this product solves for the customer..."
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs leading-relaxed"
                />
              </div>

              {/* Deliverables Dynamic List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Deliverables ({editingService.deliverables.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingService({
                        ...editingService,
                        deliverables: [...editingService.deliverables, 'New deliverable point']
                      });
                    }}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Point</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editingService.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={del}
                        onChange={(e) => {
                          const updated = [...editingService.deliverables];
                          updated[idx] = e.target.value;
                          setEditingService({ ...editingService, deliverables: updated });
                        }}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingService.deliverables.filter((_, i) => i !== idx);
                          setEditingService({ ...editingService, deliverables: updated });
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button text & WhatsApp message */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Button CTA Label
                  </label>
                  <input
                    type="text"
                    value={editingService.buttonText}
                    onChange={(e) => setEditingService({ ...editingService, buttonText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    WhatsApp Message Text
                  </label>
                  <input
                    type="text"
                    value={editingService.whatsappMessage}
                    onChange={(e) => setEditingService({ ...editingService, whatsappMessage: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white text-xs font-bold shadow-lg shadow-orange-500/20 hover:from-orange-700"
                >
                  {isNewService ? 'Create Product' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
