/* 채무 안내서(/guide/) 하단 상담 띠 + GA 이벤트 — scripts/inject-guide.py 가 넣음 */
(function(){
  var TEL='010-5094-3679',page=location.pathname;
  var bar=document.createElement('div');bar.className='rbcta';bar.setAttribute('role','region');bar.setAttribute('aria-label','상담 바로가기');
  bar.innerHTML='<p class="rbcta-t"><b>내 상황은 어떤지 궁금하다면</b>매니저가 먼저 전화드립니다 · 평일 9~18시</p>'+
    '<a class="rbcta-tel" href="tel:'+TEL.replace(/-/g,'')+'">전화 상담</a>'+
    '<a class="rbcta-go" href="/#contact" target="_top">상담 신청</a>';
  document.body.appendChild(bar);document.body.classList.add('has-rbcta');
  function ev(n,p){if(typeof window.gtag==='function')window.gtag('event',n,p);}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a');if(!a)return;
    var h=a.getAttribute('href')||'';
    if(h.indexOf('tel:')===0)ev('phone_call_click',{event_category:'contact',from:'guide',guide_page:page});
    else if(/#contact$/.test(h))ev('guide_cta_click',{event_category:'consultation',guide_page:page});
  });
})();
