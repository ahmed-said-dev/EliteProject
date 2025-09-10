import { useQuery } from 'react-query';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';

interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  altText?: string;
  order: number;
  isActive: boolean;
  image: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface GalleryImagesResponse {
  data: GalleryImage[];
}

/**
 * Hook لجلب صور السلايدر من Strapi API
 */
export const useGalleryImages = () => {
  const { locale } = useLanguage();
  
  const queryKey = ['gallery-images', locale];
  
  const { data, isLoading, error, refetch } = useQuery<GalleryImagesResponse, Error>(
    queryKey,
    async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/gallery-images?locale=${locale}`;
      
      const response = await axios.get(url);
      
      console.log('🖼️ استجابة API صور السلايدر:', response.data);
      
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 دقائق
      cacheTime: 10 * 60 * 1000, // 10 دقائق
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  // تحويل البيانات للصيغة المطلوبة مع URLs كاملة
  const formattedImages = data?.data?.map(image => ({
    id: image.id,
    title: image.title,
    description: image.description,
    altText: image.altText || image.title,
    order: image.order,
    src: `${process.env.NEXT_PUBLIC_API_URL}${image.image.url}`,
    thumbnail: image.image.formats?.thumbnail 
      ? `${process.env.NEXT_PUBLIC_API_URL}${image.image.formats.thumbnail.url}`
      : `${process.env.NEXT_PUBLIC_API_URL}${image.image.url}`,
    medium: image.image.formats?.medium 
      ? `${process.env.NEXT_PUBLIC_API_URL}${image.image.formats.medium.url}`
      : `${process.env.NEXT_PUBLIC_API_URL}${image.image.url}`,
  })) || [];

  return {
    images: formattedImages,
    rawData: data?.data || [],
    isLoading,
    error,
    refetch,
  };
};
