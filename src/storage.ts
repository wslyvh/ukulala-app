import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Key } from './utils/music';

export type Tuning = 'standard' | 'baritone';

const TUNING_KEY = 'tuning';
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

export const loadTuning = (): Promise<Tuning | null> => load(TUNING_KEY, null);
export const saveTuning = (tuning: Tuning): void     => save(TUNING_KEY, tuning);

export const loadSelectedKeys = (): Promise<Key[] | null> => load(SELECTED_KEYS_KEY, null);
export const saveSelectedKeys = (keys: Key[]): void       => save(SELECTED_KEYS_KEY, keys);

export const loadVoicingPrefs = (tuning: Tuning = 'standard'): Promise<VoicingPrefs> =>
  load(`${VOICING_PREFS_KEY}_${tuning}`, {});
export const saveVoicingPrefs = (prefs: VoicingPrefs, tuning: Tuning = 'standard'): void =>
  save(`${VOICING_PREFS_KEY}_${tuning}`, prefs);

export const loadStarredProgs = (): Promise<string[]>      => load(STARRED_PROGS_KEY, []);
export const saveStarredProgs = (ids: string[]): void      => save(STARRED_PROGS_KEY, ids);

export type ReviewState = {
  sessionCount: number;
  lastRequestedAt: string | null;
};

const REVIEW_STATE_KEY = 'review_state';
const REVIEW_DEFAULT: ReviewState = { sessionCount: 0, lastRequestedAt: null };

export const loadReviewState = (): Promise<ReviewState>       => load(REVIEW_STATE_KEY, REVIEW_DEFAULT);
export const saveReviewState = (state: ReviewState): void     => save(REVIEW_STATE_KEY, state);
