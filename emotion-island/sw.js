// 情緒島 Service Worker（由 scripts/pwa-postbuild.mjs 在每次建置時產生，請勿直接修改 dist/sw.js）
const BUILD_ID = 'c9a43d332604f5';
const PRECACHE = 'ei-precache-' + BUILD_ID;
const RUNTIME = 'ei-runtime';
const PRECACHE_URLS = [
  "/emotion-island/",
  "/emotion-island/_expo/static/js/web/index-1056bf3a961c3119b54d58d4a4da51a3.js",
  "/emotion-island/assets/assets/cards/act_lie.fad072aa7a661e10305b001d607db2c0.png",
  "/emotion-island/assets/assets/cards/ai_a2_chest.116ed336f1b1f7ff847ba1e04c56c310.png",
  "/emotion-island/assets/assets/cards/ai_a2_drink.045243d565c95d4d0d348c639683dfa5.png",
  "/emotion-island/assets/assets/cards/ai_a2_find.24ff4b972becfe491872c5cb9dc2f0ad.png",
  "/emotion-island/assets/assets/cards/ai_a2_flower.a75b6e388b09bd96a9e5096d048bdb3e.png",
  "/emotion-island/assets/assets/cards/ai_a2_hug.4ccf7ab5a983ce01798e4175f107086a.png",
  "/emotion-island/assets/assets/cards/ai_a2_pat.4924966e906d51ae9bed0c0298c84151.png",
  "/emotion-island/assets/assets/cards/ai_a2_shoulder.d1a9c6981571358b95a4f25374cfd2e1.png",
  "/emotion-island/assets/assets/cards/ai_a2_smell.82f0715841707b6635136c1db5784567.png",
  "/emotion-island/assets/assets/cards/ai_a2_stroke.4d96a99f1aad07c08170ff526d5556fb.png",
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
  "/emotion-island/assets/assets/cards/ai_c3_fell.83bee91ff0b3b8c8b9d6d38a40900bbb.png",
  "/emotion-island/assets/assets/cards/ai_c3_momleft.c277d5b61a71b7b0d50be65af542b96b.png",
  "/emotion-island/assets/assets/cards/ai_c3_toybroke.035c88d1fa416e7a4107d9e87ed014bc.png",
  "/emotion-island/assets/assets/cards/ai_e3_birthday.7768c609258becf147d3f760b65e8425.png",
  "/emotion-island/assets/assets/cards/ai_e3_fireworks.a7bd0857ce8d6171ad0fe2698ea7624e.png",
  "/emotion-island/assets/assets/cards/ai_e3_park.cc98c5446b1782a9ef8add0e6e0c4999.png",
  "/emotion-island/assets/assets/cards/ai_f_angry_boy.90595735e19a0185649c26fc0fc02ace.png",
  "/emotion-island/assets/assets/cards/ai_f_angry_girl.ff27de6169b7674c20108e2d20a29fe9.png",
  "/emotion-island/assets/assets/cards/ai_f_bored_boy.381054780eae317169cfc3ee4749a464.png",
  "/emotion-island/assets/assets/cards/ai_f_bored_girl.660a8827da36ebeda23eaf9ad24a171b.png",
  "/emotion-island/assets/assets/cards/ai_f_calm_boy.3d0d09b5d482aa111d57304655f06cdf.png",
  "/emotion-island/assets/assets/cards/ai_f_calm_girl.e8d55147dce8c6008f156696e0e9ce39.png",
  "/emotion-island/assets/assets/cards/ai_f_disgust_boy.73b3660e34536307ffa55294c9eaf9d4.png",
  "/emotion-island/assets/assets/cards/ai_f_disgust_girl.9b6222bf75fb72f9f78a12c8f1585d96.png",
  "/emotion-island/assets/assets/cards/ai_f_excited_boy.079b0053d0a0f0e3c183d4c712e9332b.png",
  "/emotion-island/assets/assets/cards/ai_f_excited_girl.ffa885173ba12b71e03921779d7a87c3.png",
  "/emotion-island/assets/assets/cards/ai_f_fear_boy.29aecba365da050ab64a69d4be28d624.png",
  "/emotion-island/assets/assets/cards/ai_f_fear_girl.be5857893b149b917ca9a201f19964d6.png",
  "/emotion-island/assets/assets/cards/ai_f_happy_boy.2219091dc49b06789a560370dc61c403.png",
  "/emotion-island/assets/assets/cards/ai_f_happy_girl.10a71e7674a5fcbd23d26e916350c4e9.png",
  "/emotion-island/assets/assets/cards/ai_f_sad_boy.e3c92717cabc020da724047502d49402.png",
  "/emotion-island/assets/assets/cards/ai_f_sad_girl.fe8d177401f2dc76e92d8032b194ce28.png",
  "/emotion-island/assets/assets/cards/ai_f_shy_boy.74497c8f0dd674559c63dd483ae40688.png",
  "/emotion-island/assets/assets/cards/ai_f_shy_girl.199531d21975772791802d9dc839a0e9.png",
  "/emotion-island/assets/assets/cards/ai_f_surprise_boy.1c78f216f86b90ab1fdbcd984f0f4edf.png",
  "/emotion-island/assets/assets/cards/ai_f_surprise_girl.e313a81f57150eb47acd03b2fd09af7b.png",
  "/emotion-island/assets/assets/cards/ai_f_worried_boy.ed1e4addd2b5279e17b08aa6f5620766.png",
  "/emotion-island/assets/assets/cards/ai_f_worried_girl.a99bacb98657160e1e309b85a1e2ccf8.png",
  "/emotion-island/assets/assets/cards/ai_fh_angry_boy.637921fdc07943b59c8d21513d0d01ce.png",
  "/emotion-island/assets/assets/cards/ai_fh_angry_girl.fdd61d6535512d34c60195bd9a3447c6.png",
  "/emotion-island/assets/assets/cards/ai_fh_bored_boy.0969fd52608d0cb051e062d7da4510a4.png",
  "/emotion-island/assets/assets/cards/ai_fh_bored_girl.5fdfdf28cc3e4032523d3558494af390.png",
  "/emotion-island/assets/assets/cards/ai_fh_calm_boy.2b95e0dfb6d263ce3c373d3e13128caf.png",
  "/emotion-island/assets/assets/cards/ai_fh_calm_girl.3a985e21fde0acb20914a709437d67ac.png",
  "/emotion-island/assets/assets/cards/ai_fh_disgust_boy.68e0d7a1c1d6b1a6cd717b9502bc56df.png",
  "/emotion-island/assets/assets/cards/ai_fh_disgust_girl.483e9fe0b8877094e645e7ad818eda7e.png",
  "/emotion-island/assets/assets/cards/ai_fh_excited_boy.155eab2bb57ae295e64ab6e9e4298f4c.png",
  "/emotion-island/assets/assets/cards/ai_fh_excited_girl.ee3f88eaf93bbd4f196766cbcee379a5.png",
  "/emotion-island/assets/assets/cards/ai_fh_fear_boy.32f2323e9c70880c467bd67a2d0aec8d.png",
  "/emotion-island/assets/assets/cards/ai_fh_fear_girl.c1ac0df0f34fc55e01310591213e0923.png",
  "/emotion-island/assets/assets/cards/ai_fh_happy_boy.fed8d33cb09aa76a021cc082e06c7b70.png",
  "/emotion-island/assets/assets/cards/ai_fh_happy_girl.47b854fed14eba2d8c83594c119bee87.png",
  "/emotion-island/assets/assets/cards/ai_fh_sad_boy.ed2228c0d44315428132912228a44fb2.png",
  "/emotion-island/assets/assets/cards/ai_fh_sad_girl.c95253afd3b02e73a1c14fb32ce2eade.png",
  "/emotion-island/assets/assets/cards/ai_fh_shy_boy.08c75e59868067fb719e2e2dc55d6758.png",
  "/emotion-island/assets/assets/cards/ai_fh_shy_girl.237d19c2628945ccf5d079a76fc56c16.png",
  "/emotion-island/assets/assets/cards/ai_fh_surprise_boy.5bfa79116ad94778500aab8be9a99fa8.png",
  "/emotion-island/assets/assets/cards/ai_fh_surprise_girl.d89658f633e527a30ed9a6aad792f1c3.png",
  "/emotion-island/assets/assets/cards/ai_fh_worried_boy.270e9d2b3b9d09b6babb023a5d76b294.png",
  "/emotion-island/assets/assets/cards/ai_fh_worried_girl.00d880125275996c3e7578c2a962fc93.png",
  "/emotion-island/assets/assets/cards/ai_h3_hug.29b3e1b5810fd8fdc09fb0ddb8d87675.png",
  "/emotion-island/assets/assets/cards/ai_h3_play.f2bf2a96c28eac12b0c15ba2b158c167.png",
  "/emotion-island/assets/assets/cards/ai_h3_snack.9a3d0512050d559b92f641036a9008e4.png",
  "/emotion-island/assets/assets/cards/ai_n3_newplace.626a597e678cfb547507f2c1efda8d0b.png",
  "/emotion-island/assets/assets/cards/ai_n3_shot.10b49826550d7b99114c81e8489c958c.png",
  "/emotion-island/assets/assets/cards/ai_n3_stage.ccf9a7f8b6ed4f25dd9d497bd52b6d63.png",
  "/emotion-island/assets/assets/cards/ai_o2_bear.c9f7d40081029506da6d6a78b0a11d67.png",
  "/emotion-island/assets/assets/cards/ai_o2_water.3f5b7789e7a137e9b012ff9001b6ffc9.png",
  "/emotion-island/assets/assets/cards/ai_p3_blocks.29b81706ec86024387df946a504eef35.png",
  "/emotion-island/assets/assets/cards/ai_p3_cut.b04071df69ddb2733a38b951de330c98.png",
  "/emotion-island/assets/assets/cards/ai_p3_toytaken.5860cfdabce99d8e4154fbd38c38af1d.png",
  "/emotion-island/assets/assets/cards/ai_r2_breakfast.d94fb77b99926cd05829bb6b37793940.png",
  "/emotion-island/assets/assets/cards/ai_r2_dressed.0986f2fe1ad7a2f474b149fdd1504a1b.png",
  "/emotion-island/assets/assets/cards/ai_r2_hair.af9137b1d3782ebf6a16c4ff656fc465.png",
  "/emotion-island/assets/assets/cards/ai_r2_lunch.7c9a82c57b34d6891e280108a518ab6b.png",
  "/emotion-island/assets/assets/cards/ai_r2_play.c27f90b4f8bb4b045ee44f927c01b031.png",
  "/emotion-island/assets/assets/cards/ai_r2_school.f6ff01d71e5961b8302af651cb9b2438.png",
  "/emotion-island/assets/assets/cards/ai_r2_teeth.725a945470087061f657192e9114c620.png",
  "/emotion-island/assets/assets/cards/ai_r2_wake.7b04bcccfd86d40a39898220da816b7e.png",
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
  "/emotion-island/assets/assets/cards/ai_s_unknown.98333e95d0b36924b7f0ee7b00bdb212.png",
  "/emotion-island/assets/assets/cards/ai_s_walk.8b128aab9eaf03821f330e9b30f92c9f.png",
  "/emotion-island/assets/assets/cards/ai_s_water.3d6dbb10940f6485ba27c677492938c7.png",
  "/emotion-island/assets/assets/cards/ai_w2_cry.911d432eff20a0bd5d91bc335672482b.png",
  "/emotion-island/assets/assets/cards/ai_w2_friend.414c66fbfdd1f1e8bf2cde7ae650dfd2.png",
  "/emotion-island/assets/assets/cards/ai_w2_jump.17fb98fc7d6263d4d270ea4b2a2ee665.png",
  "/emotion-island/assets/assets/cards/ai_w2_laugh.4bb01dc4e2061a33faaaa0ee4bd0d87a.png",
  "/emotion-island/assets/assets/cards/ai_w2_me.47e3fd23adcdb6202d1cab13e9eb98b6.png",
  "/emotion-island/assets/assets/cards/ai_w2_mom.73255f4cf4a51759acbab1f7a703e1aa.png",
  "/emotion-island/assets/assets/cards/ai_w2_rest.b993600654194079456ed787eaaeb0f3.png",
  "/emotion-island/assets/assets/cards/ai_w2_shake.6a0df5602812211468aad3831b0645b4.png",
  "/emotion-island/assets/assets/cards/ai_w2_stomp.19ea5e9165fd0ca659316dd4b00e0c98.png",
  "/emotion-island/assets/assets/cards/ai_w2_teacher.0f3cbba9c5ab0ca545bda55297088c0c.png",
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
