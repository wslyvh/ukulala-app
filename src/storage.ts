import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Key } from './utils/music';

const SELECTED_KEYS_KEY = 'selected_keys';
const VOICING_PREFS_KEY = 'voicing_prefs';
const STARRED_PROGS_KEY = 'starred_progressions';

export type VoicingPrefs = Record<string, number>;

async function load<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown): void {
  AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
}

export const loadSelectedKeys = (): Promise<Key[] | null> => load(SELECTED_KEYS_KEY, null);
export const saveSelectedKeys = (keys: Key[]): void       => save(SELECTED_KEYS_KEY, keys);

export const loadVoicingPrefs = (): Promise<VoicingPrefs>  => load(VOICING_PREFS_KEY, {});
export const saveVoicingPrefs = (prefs: VoicingPrefs): void => save(VOICING_PREFS_KEY, prefs);

export const loadStarredProgs = (): Promise<string[]>      => load(STARRED_PROGS_KEY, []);
export const saveStarredProgs = (ids: string[]): void      => save(STARRED_PROGS_KEY, ids);
