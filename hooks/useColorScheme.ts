import type { RootState } from '@/store';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

export function useColorScheme() {
  const mode = useSelector((s: RootState) => s.theme.mode);
  const system = useRNColorScheme();
  return (mode === 'light' || mode === 'dark') ? mode : (system ?? 'light');
}
