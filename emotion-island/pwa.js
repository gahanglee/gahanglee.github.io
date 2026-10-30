/* 情緒島 PWA：安裝提示、新版提示、離線提示、全螢幕 */
(function () {
  var standalone = window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches || window.navigator.standalone === true;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var css =
    '.ei-bar{position:fixed;left:0;right:0;margin:0 auto;width:fit-content;max-width:calc(100vw - 24px);top:calc(12px + env(safe-area-inset-top));z-index:99999;display:flex;align-items:center;gap:.6rem;padding:.65rem .7rem .65rem 1rem;border-radius:18px;background:#0B5C73;color:#fff;font:600 15px/1.45 system-ui,-apple-system,"Noto Sans TC","PingFang TC",sans-serif;box-shadow:0 10px 30px rgba(11,92,115,.35);animation:eiUp .3s ease}' +
    '.ei-bar p{margin:0}.ei-bar button{flex:none;border:none;border-radius:99px;padding:.45rem .95rem;font:inherit;font-weight:800;cursor:pointer}' +
    '.ei-go{background:#FFD45E;color:#0B5C73}.ei-x{background:transparent;color:#BDEAFB;padding:.45rem .5rem!important}' +
    '.ei-bar button:focus-visible,.ei-fs:focus-visible{outline:3px solid #FFD45E;outline-offset:2px}' +
    '.ei-fs{position:fixed;bottom:calc(10px + env(safe-area-inset-bottom));right:10px;z-index:99998;width:40px;height:40px;border:none;border-radius:12px;background:rgba(255,255,255,.85);color:#0B5C73;font-size:18px;cursor:pointer;box-shadow:0 4px 12px rgba(11,92,115,.2)}' +
    '@keyframes eiUp{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}' +
    '@media (prefers-reduced-motion:reduce){.ei-bar{animation:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var current = null;
  function bar(text, goText, onGo, onClose) {
    if (current) current.remove();
    var el = document.createElement('div');
    el.className = 'ei-bar'; el.setAttribute('role', 'status');
    el.innerHTML = '<p></p>' + (goText ? '<button type="button" class="ei-go"></button>' : '') +
      '<button type="button" class="ei-x" aria-label="關閉">✕</button>';
    el.querySelector('p').textContent = text;
    if (goText) {
      var go = el.querySelector('.ei-go'); go.textContent = goText;
      go.addEventListener('click', function () { el.remove(); current = null; onGo && onGo(); });
    }
    el.querySelector('.ei-x').addEventListener('click', function () { el.remove(); current = null; onClose && onClose(); });
    document.body.appendChild(el); current = el;
  }

  /* 新版提示 */
  // sw.js 與本檔放在同一層，App 部署在子路徑時也能找到
  var swUrl = document.currentScript ? new URL('sw.js', document.currentScript.src).href : '/sw.js';
  if ('serviceWorker' in navigator) {
    var refreshing = false, pendingReload = false, openedAt = Date.now();
    var hadController = !!navigator.serviceWorker.controller;   // 第一次安裝時沒有舊版，不需要重新整理
    function reloadNow() { if (refreshing) return; refreshing = true; location.reload(); }
    // 新版接手後：剛開啟 App（15 秒內）就直接重新整理；使用到一半則先提示，並在離開／回到畫面時自動換新，不打斷孩子操作
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!hadController) { hadController = true; return; }
      if (Date.now() - openedAt < 15000) { reloadNow(); return; }
      pendingReload = true;
      bar('🏝️ 情緒島已更新到新版本', '立即更新', reloadNow);
    });
    document.addEventListener('visibilitychange', function () { if (pendingReload) reloadNow(); });
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(swUrl).then(function (reg) {
        // 舊版（還沒有自動更新功能的 sw.js）卡在「等待」時，直接叫它接手
        if (reg.waiting && navigator.serviceWorker.controller) reg.waiting.postMessage('SKIP_WAITING');
        reg.update();
        document.addEventListener('visibilitychange', function () { if (!document.hidden) reg.update(); });
        setInterval(function () { reg.update(); }, 60 * 60 * 1000);
      }).catch(function () {});
    });
  }

  /* 安裝提示：關閉後 7 天內不再出現 */
  var snoozed = Number(store.get('ei-install-snooze') || 0) > Date.now();
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (standalone || snoozed) return;
    setTimeout(function () {
      bar('📲 把情緒島安裝到桌面，下次點圖示就能開', '安裝', function () {
        if (!deferred) return; deferred.prompt(); deferred = null;
      }, function () { store.set('ei-install-snooze', String(Date.now() + 7 * 864e5)); });
    }, 2000);
  });
  window.addEventListener('appinstalled', function () { if (current) current.remove(); current = null; });

  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios && !standalone && !snoozed) {
    setTimeout(function () {
      bar('想安裝情緒島？在 Safari 按「分享」⬆︎，再選「加入主畫面」', null, null,
        function () { store.set('ei-install-snooze', String(Date.now() + 7 * 864e5)); });
    }, 2500);
  }

  /* 離線提示 */
  window.addEventListener('offline', function () { bar('📴 目前沒有網路：可以繼續看卡片與練習，但登入和作答紀錄要等網路恢復'); });
  window.addEventListener('online', function () { bar('✅ 網路恢復了'); setTimeout(function () { if (current) current.remove(); current = null; }, 2500); });

  /* 全螢幕：已安裝在電腦上時提供切換按鈕（手機安裝後本來就是全螢幕） */
  var root = document.documentElement;
  var desktop = window.matchMedia('(pointer: fine)').matches;
  if (standalone && desktop && (root.requestFullscreen || root.webkitRequestFullscreen)) {
    window.addEventListener('load', function () {
      var fs = document.createElement('button');
      fs.type = 'button'; fs.className = 'ei-fs'; fs.setAttribute('aria-label', '切換全螢幕'); fs.textContent = '⛶';
      fs.addEventListener('click', function () {
        if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        else (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
      });
      document.body.appendChild(fs);
    });
  }
})();
