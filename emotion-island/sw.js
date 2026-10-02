// 情緒島 Service Worker（由 scripts/pwa-postbuild.mjs 在每次建置時產生，請勿直接修改 dist/sw.js）
const BUILD_ID = '9de548a2c4f5ff';
const PRECACHE = 'ei-precache-' + BUILD_ID;
const RUNTIME = 'ei-runtime';
const PRECACHE_URLS = [
  "/emotion-island/",
  "/emotion-island/_expo/static/js/web/index-401fa3533a6400159b28c719a4304ffe.js",
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
  "/emotion-island/assets/assets/cards/emotion_1.50dfe77e199103cad582572ec7caf5fd.png",
  "/emotion-island/assets/assets/cards/emotion_10.8b9f982bdbd8ceccf7a398e2ea28cf49.png",
  "/emotion-island/assets/assets/cards/emotion_11.18935410062ee7fbbbc0961bb38cc845.png",
  "/emotion-island/assets/assets/cards/emotion_12.4e3bd1d5d67516ddb0ce8b742b32b44e.png",
  "/emotion-island/assets/assets/cards/emotion_13.99799d956e772e54ecc449a9ccb0228e.png",
  "/emotion-island/assets/assets/cards/emotion_14.64b385e90e35c00a71b57dfed093c240.png",
  "/emotion-island/assets/assets/cards/emotion_15.00c2646ed5aef64000effa66acaaa462.png",
  "/emotion-island/assets/assets/cards/emotion_16.5378d2665adfe1a84c6cff139d7c4ced.png",
  "/emotion-island/assets/assets/cards/emotion_17.32946d45e1fccecc1dbdc3a7ab873080.png",
  "/emotion-island/assets/assets/cards/emotion_18.7a933ff1232ce1883fb0ef6f15b361b5.png",
  "/emotion-island/assets/assets/cards/emotion_19.72a3c343ed269e8d33120de17c3442fa.png",
  "/emotion-island/assets/assets/cards/emotion_2.be5b69e80d45398225444c292826356f.png",
  "/emotion-island/assets/assets/cards/emotion_20.7f7cf6b44c0ce42d22028b06220e0cf6.png",
  "/emotion-island/assets/assets/cards/emotion_21.310086a8fc553c832c5f1acdcfdf8b70.png",
  "/emotion-island/assets/assets/cards/emotion_22.f40ed17c335f32b55aa06a6ccce35bf9.png",
  "/emotion-island/assets/assets/cards/emotion_3.ff5472dd05a04e8157bf200f2787213d.png",
  "/emotion-island/assets/assets/cards/emotion_4.b358567c9a0c0ca205b514928b93c766.png",
  "/emotion-island/assets/assets/cards/emotion_5.a23894542a2ffecebff2df075b103727.png",
  "/emotion-island/assets/assets/cards/emotion_6.b91b74b969e546aebee5f49d050588b3.png",
  "/emotion-island/assets/assets/cards/emotion_7.3eda3949fcb854c905fd561c26da5b4c.png",
  "/emotion-island/assets/assets/cards/emotion_8.be2afb33327ce3bf4a946dea0f5a7e0b.png",
  "/emotion-island/assets/assets/cards/emotion_9.9a1094dd9d6a71c7df8f144d13f12d4b.png",
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
