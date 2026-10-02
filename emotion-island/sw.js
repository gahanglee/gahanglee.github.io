// 情緒島 Service Worker（由 scripts/pwa-postbuild.mjs 在每次建置時產生，請勿直接修改 dist/sw.js）
const BUILD_ID = 'a91009df01894f';
const PRECACHE = 'ei-precache-' + BUILD_ID;
const RUNTIME = 'ei-runtime';
const PRECACHE_URLS = [
  "/emotion-island/",
  "/emotion-island/_expo/static/js/web/index-d1d92e125b929b7d9a4d5a06ffdceff5.js",
  "/emotion-island/assets/assets/cards/behavior_1.8d0266cc096247db314b62aef1fb6713.png",
  "/emotion-island/assets/assets/cards/behavior_10.6783a30da6f2d76a370b43c048ebae00.png",
  "/emotion-island/assets/assets/cards/behavior_11.9d5d322964bd853fa0c78b4a4b248d48.png",
  "/emotion-island/assets/assets/cards/behavior_12.23715fc5fa0c7215e0c966de3f3ed1e2.png",
  "/emotion-island/assets/assets/cards/behavior_13.fee1d2ace78833b4e95508ff98b535f7.png",
  "/emotion-island/assets/assets/cards/behavior_2.6c53c471c8883f22fde48a3cd168e7b8.png",
  "/emotion-island/assets/assets/cards/behavior_3.03e7cc71837acb63b7f4dd21dd067cde.png",
  "/emotion-island/assets/assets/cards/behavior_4.372ecba70981d5b84e2e0fbd1c5bb76b.png",
  "/emotion-island/assets/assets/cards/behavior_5.b275aa35876c41cd1e0ad4f9dbf05756.png",
  "/emotion-island/assets/assets/cards/behavior_6.de4012b119d6ea86fd4d86132b6981a8.png",
  "/emotion-island/assets/assets/cards/behavior_7.165c3a44ff38567ab55db3899418764e.png",
  "/emotion-island/assets/assets/cards/behavior_8.105d4c19a37df74907120f51b9c00ba0.png",
  "/emotion-island/assets/assets/cards/behavior_9.378ffc23b636e2aea3ad6feb4cd211ba.png",
  "/emotion-island/assets/assets/cards/body_angry_boy.3fd9ae5e163182c69d10c70ff820c46e.png",
  "/emotion-island/assets/assets/cards/body_angry_girl.4cf2d21b0ed6b992f82d2894b1cfa61e.png",
  "/emotion-island/assets/assets/cards/body_bored_boy.0022721f9a61130b92d85ef590a737ca.png",
  "/emotion-island/assets/assets/cards/body_bored_girl.8b689c39219d269ebf1f023c76f0b76a.png",
  "/emotion-island/assets/assets/cards/body_calm_boy.c9e57e63f5b02a088a8946c2b34701ab.png",
  "/emotion-island/assets/assets/cards/body_calm_girl.390c3ad7334d4e750865b9b3fc93c3c9.png",
  "/emotion-island/assets/assets/cards/body_disgust_boy.7caeb70d2b5fbce8840eae530ba0f091.png",
  "/emotion-island/assets/assets/cards/body_disgust_girl.69e30b3bf0ed42c6799cb42a0728969b.png",
  "/emotion-island/assets/assets/cards/body_excited_boy.0aeb185c25b9190d6e3364171bda012f.png",
  "/emotion-island/assets/assets/cards/body_excited_girl.f5eaab383af1c0109795f46eff9c9b99.png",
  "/emotion-island/assets/assets/cards/body_fear_boy.6f405f71d34307d777a0cb0af15793b6.png",
  "/emotion-island/assets/assets/cards/body_fear_girl.6e136f38e88e091ca7b9c9d4232a72e5.png",
  "/emotion-island/assets/assets/cards/body_joy_boy.511ae03c06fbb7a11143dcc3df764daa.png",
  "/emotion-island/assets/assets/cards/body_joy_girl.40feaefbc0b0dda9113747dbb993bf57.png",
  "/emotion-island/assets/assets/cards/body_sad_boy.5bbac46abcc0c7797faab580a816d8b2.png",
  "/emotion-island/assets/assets/cards/body_sad_girl.6c8076a0403d10b1ac27a087369b94c9.png",
  "/emotion-island/assets/assets/cards/body_shy_boy.8f56e901b9b81531b54b1a37b43d73f8.png",
  "/emotion-island/assets/assets/cards/body_shy_girl.ce5fa31c1238eabf8777f592c3e6cf01.png",
  "/emotion-island/assets/assets/cards/body_surprise_boy.35fb30e15b2fc55686ebebae42733308.png",
  "/emotion-island/assets/assets/cards/body_surprise_girl.cdd3bd16dea118468dfad095e32d5a75.png",
  "/emotion-island/assets/assets/cards/body_worried_boy.85d0ac2193fe7d4b6aa9a7a4286999ae.png",
  "/emotion-island/assets/assets/cards/body_worried_girl.75e774e069cb8f0e661694a8b9f12c29.png",
  "/emotion-island/assets/assets/cards/fight.88e67783f7dbb42082344b9f18627616.png",
  "/emotion-island/assets/assets/cards/pop.5c7c0fbc5516f2a75165e5b8a409929f.png",
  "/emotion-island/assets/assets/cards/s_1.766e540c59a75faec42b73953c484046.png",
  "/emotion-island/assets/assets/cards/s_10.b0b9d3935b617e19a721c6fcb9b6027d.png",
  "/emotion-island/assets/assets/cards/s_11.f285c6b9c03d37a5a72a0039a4d1b520.png",
  "/emotion-island/assets/assets/cards/s_12.8a186c4aa4d171ebcc9df25ae82f8b0d.png",
  "/emotion-island/assets/assets/cards/s_2.6afff6ea04609130e464599dfcaf0c1e.png",
  "/emotion-island/assets/assets/cards/s_3.d096a142a85ac797096f31c460925095.png",
  "/emotion-island/assets/assets/cards/s_4.95c56a80ec05a52619dd0ed4bf2d00ea.png",
  "/emotion-island/assets/assets/cards/s_5.94347b0e65fe91f042f0f42954c6437c.png",
  "/emotion-island/assets/assets/cards/s_6.25c272075f34281fdfd95c5f66ef36bb.png",
  "/emotion-island/assets/assets/cards/s_7.7f81446963aaa6a4c3d53607db1131be.png",
  "/emotion-island/assets/assets/cards/s_8.14a6a974f4c49265939bef573a4b4d24.png",
  "/emotion-island/assets/assets/cards/s_9.aa7eb7a0f61dd66bf393d92711be0a69.png",
  "/emotion-island/favicon.ico",
  "/emotion-island/icons/apple-touch-icon.png",
  "/emotion-island/icons/icon-192.png",
  "/emotion-island/icons/icon-512.png",
  "/emotion-island/icons/maskable-512.png",
  "/emotion-island/manifest.webmanifest",
  "/emotion-island/pwa.js"
];
// App 所在路徑：Vercel 為 /，個人網站為 /emotion-island/
const BASE = new URL(self.registration.scope).pathname;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache =>
      Promise.all(PRECACHE_URLS.map(u => cache.add(new Request(u, { cache: 'reload' })).catch(() => null)))
    )
  );
  // 不自動更新：讓畫面顯示「有新版」，由老師按下更新，避免孩子操作到一半被重新整理
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('ei-precache-') && k !== PRECACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // QR code 掃描元件從 jsDelivr 載入；用過一次就存起來，離線也能掃描
  if (url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith(caches.match(req).then(c => c || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(RUNTIME).then(x => x.put(req, copy)); }
      return res;
    })));
    return;
  }
  if (url.origin !== self.location.origin) return;           // Supabase、Google 表單等外部服務一律直接連線
  if (url.pathname.startsWith(BASE + 'api/')) return;         // 雲端語音等 API 不快取
  if (url.pathname === BASE + 'sw.js') return;

  // 開啟 App（頁面導覽）：先連網路，連不上就用存在裝置上的版本
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(RUNTIME).then(c => c.put(BASE, copy));
        return res;
      }).catch(() => caches.match(BASE, { ignoreSearch: true }).then(r => r || caches.match(BASE + 'index.html')))
    );
    return;
  }

  // 程式、圖片、字型（檔名含版本雜湊）：先用裝置上的，沒有再下載並存起來
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => cached || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(RUNTIME).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
