/* Home navigation snippet
   Paste into other dept pages (e.g., near end of <body>) to add a floating Home button
   that uses the same overlay animation before redirecting back to home.html.
*/
(function(){
  const btn = document.createElement('button');
  btn.textContent = 'Home';
  btn.setAttribute('aria-label','Back to Home');
  Object.assign(btn.style,{position:'fixed',right:'18px',bottom:'18px',padding:'10px 14px',borderRadius:'12px',background:'linear-gradient(90deg,#ff1744,#ff6b9d)',color:'#fff',border:'none',fontWeight:800,boxShadow:'0 8px 24px rgba(0,0,0,0.5)',cursor:'pointer',zIndex:99999});
  document.body.appendChild(btn);

  // create simple overlay if not present
  let overlay = document.getElementById('ptOverlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'ptOverlay';
    Object.assign(overlay.style,{position:'fixed',inset:0,display:'grid',placeItems:'center',background:'radial-gradient(circle at center, rgba(255,23,68,0.12), rgba(0,0,0,0.85))',zIndex:99998,opacity:0,transition:'opacity .45s ease',pointerEvents:'none'});
    const spinner = document.createElement('div');
    Object.assign(spinner.style,{width:'100px',height:'100px',borderRadius:'50%',background:'conic-gradient(rgba(255,23,68,0.9), rgba(41,121,255,0.7))',filter:'blur(6px)'});
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);
  }

  let navigating=false;
  function goHome(){ if(navigating) return; navigating=true; overlay.style.opacity=1; overlay.style.pointerEvents='auto'; setTimeout(()=>{ window.location.href='home.html'; },420); }
  btn.addEventListener('click',goHome);

  // optional keyboard shortcut: H to go home
  document.addEventListener('keydown',e=>{ if(e.key==='h' || e.key==='H') goHome(); });
})();
