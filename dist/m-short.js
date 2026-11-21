/* 위즈웹 모듈: 모바일 짧은 길 (m-short) v1 — 설명은 m-short.css 맨 위 */
(function(){
  var main=document.querySelector('main[data-mshort]');if(!main)return;
  var mq=matchMedia('(max-width:900px)');

  /* 1) 더 알아보기 묶음: 접히는 섹션마다 제목 버튼 */
  var folds=[].slice.call(main.querySelectorAll(':scope>[data-m="fold"]'));
  folds.forEach(function(sec,i){
    var inner=sec.querySelector('.wrap')||sec;inner.classList.add('m-fold-in');
    var st=sec.querySelector('.sec-title'),ln=st?[].map.call(st.querySelectorAll('.ln'),function(x){return x.textContent.trim();}):[];
    var t=sec.getAttribute('data-m-title')||(ln.length?ln.join(' '):(st?st.textContent:'')).replace(/\s+/g,' ').trim();
    var sub=sec.getAttribute('data-m-sub')||'';
    var b=document.createElement('button');b.type='button';b.className='m-fold-btn';b.setAttribute('aria-expanded','false');
    b.innerHTML='<span><b></b>'+(sub?'<small></small>':'')+'</span><i aria-hidden="true"></i>';
    b.querySelector('b').textContent=t;if(sub)b.querySelector('small').textContent=sub;
    b.addEventListener('click',function(){var o=sec.classList.toggle('m-open');b.setAttribute('aria-expanded',o);
      if(o&&typeof window.gtag==='function')window.gtag('event','m_fold_open',{section:sec.id||t});});
    inner.insertBefore(b,inner.firstChild);
    if(i===0&&main.getAttribute('data-m-fold-head')){var h=document.createElement('p');h.className='m-fold-head';h.textContent=main.getAttribute('data-m-fold-head');
      h.setAttribute('data-m-order',sec.getAttribute('data-m-order')||'');h.style.order=sec.getAttribute('data-m-order')||'';main.insertBefore(h,sec);}
  });
  /* 주소의 #으로 접힌 섹션에 들어오면 펼침 (메뉴·안내서 링크) */
  function openHash(){var id=location.hash.slice(1);if(!id)return;var el=document.getElementById(id);if(!el)return;
    var sec=el.closest('[data-m="fold"]');if(sec&&!sec.classList.contains('m-open')){sec.classList.add('m-open');var b=sec.querySelector('.m-fold-btn');if(b)b.setAttribute('aria-expanded','true');}}
  addEventListener('hashchange',openHash);openHash();
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(a)setTimeout(openHash,0);});

  /* 2) 글 줄이기 + 더 보기 */
  function clamp(){[].forEach.call(main.querySelectorAll('[data-m-clamp]'),function(el){
    el.style.setProperty('--mc',el.getAttribute('data-m-clamp')||3);
    if(el.nextElementSibling&&el.nextElementSibling.classList.contains('m-more'))return;
    if(!mq.matches||el.scrollHeight<=el.clientHeight+2)return;
    var b=document.createElement('button');b.type='button';b.className='m-more';b.textContent='더 보기';
    b.addEventListener('click',function(){var o=el.classList.toggle('m-open');b.textContent=o?'접기':'더 보기';});
    el.parentNode.insertBefore(b,el.nextSibling);});}
  if(document.readyState==='complete')clamp();else addEventListener('load',clamp);

  /* 3) 하단 띠: 첫 화면·상담 칸이 보이는 동안 숨김 */
  if('IntersectionObserver' in window){var seen=new Set();
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?seen.add(e.target):seen.delete(e.target);});
      document.body.classList.toggle('m-bar-off',mq.matches&&seen.size>0);},{rootMargin:'0px 0px -35% 0px'});
    [].forEach.call(document.querySelectorAll('[data-m-bar-off]'),function(el){io.observe(el);});}
})();
