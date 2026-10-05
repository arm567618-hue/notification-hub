importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDBjqheH4lB9agmu5VGHCwOreXZL1BvUU0",
  authDomain: "mohammad-55d06.firebaseapp.com",
  projectId: "mohammad-55d06",
  storageBucket: "mohammad-55d06.firebasestorage.app",
  messagingSenderId: "192200886544",
  appId: "1:192200886544:web:8d02ebe03ba8d2e451fd95"
});

const messaging = firebase.messaging();

// پیام‌ها data-only هستند؛ نمایش اعلان به عهده‌ی همین‌جاست
messaging.onBackgroundMessage((payload) => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || 'اعلان جدید', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    dir: 'rtl',
    lang: 'fa',
    tag: d.id || undefined,
    data: { url: d.url || '' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : self.registration.scope;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(self.registration.scope) && 'focus' in c && target === self.registration.scope) return c.focus();
      }
      return clients.openWindow(target);
    })
  );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
