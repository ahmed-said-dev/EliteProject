import useUnifiedServiceById from '@/hooks/useUnifiedServiceById';

// Simple alias to match requested naming: useUnifiedService(id)
export default function useUnifiedService(id?: string | number) {
  return useUnifiedServiceById(id);
}
