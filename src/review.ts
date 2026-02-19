import * as StoreReview from 'expo-store-review';
import { loadReviewState, saveReviewState } from './storage';

const SESSION_THRESHOLD = 3;

export async function requestReview(): Promise<void> {
  const available = await StoreReview.isAvailableAsync();
  if (available) {
    await StoreReview.requestReview();
  } else {
    const url = StoreReview.storeUrl();
    if (url) {
      const { Linking } = await import('react-native');
      await Linking.openURL(url);
    }
  }
  const state = await loadReviewState();
  state.lastRequestedAt = new Date().toISOString();
  saveReviewState(state);
}

export async function incrementSession(): Promise<void> {
  const state = await loadReviewState();
  state.sessionCount += 1;
  saveReviewState(state);

  if (state.sessionCount >= SESSION_THRESHOLD && state.lastRequestedAt === null) {
    await requestReview();
  }
}
