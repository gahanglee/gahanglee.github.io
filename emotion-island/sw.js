// 情緒島 Service Worker（由 scripts/pwa-postbuild.mjs 在每次建置時產生，請勿直接修改 dist/sw.js）
const BUILD_ID = '0e94dbc2742776';
const PRECACHE = 'ei-precache-' + BUILD_ID;
const RUNTIME = 'ei-runtime';
const PRECACHE_URLS = [
  "/emotion-island/",
  "/emotion-island/_expo/static/js/web/index-b6f194b31939c7931f3c590a198ec101.js",
  "/emotion-island/assets/assets/cards/act_ask.5e8665adc838b3f862b71c056bae9a9e.png",
  "/emotion-island/assets/assets/cards/act_breathe.c7bea7f2639b0b347803fdb2f2b688d5.png",
  "/emotion-island/assets/assets/cards/act_cheer.b3ad944c86713ac3cc018dd9bbb3598d.png",
  "/emotion-island/assets/assets/cards/act_covereyes.8e0c44fd73c3710600bf33170e4196b4.png",
  "/emotion-island/assets/assets/cards/act_cry.29745d1eb349a1c79c74f7468df0237b.png",
  "/emotion-island/assets/assets/cards/act_drink.9ec8808aa38216c83488b92137814f0a.png",
  "/emotion-island/assets/assets/cards/act_fight.995fde258fccacd74fc3d810e5d26918.png",
  "/emotion-island/assets/assets/cards/act_handchest.faba619209501e212d8a47cb37eba0a6.png",
  "/emotion-island/assets/assets/cards/act_hide.b014f5be78b7d031ad251762f1c6ae0b.png",
  "/emotion-island/assets/assets/cards/act_hugbear.4958933a475457b3069b3a40afc1bbec.png",
  "/emotion-island/assets/assets/cards/act_hugknees.a39fb616eb461723c0bb5cfc141466cb.png",
  "/emotion-island/assets/assets/cards/act_hugself.d33c8b772f7a56493e158fa605cb08b4.png",
  "/emotion-island/assets/assets/cards/act_jump.a7b24a483905f2607c2f29d4f764c96e.png",
  "/emotion-island/assets/assets/cards/act_laugh.76a1a5242e1ef271459dacf83e49d406.png",
  "/emotion-island/assets/assets/cards/act_lie.da3c0c442661cf95442b054d3e8e9587.png",
  "/emotion-island/assets/assets/cards/act_loud.2a401ff3f938c460f707146dfb2f9263.png",
  "/emotion-island/assets/assets/cards/act_queue.b1dae410a064c7102bf76a086e2e4097.png",
  "/emotion-island/assets/assets/cards/act_roll.9d7db734bd2fd4d6e9b4918166d69d08.png",
  "/emotion-island/assets/assets/cards/act_run.47a376d77a8868b324abf52b8297511d.png",
  "/emotion-island/assets/assets/cards/act_scold.c010629ae2c549398641538a718ee930.png",
  "/emotion-island/assets/assets/cards/act_scream.58398e4d240175160f5bf46934c48c57.png",
  "/emotion-island/assets/assets/cards/act_shoulder.377fad0481d227366a8f68dd93f0942f.png",
  "/emotion-island/assets/assets/cards/act_stretch.e33a22caaaf77740c32f1ac1815159e1.png",
  "/emotion-island/assets/assets/cards/act_tell.83c7703a3fce3cf2c7fed827868aa4df.png",
  "/emotion-island/assets/assets/cards/act_throw.62de655c5249a20115f1a8d740b228a3.png",
  "/emotion-island/assets/assets/cards/ai_askadult.4d1f992108da4ade0444fa6c7b5f2d55.png",
  "/emotion-island/assets/assets/cards/ai_breathe.5f38b86225cbf0834f139748433c3552.png",
  "/emotion-island/assets/assets/cards/ai_exercise.481c8ae7ef4d181e4ef9a306abfa09c9.png",
  "/emotion-island/assets/assets/cards/ai_favorite.a0275dbb8df37b6a27974fc07923115e.png",
  "/emotion-island/assets/assets/cards/ai_friend.2719aa867a3308fc36b74eb1a76222ab.png",
  "/emotion-island/assets/assets/cards/ai_funny.5d92b9a4a87c4dccce3f5ce9bc1d04d8.png",
  "/emotion-island/assets/assets/cards/ai_hug.3f64a9847e207904f465b0934daae0e4.png",
  "/emotion-island/assets/assets/cards/ai_humor.f18ae71db435f14be0d3d5d6dd8a95b5.png",
  "/emotion-island/assets/assets/cards/ai_mindful.0f220204d771a10b490e36e3d1d2e759.png",
  "/emotion-island/assets/assets/cards/ai_say.133b4da21d09170bf37b7824911f6182.png",
  "/emotion-island/assets/assets/cards/ai_sleep.6914a7cd96827c1a04a7f40fc931772c.png",
  "/emotion-island/assets/assets/cards/ai_walk.56f0aace1293b768c581d699c34c2bc3.png",
  "/emotion-island/assets/assets/cards/ai_warmdrink.77b10567e2f909fe9b4b3481017ce6e8.png",
  "/emotion-island/assets/assets/cards/body_angry_boy.d8b99bda8f9e41889b65397e17f2f6b7.png",
  "/emotion-island/assets/assets/cards/body_angry_girl.a0c7bb980f9273025d1c82bb5c38cd92.png",
  "/emotion-island/assets/assets/cards/body_bored_boy.c43fa50d474b63bfc12bc4d054cc8295.png",
  "/emotion-island/assets/assets/cards/body_bored_girl.d0889dbd320585df5c6a4da367d09541.png",
  "/emotion-island/assets/assets/cards/body_calm_boy.ecbf0e9de2d6d42559bd7a07cfe25127.png",
  "/emotion-island/assets/assets/cards/body_calm_girl.69495829550edf40412fab161456c4be.png",
  "/emotion-island/assets/assets/cards/body_disgust_boy.0d16aab17d96390b07f7cf3e3f8006eb.png",
  "/emotion-island/assets/assets/cards/body_disgust_girl.f6571075b5e5c69feb759347ccd2e145.png",
  "/emotion-island/assets/assets/cards/body_excited_boy.75ef1776801a53f68165717931831b00.png",
  "/emotion-island/assets/assets/cards/body_excited_girl.1d8bba6e0b14d1b331dd2e021659bdfa.png",
  "/emotion-island/assets/assets/cards/body_fear_boy.d37ada9b238ad02f3d5b6f5f2b993e1b.png",
  "/emotion-island/assets/assets/cards/body_fear_girl.0bfc1b59e2bb563d4a52df2c7055c843.png",
  "/emotion-island/assets/assets/cards/body_joy_boy.10dadbd3b407809e347f4f4b8f81cbb4.png",
  "/emotion-island/assets/assets/cards/body_joy_girl.6dfb197ea959b29de86182f4bd0fcbc8.png",
  "/emotion-island/assets/assets/cards/body_sad_boy.6c57533c5f0cbd1877fa2e1bf5fa457a.png",
  "/emotion-island/assets/assets/cards/body_sad_girl.49c86c6ff31b537a079f7ad9fa849bb5.png",
  "/emotion-island/assets/assets/cards/body_shy_boy.0e2d8329774d234121a2da3c021c62ce.png",
  "/emotion-island/assets/assets/cards/body_shy_girl.5692251422c4cb72b8b16c59ece64c03.png",
  "/emotion-island/assets/assets/cards/body_surprise_boy.2729d93814a2cf9400387cd6ea725137.png",
  "/emotion-island/assets/assets/cards/body_surprise_girl.0a747ef1ae6a6fb95aa9cb912e69620e.png",
  "/emotion-island/assets/assets/cards/body_worried_boy.0d1ce1f44d7396a328b360bff71a8982.png",
  "/emotion-island/assets/assets/cards/body_worried_girl.4b16e86853d144afde74b876224fb85a.png",
  "/emotion-island/assets/assets/cards/rt_breakfast.40e87cd96f13177dd70d6a90afcb71f2.png",
  "/emotion-island/assets/assets/cards/rt_corner.9cb644b4e33cb082958159680359dae2.png",
  "/emotion-island/assets/assets/cards/rt_count.a367c2e381fb5912e2f9c0bfb09976da.png",
  "/emotion-island/assets/assets/cards/rt_draw.876d044a522f753a3de42653e7390037.png",
  "/emotion-island/assets/assets/cards/rt_dressed.25e4600d0ff93456a4f59917a91b19b2.png",
  "/emotion-island/assets/assets/cards/rt_hair.0b9d582dd575c41272cdcd0ed857c100.png",
  "/emotion-island/assets/assets/cards/rt_lunch.19d6bc50cf2d965a3308ab16e621cd78.png",
  "/emotion-island/assets/assets/cards/rt_play.6c643dc002e8ac95a6f915fb5d028046.png",
  "/emotion-island/assets/assets/cards/rt_read.b536763ae9fbe949c90c67e53798616b.png",
  "/emotion-island/assets/assets/cards/rt_school.17b779fc3d5d091cc1cc9c2c4f0e1811.png",
  "/emotion-island/assets/assets/cards/rt_teeth.23d5f8097c2212cec8912313b5bc7592.png",
  "/emotion-island/assets/assets/cards/rt_wake.db8c3dd8d4e42870fd95c8abfd01130b.png",
  "/emotion-island/assets/assets/cards/scene_blocks.032ee6af72114717109636ba9b566533.png",
  "/emotion-island/assets/assets/cards/scene_tug.905eff7b7beaee9f4255987ccfb364e3.png",
  "/emotion-island/assets/assets/cards/sit_ball.00f234cc77257cab4ebae04277756351.png",
  "/emotion-island/assets/assets/cards/sit_blame.1cbebfdc9213eedc4136209da169b74c.png",
  "/emotion-island/assets/assets/cards/sit_blocks.362ff63edac235b3134d2e0654df0baa.png",
  "/emotion-island/assets/assets/cards/sit_draw.5214efaab7a5181b9d947b0e799d76fa.png",
  "/emotion-island/assets/assets/cards/sit_game.d628c05dfc52664c07618e612e0efea2.png",
  "/emotion-island/assets/assets/cards/sit_night.b3c8f3f15553574411f8695efd00f2a5.png",
  "/emotion-island/assets/assets/cards/sit_prank.6610eedab207e24b6f9f90306b762b93.png",
  "/emotion-island/assets/assets/cards/sit_prize.0ce461a5df22f72dc3962fd22987ca13.png",
  "/emotion-island/assets/assets/cards/sit_rush.7b4adaa747ef1e88550b25044ddf7e27.png",
  "/emotion-island/assets/assets/cards/sit_school.111209e4ac0ca4053b9f9d0b40359232.png",
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
