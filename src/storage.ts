import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Key } from './utils/music';

const SELECTED_KEYS_KEY = 'selected_keys';

export async function loadSelectedKeys(): Promise<Key[] | null> {
  try {
    const raw = await AsyncStorage.getItem(SELECTED_KEYS_KEY);
    if (raw == null) return null;
    return JSON.parse(raw) as Key[];
  } catch {
    return null;
  }
}

export function saveSelectedKeys(keys: Key[]): void {
  AsyncStorage.setItem(SELECTED_KEYS_KEY, JSON.stringify(keys)).catch(() => {});
}
