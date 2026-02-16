import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Key } from './utils/music';

const SELECTED_KEYS_KEY = 'selected_keys';
const VOICING_PREFS_KEY = 'voicing_prefs';

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

/** Voicing preferences: chord name → preferred voicing index */
export type VoicingPrefs = Record<string, number>;

export async function loadVoicingPrefs(): Promise<VoicingPrefs> {
  try {
    const raw = await AsyncStorage.getItem(VOICING_PREFS_KEY);
    if (raw == null) return {};
    return JSON.parse(raw) as VoicingPrefs;
  } catch {
    return {};
  }
}

export function saveVoicingPrefs(prefs: VoicingPrefs): void {
  AsyncStorage.setItem(VOICING_PREFS_KEY, JSON.stringify(prefs)).catch(() => {});
}
