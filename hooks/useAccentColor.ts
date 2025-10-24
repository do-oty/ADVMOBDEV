import type { RootState } from '@/store';
import { useSelector } from 'react-redux';

export function useAccentColor() {
  const accent = useSelector((s: RootState) => s.theme.accent) || '#1DB954';
  return accent;
}


