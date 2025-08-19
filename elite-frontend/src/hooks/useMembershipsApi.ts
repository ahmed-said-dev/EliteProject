import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Helper function to get API URL (similar to useBlogApi)
function useApiUrl() {
  return { data: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337' };
}

// Feature interface
export interface Feature {
  id: number;
  text: string;
  isIncluded?: boolean;
}

// Membership plan interface
export interface MembershipPlan {
  id: number;
  title: string;
  description?: string;
  price: {
    monthly: number;
    annual: number;
  };
  PetType: string;
  features: Feature[];
  isFeatured?: boolean;
  iconClass?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  };
}

// Membership intro interface
export interface MembershipIntro {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}

/**
 * Hook to fetch membership plans
 */
export function useMembershipPlans() {
  const { data: apiUrl } = useApiUrl();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);

  useEffect(() => {
    let isActive = true;

    const fetchPlans = async () => {
      try {
        setLoading(true);
        
        // Fetch membership plans from API with localization
        const response = await fetch(`${apiUrl}/api/membership-plans?populate=*&locale=${locale}`);
        
        if (!isActive) return;
        
        if (!response.ok) {
          throw new Error(`Failed to fetch membership plans: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isActive) return;
        
        // Transform Strapi data format to our interface format
        const formattedPlans: MembershipPlan[] = (data.data || []).map((plan: any) => ({
          id: plan.id,
          title: plan.title || '',
          description: plan.description || '',
          price: {
            monthly: plan.monthlyPrice || 0,
            annual: plan.annualPrice !== null ? plan.annualPrice : (plan.monthlyPrice * 12 * 0.9), // Handle null annual price
          },
          PetType: plan.PetType || '', 
          isFeatured: plan.isFeatured || false,
          iconClass: plan.iconClass || '',
          features: Array.isArray(plan.features) 
            ? plan.features.map((feature: any) => ({
                id: feature.id || Math.random(),
                text: feature.text || '',
                isIncluded: feature.isIncluded !== false, // Default true unless specified otherwise
              }))
            : [],
          coverImage: plan.coverImage ? {
            url: `${apiUrl}${plan.coverImage.url || ''}`,
            alternativeText: plan.coverImage.alternativeText || '',
          } : undefined,
        }));
        
        console.log('Formatted plans:', formattedPlans);
        setPlans(formattedPlans);
        setError(null);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        
        if (isActive) {
          console.error('Error fetching membership plans:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setPlans([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    if (apiUrl) {
      fetchPlans();
    }
    
    return () => {
      isActive = false;
    };
  }, [apiUrl, locale]);

  return { plans, loading, error };
}

/**
 * Hook to fetch membership intro data
 */
export function useMembershipIntro() {
  const { data: apiUrl } = useApiUrl();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [introData, setIntroData] = useState<MembershipIntro | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchIntroData = async () => {
      try {
        setLoading(true);
        
        // Fetch membership intro from API
        const response = await fetch(`${apiUrl}/api/membership-intros?populate=*&locale=${locale}`);
        
        if (!isActive) return;
        
        if (!response.ok) {
          throw new Error(`Failed to fetch membership introduction: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isActive) return;
        
        // Transform Strapi data format
        if (data.data && data.data.length > 0) {
          const introItem = data.data[0]; // Get the first intro (assuming only one exists)
          const formattedIntro: MembershipIntro = {
            id: introItem.id,
            title: introItem.title,
            description: introItem.description,
            image: introItem.image?.data ? {
              url: `${apiUrl}${introItem.image.data.url}`,
              alternativeText: introItem.image.data.alternativeText,
            } : { url: '/images/default-membership.jpg' },
          };
          
          setIntroData(formattedIntro);
        }
        
        setError(null);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        
        if (isActive) {
          console.error('Error fetching membership intro:', err);
          setError(err instanceof Error ? err : new Error('Unknown error occurred'));
          setIntroData(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    if (apiUrl) {
      fetchIntroData();
    }
    
    return () => {
      isActive = false;
    };
  }, [apiUrl, locale]);

  return { introData, loading, error };
}

/**
 * Hook to fetch single membership plan by ID
 */
export function useSingleMembershipPlan(id?: number | string) {
  const { data: apiUrl } = useApiUrl();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [plan, setPlan] = useState<MembershipPlan | null>(null);

  useEffect(() => {
    let isActive = true;

    // If no ID is provided, we don't need to fetch anything
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchMembershipPlan = async () => {
      try {
        setLoading(true);
        
        // Fetch all membership plans and filter by ID in the client
        // This is a workaround for the 404 issue with the findOne endpoint
        const response = await fetch(`${apiUrl}/api/membership-plans?populate=*&locale=${locale}`);
        
        if (!isActive) return;
        
        if (!response.ok) {
          throw new Error(`Failed to fetch membership plans: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isActive) return;
        
        // Find the plan with matching ID
        const matchingPlan = data.data.find((plan: any) => plan.id === Number(id));
        
        if (!matchingPlan) {
          setPlan(null);
          throw new Error(`Membership plan with ID ${id} not found`);
        }
        
        // Format the single plan data
        const formattedPlan: MembershipPlan = {
          id: matchingPlan.id,
          title: matchingPlan.title || '',
          description: matchingPlan.description || '',
          price: {
            monthly: matchingPlan.monthlyPrice || 0,
            annual: matchingPlan.annualPrice !== null ? matchingPlan.annualPrice : (matchingPlan.monthlyPrice * 12 * 0.9),
          },
          PetType: matchingPlan.PetType || '',
          isFeatured: matchingPlan.isFeatured || false,
          iconClass: matchingPlan.iconClass || '',
          features: Array.isArray(matchingPlan.features) 
            ? matchingPlan.features.map((feature: any) => ({
                id: feature.id || Math.random(),
                text: feature.text || '',
                isIncluded: feature.isIncluded !== false,
              }))
            : [],
          coverImage: matchingPlan.coverImage ? {
            url: `${apiUrl}${matchingPlan.coverImage.url || ''}`,
            alternativeText: matchingPlan.coverImage.alternativeText || '',
          } : undefined,
        };
        
        setPlan(formattedPlan);
        setError(null);
      } catch (err: any) {
        if (isActive) {
          console.error('Error fetching membership plan:', err);
          setError(err instanceof Error ? err : new Error(String(err)));
          setPlan(null);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchMembershipPlan();

    return () => {
      isActive = false;
    };
  }, [apiUrl, locale, id]);

  return { plan, loading, error };
}
