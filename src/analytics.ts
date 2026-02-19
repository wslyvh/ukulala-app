import {
  applicationName,
  getAndroidId,
  getIosIdForVendorAsync,
  nativeApplicationVersion,
} from 'expo-application';
import { osVersion, modelName } from 'expo-device';
import { Platform } from 'react-native';

const PLAUSIBLE_URL = 'https://plausible.io/api/event';
const DOMAIN = 'app.ukulalala.com';
const APP_URL = 'app://app.ukulalala.com';

async function getDeviceId() {
  if (Platform.OS === 'android') return getAndroidId();
  if (Platform.OS === 'ios') return getIosIdForVendorAsync();
  return 'web-user';
}

function send(name: string, pathname: string, props?: Record<string, string>) {
  getDeviceId().then((deviceId) => {
    const appName = applicationName ?? 'Ukulala';
    const appVersion = nativeApplicationVersion ?? '1.0.0';
    const userAgent = `${appName}/${appVersion} (${Platform.OS} ${osVersion ?? 'unknown'}; ${modelName ?? 'browser'})`;

    fetch(PLAUSIBLE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
      },
      body: JSON.stringify({
        name,
        url: APP_URL + pathname,
        domain: DOMAIN,
        props: {
          deviceId,
          pathname,
          platform: Platform.OS,
          ...props,
        },
      }),
    }).catch(() => {});
  });
}

export function trackPageview(pathname: string) {
  send('pageview', pathname);
}

export function trackEvent(name: string, props?: Record<string, string>) {
  send(name, '/', props);
}
