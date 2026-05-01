// Healthcare SaaS — minimal service worker for notifications
const CACHE = 'healthcare-app-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(['/']).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('push', (event) => {
  let payload = { title: 'Healthcare Portal', body: 'You have a new notification' };
  try {
    if (event.data) payload = { ...payload, ...event.data.json() };
  } catch (_) {
    // ignore parse errors
  }
  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/vite.svg',
      badge: payload.icon || '/vite.svg',
      tag: payload.tag,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
