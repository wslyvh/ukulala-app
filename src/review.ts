import * as StoreReview from "expo-store-review";
import { Linking } from "react-native";
import { loadReviewState, saveReviewState } from "./storage";

const SESSION_THRESHOLD = 3;
const FALLBACK_URL = "https://www.ukulalala.com";

export async function requestReview(): Promise<void> {
  const url = StoreReview.storeUrl();
  if (url) {
    await Linking.openURL(url);
  } else {
    const available = await StoreReview.isAvailableAsync();
    if (available) {
      await StoreReview.requestReview();
    } else {
      await Linking.openURL(FALLBACK_URL);
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

  if (
    state.sessionCount >= SESSION_THRESHOLD &&
    state.lastRequestedAt === null
  ) {
    await requestReview();
  }
}
