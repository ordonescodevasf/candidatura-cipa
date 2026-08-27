(()=>{const SITE_URL='https://ordonescodevasf.github.io/candidatura-cipa/';const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const toast=(msg)=>{const t=$('.toast');if(!t)return;t.textContent=msg;t.classList.add('is-visible');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('is-visible'),2200)};
const menu=$('.menu-toggle'),nav=$('.main-nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}));}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.1});$$('.reveal:not(.is-visible)').forEach(el=>io.observe(el));
addEventListener('scroll',()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;$('.scroll-progress span').style.width=(max?scrollY/max*100:0)+'%'},{passive:true});
$$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{const f=btn.dataset.filter;$$('[data-filter]').forEach(b=>{b.classList.toggle('is-active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});$$('.proposal-card').forEach(card=>card.hidden=!(f==='all'||card.dataset.axis===f));}));
const share=async()=>{const data={title:'Antonio Ordones | CIPA Codevasf',text:'Antonio Ordones para a CIPA da Codevasf. Inovar para proteger. Dialogar para construir. Conheça as propostas:',url:SITE_URL};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(SITE_URL);toast('Link copiado!')}}catch(e){if(e.name!=='AbortError')toast('Não foi possível compartilhar.')}};$$('[data-share]').forEach(b=>b.addEventListener('click',share));
const copyBtn=$('[data-copy-share]');if(copyBtn)copyBtn.addEventListener('click',async()=>{const text=$('[data-share-text]').textContent.trim();try{await navigator.clipboard.writeText(text);toast('Mensagem copiada!')}catch(e){toast('Selecione e copie a mensagem acima.')}});
const scroller=$('[data-carousel]');if(scroller){$('[data-carousel-prev]')?.addEventListener('click',()=>scroller.scrollBy({left:-340,behavior:'smooth'}));$('[data-carousel-next]')?.addEventListener('click',()=>scroller.scrollBy({left:340,behavior:'smooth'}));}
const start=new Date('2026-09-10T00:00:00-03:00'),end=new Date('2026-09-12T00:00:00-03:00');const els={d:$('[data-days]'),h:$('[data-hours]'),m:$('[data-minutes]'),s:$('[data-seconds]'),title:$('[data-countdown-title]'),note:$('[data-countdown-note]')};
function tick(){const now=new Date();let target=start;if(now>=start&&now<end){target=end;els.title.textContent='A votação está aberta';els.note.textContent='Vote pela intranet até 23h59 de 11 de setembro.'}else if(now>=end){[els.d,els.h,els.m,els.s].forEach(x=>x.textContent='00');els.title.textContent='Votação encerrada';els.note.textContent='Acompanhe a divulgação oficial do resultado pelos canais internos.';return}else{els.title.textContent='Faltam poucos dias para votar';els.note.textContent='A eleição será realizada no ambiente da intranet.'}let ms=Math.max(0,target-now),d=Math.floor(ms/86400000);ms-=d*86400000;let h=Math.floor(ms/3600000);ms-=h*3600000;let m=Math.floor(ms/60000);ms-=m*60000;let s=Math.floor(ms/1000);els.d.textContent=String(d).padStart(2,'0');els.h.textContent=String(h).padStart(2,'0');els.m.textContent=String(m).padStart(2,'0');els.s.textContent=String(s).padStart(2,'0');}
tick();setInterval(tick,1000);
})();

(()=>{
  const topBtn=document.querySelector('[data-back-to-top]');
  const accessBtn=document.querySelector('[data-accessibility-toggle]');
  const panel=document.getElementById('accessibility-panel');
  const closeBtn=document.querySelector('[data-accessibility-close]');
  const optionBtns=[...document.querySelectorAll('[data-a11y]')];
  const resetBtn=document.querySelector('[data-a11y-reset]');
  const key='antonio-cipa-a11y';
  const classes={contrast:'a11y-high-contrast',links:'a11y-highlight-links',motion:'a11y-reduce-motion'};
  let prefs={contrast:false,links:false,motion:false};
  try{prefs={...prefs,...JSON.parse(localStorage.getItem(key)||'{}')}}catch(e){}
  const apply=()=>{
    Object.entries(classes).forEach(([name,cls])=>document.body.classList.toggle(cls,!!prefs[name]));
    optionBtns.forEach(btn=>btn.setAttribute('aria-pressed',String(!!prefs[btn.dataset.a11y])));
    try{localStorage.setItem(key,JSON.stringify(prefs))}catch(e){}
  };
  apply();
  if(topBtn){
    const syncTop=()=>{topBtn.hidden=window.scrollY<420};
    syncTop();
    window.addEventListener('scroll',syncTop,{passive:true});
    topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:document.body.classList.contains('a11y-reduce-motion')?'auto':'smooth'}));
  }
  const setPanel=open=>{
    if(!panel||!accessBtn)return;
    panel.hidden=!open;
    accessBtn.setAttribute('aria-expanded',String(open));
    if(open){const first=panel.querySelector('button');if(first)first.focus()}
  };
  if(accessBtn)accessBtn.addEventListener('click',()=>setPanel(accessBtn.getAttribute('aria-expanded')!=='true'));
  if(closeBtn)closeBtn.addEventListener('click',()=>{setPanel(false);accessBtn&&accessBtn.focus()});
  optionBtns.forEach(btn=>btn.addEventListener('click',()=>{const name=btn.dataset.a11y;prefs[name]=!prefs[name];apply()}));
  if(resetBtn)resetBtn.addEventListener('click',()=>{prefs={contrast:false,links:false,motion:false};apply()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel&&!panel.hidden){setPanel(false);accessBtn&&accessBtn.focus()}});
  document.addEventListener('click',e=>{if(panel&&!panel.hidden&&!panel.contains(e.target)&&accessBtn&&!accessBtn.contains(e.target))setPanel(false)});
})();

