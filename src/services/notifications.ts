export const isNotificationSupported = () =>
  typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;

export const getPermission = (): NotificationPermission =>
  isNotificationSupported() ? Notification.permission : 'denied';

export const requestPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  const result = await Notification.requestPermission();
  return result;
};

export interface ShowNotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  tag?: string;
}

export const showNotification = async ({
  title,
  body,
  icon = '/vite.svg',
  tag,
}: ShowNotificationOptions): Promise<boolean> => {
  if (!isNotificationSupported()) return false;
  if (Notification.permission !== 'granted') return false;

  try {
    new Notification(title, { body, icon, tag });
    return true;
  } catch {
    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, { body, icon, badge: icon, tag });
      return true;
    } catch (err) {
      console.error('Notification failed:', err);
      return false;
    }
  }
};

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    return reg;
  } catch (err) {
    console.warn('Service worker registration failed:', err);
    return null;
  }
};
