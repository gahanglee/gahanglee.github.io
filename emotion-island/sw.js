// 情緒島 Service Worker（由 scripts/pwa-postbuild.mjs 在每次建置時產生，請勿直接修改 dist/sw.js）
const BUILD_ID = '110c9aefb7e83c';
const PRECACHE = 'ei-precache-' + BUILD_ID;
const RUNTIME = 'ei-runtime';
const PRECACHE_URLS = [
  "/emotion-island/",
  "/emotion-island/_expo/static/js/web/index-28f840d7a03c93d08ea4d6ba4fb1a085.js",
  "/emotion-island/assets/assets/cards/act_lie.fad072aa7a661e10305b001d607db2c0.png",
  "/emotion-island/assets/assets/cards/ai_b_cheer.f7bfc6270af0df5aff21a4c3072b5058.png",
  "/emotion-island/assets/assets/cards/ai_b_cry.4a84a350b580f78f30f0a6d3fc1e7e67.png",
  "/emotion-island/assets/assets/cards/ai_b_fight.008bbfc7ac5542452e2f1c008697e0df.png",
  "/emotion-island/assets/assets/cards/ai_b_hide.cdc24ad14059a3755889bdf9c2a1d6ad.png",
  "/emotion-island/assets/assets/cards/ai_b_jump.06ccb5620bd18bd0569db06688805508.png",
  "/emotion-island/assets/assets/cards/ai_b_laugh.9cb87e42d4e1169031f6023a053d75ba.png",
  "/emotion-island/assets/assets/cards/ai_b_loud.7a6110f27368df844b303bc26cad6032.png",
  "/emotion-island/assets/assets/cards/ai_b_roll.847ed34a08e90e90a67357fce8234013.png",
  "/emotion-island/assets/assets/cards/ai_b_run.3d9fcf6b70d28a183426b7895703bd49.png",
  "/emotion-island/assets/assets/cards/ai_b_scold.e4e429bec07d8d946d6f00d36719d581.png",
  "/emotion-island/assets/assets/cards/ai_b_scream.6ee5293e693218df4bf47616123c32ea.png",
  "/emotion-island/assets/assets/cards/ai_b_throw.f8c6d31329d27b8a37a5477e9abc3468.png",
  "/emotion-island/assets/assets/cards/ai_s_askadult.546933b0815bd4b0f739dea1ba88e76f.png",
  "/emotion-island/assets/assets/cards/ai_s_bear.d8b605857c1fbb4a255a7ff25f4ca574.png",
  "/emotion-island/assets/assets/cards/ai_s_breathe.fcba7398657b6af34ab4ca90a5c71f87.png",
  "/emotion-island/assets/assets/cards/ai_s_can.16c31376372686ce80f91da8f8c5ba0a.png",
  "/emotion-island/assets/assets/cards/ai_s_count.f7d623be306b60e6a0cb03cf2f6e50d5.png",
  "/emotion-island/assets/assets/cards/ai_s_draw.fe3095bf0aabf79c634c1ab1ea4fb89d.png",
  "/emotion-island/assets/assets/cards/ai_s_eyes.496a87b33fb1a39a5e3392ab1b686586.png",
  "/emotion-island/assets/assets/cards/ai_s_favorite.12eea3e8b307861b94b9f10d82044d51.png",
  "/emotion-island/assets/assets/cards/ai_s_friend.0cce1bfbf365276bc0b0bfdadc08e033.png",
  "/emotion-island/assets/assets/cards/ai_s_funny.c365c4324564e3087ccffe4456e1a36a.png",
  "/emotion-island/assets/assets/cards/ai_s_handchest.d9f0bb394b4dc4861ccc05faeed891e9.png",
  "/emotion-island/assets/assets/cards/ai_s_hug.b3ea40fc7b230cebb7eb2aec1b0b2226.png",
  "/emotion-island/assets/assets/cards/ai_s_hugself.6976e91edaa454d6209b551d222fa043.png",
  "/emotion-island/assets/assets/cards/ai_s_knees.933604bb623b6b4aaf62ceb8ed9bf6e0.png",
  "/emotion-island/assets/assets/cards/ai_s_mindful.bc275041cf8719f161fbf3772a05d030.png",
  "/emotion-island/assets/assets/cards/ai_s_move.8a30c245209184ee21e8c38081081720.png",
  "/emotion-island/assets/assets/cards/ai_s_queue.7a51040cccaafb0be1193ebbaa72fe12.png",
  "/emotion-island/assets/assets/cards/ai_s_read.960c67163174d97483b8e6f4fcbc1728.png",
  "/emotion-island/assets/assets/cards/ai_s_say.651edab3a92d3eb45e334dcb4bf514b4.png",
  "/emotion-island/assets/assets/cards/ai_s_shoulder.77a29168330d689d857aca74ffefb1ba.png",
  "/emotion-island/assets/assets/cards/ai_s_sit.9d8615b695991410a0d0458cdebd0daf.png",
  "/emotion-island/assets/assets/cards/ai_s_sleep.7e555831ea5667034c91d1693143a9c4.png",
  "/emotion-island/assets/assets/cards/ai_s_smile.9ea3a56ed03592faf40384a1c0d3e6e3.png",
  "/emotion-island/assets/assets/cards/ai_s_walk.8b128aab9eaf03821f330e9b30f92c9f.png",
  "/emotion-island/assets/assets/cards/ai_s_water.3d6dbb10940f6485ba27c677492938c7.png",
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
  "/emotion-island/assets/assets/cards/rt_dressed.25e4600d0ff93456a4f59917a91b19b2.png",
  "/emotion-island/assets/assets/cards/rt_hair.0b9d582dd575c41272cdcd0ed857c100.png",
  "/emotion-island/assets/assets/cards/rt_lunch.19d6bc50cf2d965a3308ab16e621cd78.png",
  "/emotion-island/assets/assets/cards/rt_play.6c643dc002e8ac95a6f915fb5d028046.png",
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
