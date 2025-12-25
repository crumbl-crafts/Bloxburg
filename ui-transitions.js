(function(){
  // ui-transitions.js — injects lightweight CSS and exposes premium promo + cookie banner APIs
  if(window.__ui_transitions_loaded) return; window.__ui_transitions_loaded = true;

  const css = `
  /* Premium promo */
  .promo-wrap{position:fixed;top:18px;left:50%;transform:translateX(-50%) translateY(-8px);z-index:99997;pointer-events:none}
  .promo-card{pointer-events:auto;min-width:320px;max-width:760px;padding:14px 18px;border-radius:14px;background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.06);box-shadow:0 12px 40px rgba(0,0,0,0.6);backdrop-filter:blur(12px) saturate(1.05);display:flex;align-items:center;gap:12px;transform-origin:top center;}
  .promo-card .media{width:64px;height:64px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg, rgba(255,23,68,0.16), rgba(41,121,255,0.06));font-size:28px}
  .promo-card .content{flex:1}
  .promo-card .title{font-weight:800;margin:0 0 4px 0}
  .promo-card .body{color:rgba(255,255,255,0.82);font-size:0.95rem;margin:0}
  .promo-card .cta{margin-left:12px;padding:8px 12px;border-radius:10px;border:none;background:linear-gradient(90deg,#ff6b9d,#ff1744);color:#fff;font-weight:800;cursor:pointer}
  @keyframes promoIn{from{opacity:0;transform:translateX(-50%) translateY(-18px) scale(.98)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}
  @keyframes promoOut{from{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}to{opacity:0;transform:translateX(-50%) translateY(-12px) scale(.98)}}
  .promo-wrap.show{pointer-events:auto;animation:promoIn .36s cubic-bezier(.2,.9,.2,1) both}
  .promo-wrap.hide{animation:promoOut .28s ease both}

  /* Cookie banner */
  .cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:1100px;margin:0 auto;z-index:99999;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:linear-gradient(180deg, rgba(20,24,32,0.92), rgba(20,24,32,0.86));border:1px solid rgba(255,255,255,0.04);box-shadow:0 14px 48px rgba(0,0,0,0.6);backdrop-filter:blur(8px);opacity:0;transform:translateY(12px);transition:opacity .28s ease,transform .28s ease}
  .cookie-banner.show{opacity:1;transform:translateY(0)}
  .cookie-banner .cb-text{flex:1;color:var(--muted,#c4cbdc)}
  .cookie-banner .cb-actions{display:flex;gap:8px}
  .cb-btn{padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:var(--muted,#fff);cursor:pointer}
  .cb-btn.primary{background:linear-gradient(90deg,#ffd27a,#ff6b9d);color:#000;border:none}
  `;

  const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  // Create containers
  const promoWrap = document.createElement('div'); promoWrap.className = 'promo-wrap'; promoWrap.setAttribute('aria-hidden','true'); document.body.appendChild(promoWrap);
  const cookie = document.createElement('div'); cookie.className = 'cookie-banner'; cookie.setAttribute('role','dialog'); cookie.setAttribute('aria-live','polite'); cookie.innerHTML = `
    <div class="cb-text">We use minimal cookies for essential functionality and analytics. By continuing you accept this usage.</div>
    <div class="cb-actions"><button class="cb-btn" id="cbManage">Manage</button><button class="cb-btn primary" id="cbAccept">Accept</button></div>
  `; document.body.appendChild(cookie);

  // Promo API
  function showPremiumPromo(opts={title:'Premium',body:'Upgrade for perks',icon:'⭐',cta:'Learn',duration:6000}){
    promoWrap.innerHTML = '';
    const card = document.createElement('div'); card.className='promo-card'; card.innerHTML = `<div class="media">${opts.icon||'⭐'}</div><div class="content"><div class="title">${opts.title}</div><div class="body">${opts.body}</div></div><button class="cta">${opts.cta||'Learn'}</button>`;
    promoWrap.appendChild(card);
    promoWrap.classList.remove('hide'); promoWrap.classList.add('show'); promoWrap.setAttribute('aria-hidden','false');
    const btn = card.querySelector('.cta'); if(btn) btn.addEventListener('click', ()=>{ if(opts.onClick) opts.onClick(); hidePremiumPromo(); });
    if(opts.duration && opts.duration>0){ setTimeout(()=>{ hidePremiumPromo(); }, opts.duration); }
  }
  function hidePremiumPromo(){ if(!promoWrap.classList.contains('show')) return; promoWrap.classList.remove('show'); promoWrap.classList.add('hide'); setTimeout(()=>{ promoWrap.innerHTML=''; promoWrap.classList.remove('hide'); promoWrap.setAttribute('aria-hidden','true'); }, 360); }

  // Cookie banner
  function showCookieBanner(){ if(localStorage.getItem('cc_cookie_accepted')) return; cookie.classList.add('show'); }
  function hideCookieBanner(){ cookie.classList.remove('show'); localStorage.setItem('cc_cookie_accepted','1'); }
  cookie.querySelector('#cbAccept').addEventListener('click', ()=>{ hideCookieBanner(); });
  cookie.querySelector('#cbManage').addEventListener('click', ()=>{ try{ window.location.href='#privacy'; }catch(e){} });

  // Auto show after short delay if not accepted
  setTimeout(()=>{ showCookieBanner(); }, 800);

  // expose API
  window.UITransitions = { showPremiumPromo, hidePremiumPromo, showCookieBanner, hideCookieBanner };
})();
