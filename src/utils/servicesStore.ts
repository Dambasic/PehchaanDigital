import { useState, useEffect } from 'react';
import { SERVICES, ServiceItem } from '../data/services';

const STORAGE_KEY = 'pehchaan_services_v1';
const UPDATE_EVENT = 'pehchaan_services_updated';

// Read services from localStorage or fallback to default SERVICES
export function getStoredServices(): ServiceItem[] {
  if (typeof window === 'undefined') return SERVICES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SERVICES));
      return SERVICES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SERVICES;
  } catch (e) {
    console.error('Failed to read services from localStorage:', e);
    return SERVICES;
  }
}

// Save services list to localStorage and trigger change notification
export function saveAllServices(services: ServiceItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: services }));
  } catch (e) {
    console.error('Failed to save services to localStorage:', e);
  }
}

// Add a new service
export function addService(newService: ServiceItem): void {
  const current = getStoredServices();
  // Ensure unique ID
  const baseId = newService.id || newService.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  let finalId = baseId;
  let counter = 1;
  while (current.some(s => s.id === finalId)) {
    finalId = `${baseId}-${counter++}`;
  }
  const itemToAdd = { ...newService, id: finalId };
  const updated = [...current, itemToAdd];
  saveAllServices(updated);
}

// Update existing service
export function updateService(updatedService: ServiceItem): void {
  const current = getStoredServices();
  const index = current.findIndex(s => s.id === updatedService.id);
  if (index !== -1) {
    current[index] = { ...updatedService };
    saveAllServices(current);
  } else {
    // If not found, add it
    current.push(updatedService);
    saveAllServices(current);
  }
}

// Quick price update
export function updateServicePrice(
  id: string,
  launchPrice: string,
  originalPrice?: string,
  isMonthly?: boolean
): void {
  const current = getStoredServices();
  const service = current.find(s => s.id === id);
  if (service) {
    service.launchPrice = launchPrice;
    if (originalPrice !== undefined) service.originalPrice = originalPrice;
    if (isMonthly !== undefined) service.isMonthly = isMonthly;
    // Also auto-refresh WhatsApp template message with new price
    service.whatsappMessage = `Hello Pehchaan Digital! I'm interested in your ${service.name} package at ${service.launchPrice}${service.isMonthly ? '/month' : ''} (Launch Offer). I would like to discuss this for my business.`;
    saveAllServices(current);
  }
}

// Delete service
export function deleteService(id: string): void {
  const current = getStoredServices();
  const filtered = current.filter(s => s.id !== id);
  saveAllServices(filtered);
}

// Reset services to default list
export function resetServicesToDefault(): void {
  saveAllServices(SERVICES);
}

// React Hook to access and reactively observe services
export function useServices(): [ServiceItem[], (services: ServiceItem[]) => void] {
  const [services, setServices] = useState<ServiceItem[]>(() => getStoredServices());

  useEffect(() => {
    const handleUpdate = () => {
      setServices(getStoredServices());
    };

    window.addEventListener(UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const update = (newServices: ServiceItem[]) => {
    saveAllServices(newServices);
    setServices(newServices);
  };

  return [services, update];
}
