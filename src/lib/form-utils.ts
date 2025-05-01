// Types
export interface IpInfo {
  [key: string]: string;
}

export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

export interface LeelooParams extends UtmParams {
  campaignId?: string;
  adsetId?: string;
  adId?: string;
  phone?: string;
  email?: string;
  name?: string;
  google_id?: string;
}

// Constants
const DEFAULT_UTM_PARAMS: UtmParams = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
};

const LEELOO_FIELD_MAPPING = {
  utm_source: 'utm_source',
  utm_medium: 'utm_medium',
  utm_term: 'utm_term',
  utm_campaign: 'utm_campaign',
  utm_content: 'utm_content',
  campaignId: 'campaignid',
  adsetId: 'adsetid',
  adId: 'adid',
  phone: 'phone',
  email: 'email',
  name: 'first_name',
  google_id: 'ga',
  promocode: 'promocode',
} as const;

// Cookie utilities
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
  
  return cookie ? cookie.split('=')[1] : null;
}

export function setCookie(name: string, value: string, days = 30): void {
  if (typeof document === 'undefined') return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookie = getCookie(name);
  if (!cookie) return null;
  
  const parts = cookie.split('.');
  return parts.length >= 4 ? `${parts[2]}.${parts[3]}` : null;
}

// IP info utilities
export async function getIpInfo(): Promise<IpInfo> {
  try {
    const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    const text = await response.text();
    
    return text
      .trim()
      .split('\n')
      .reduce<IpInfo>((obj, pair) => {
        const [key, value] = pair.split('=');
        if (key && value) obj[key] = value;
        return obj;
      }, {});
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return {};
  }
}

// UTM utilities
export function getUtmParamsFromUrl(): UtmParams {
  if (typeof window === 'undefined') return DEFAULT_UTM_PARAMS;

  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content'),
  };
}

export function ensureUtmData<T extends Record<string, any>>(data: T, utmParams: UtmParams = DEFAULT_UTM_PARAMS): T & UtmParams {
  return {
    ...data,
    ...utmParams,
  };
}

// Leeloo utilities
export function setParamsForLeeloo(formData: LeelooParams): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  
  Object.entries(formData).forEach(([key, value]) => {
    const mappedKey = LEELOO_FIELD_MAPPING[key as keyof typeof LEELOO_FIELD_MAPPING];
    if (value && mappedKey) {
      url.searchParams.set(mappedKey, value.toString());
    }
  });

  window.history.pushState({}, document.title, url.toString());
}

export function getParamsForRedirectUrl(formData: LeelooParams, redirectUrl: string): string {
  const url = new URL(redirectUrl);
  
  Object.entries(formData).forEach(([key, value]) => {
    const mappedKey = LEELOO_FIELD_MAPPING[key as keyof typeof LEELOO_FIELD_MAPPING];
    if (value && mappedKey) {
      url.searchParams.set(mappedKey, value.toString());
    }
  });

  return url.toString();
}

// Utility functions
export function uid(): string {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
