/**
 * Vendure GraphQL Client for Elite Veterinary Project
 * This handles all communication with the Vendure backend for product filtering
 */

// Vendure API Configuration
const VENDURE_API_URL = process.env.NEXT_PUBLIC_VENDURE_API_URL || 'http://localhost:3000/shop-api';

export interface VendureClientOptions {
  languageCode?: 'en' | 'ar';
  token?: string;
}

class VendureClient {
  private baseURL: string;
  private defaultLanguage: 'en' | 'ar' = 'en';

  constructor() {
    this.baseURL = VENDURE_API_URL;
  }

  async query<T = any>(
    query: string, 
    variables: Record<string, any> = {},
    options: VendureClientOptions = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    if (options.languageCode) {
      headers['Accept-Language'] = options.languageCode;
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables: {
            ...variables,
            languageCode: options.languageCode || this.defaultLanguage,
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error('Vendure GraphQL errors:', data.errors);
        throw new Error(data.errors[0]?.message || 'GraphQL Error');
      }

      return data.data;
    } catch (error) {
      console.error('Vendure API Error:', error);
      throw error;
    }
  }

  setDefaultLanguage(lang: 'en' | 'ar') {
    this.defaultLanguage = lang;
  }
}

export const vendureClient = new VendureClient();

// Helper function for making queries
export const queryVendure = <T = any>(
  query: string,
  variables?: Record<string, any>,
  options?: VendureClientOptions
): Promise<T> => {
  return vendureClient.query<T>(query, variables, options);
};