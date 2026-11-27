/* 위즈웹 모듈: 한 줄 질문 안내 (q-guide) v1 — 2026-11-27
   방문자가 질문 칩 하나를 누르면 → 미리 정한 짧은 답 + 안내서 쪽 링크 + 그 질문이 담긴 상담 접수(연락처만).
   AI가 즉석에서 답하지 않음: 답 문장은 모두 사이트 데이터(window.QGUIDE)에서만 나온다.
   붙이기: <div data-qguide></div> + window.QGUIDE = {...} + <script src="/q-guide.js" defer>
   데이터 칸
     title, sub            머리 글
     items[]               {q, a, href, label}  — q 칩 글 · a 짧은 답 · href 더 볼 쪽 · label 링크 글
     free                  {q, ph}  — '직접 적기' 칩(없으면 안 그림)
     form                  {hint, btn, agree, privacyFor(사이트의 개인정보 열기 버튼 data-pv-for 를 쓸 때 true),
                            ok, err, submit(전역 함수 이름 — {name, phone, interests, message} 를 받아 Promise)}
     tag                   접수 때 interests 앞에 붙일 말
     fill                  {msg:"#c-msg"}  — 칩을 누르면 사이트 본 상담 폼의 '상황 설명' 칸에도 질문을 적어 둠(비었을 때만)
     track                 ["#form", ...]  — 폼 단계 측정: form_start · form_try · form_leave(마지막 칸)
   GA 사건: qg_pick{q} · qg_link{q,href} · qg_submit{q} · form_start{form} · form_try{form} · form_leave{form,last}
*/
(function(){
  var C=window.QGUIDE,box=document.querySelector('[data-qguide]');
  function ga(n,p){if(typeof window.gtag==='function')window.gtag('event',n,p||{});}
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}

  /* 폼 단계 측정 — 질문 칸이 없는 쪽에서도 동작 */
  (C&&C.track||[]).forEach(function(sel){var f=document.querySelector(sel);if(!f)return;
    var id=f.id||sel,started=false,sent=false,last='';
    f.addEventListener('focusin',function(e){var t=e.target;if(/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)){var k=t.id||t.name||t.type||'';if(k)last=k;}
      if(!started){started=true;ga('form_start',{form:id});}});
    f.addEventListener('submit',function(){sent=true;ga('form_try',{form:id,last:last});},true);
    addEventListener('pagehide',function(){if(started&&!sent)ga('form_leave',{form:id,last:last,transport_type:'beacon'});});
  });
  if(!C||!box||!(C.items||[]).length)return;

  var F=C.form||{},uid='qg'+Math.random().toString(36).slice(2,7);
  box.classList.add('qg');
  if(C.title)box.appendChild(el('p','qg-t',C.title));
  if(C.sub)box.appendChild(el('p','qg-s',C.sub));
  var list=el('div','qg-chips');list.setAttribute('role','list');box.appendChild(list);
  var all=C.items.slice();if(C.free)all.push({q:C.free.q,free:true,ph:C.free.ph});
  var btns=all.map(function(it,i){var b=el('button','qg-chip'+(it.free?' qg-free':''),it.q);b.type='button';
    b.setAttribute('aria-pressed','false');b.setAttribute('aria-controls',uid+'-p');b.setAttribute('role','listitem');
    b.addEventListener('click',function(){pick(i);});list.appendChild(b);return b;});

  var pan=el('div','qg-pan');pan.id=uid+'-p';pan.hidden=true;pan.setAttribute('aria-live','polite');box.appendChild(pan);
  var pq=el('p','qg-q'),pa=el('p','qg-a'),pl=el('a','qg-link');pan.appendChild(pq);pan.appendChild(pa);pan.appendChild(pl);
  var fm=el('form','qg-form');fm.noValidate=true;pan.appendChild(fm);
  if(F.hint)fm.appendChild(el('p','qg-hint',F.hint));
  var ta=el('textarea','qg-ta');ta.rows=2;ta.setAttribute('aria-label','궁금한 것');ta.hidden=true;fm.appendChild(ta);
  var row=el('div','qg-row'),tel=el('input','qg-tel');tel.type='tel';tel.inputMode='numeric';tel.autocomplete='tel';
  tel.placeholder='010-0000-0000';tel.setAttribute('aria-label','연락처');
  var sb=el('button','qg-btn',F.btn||'보내기');sb.type='submit';row.appendChild(tel);row.appendChild(sb);fm.appendChild(row);
  var ag=el('div','qg-ag'),lb=el('label'),cb=el('input');cb.type='checkbox';cb.id=uid+'-ag';lb.appendChild(cb);
  lb.appendChild(document.createTextNode(F.agree||'개인정보 수집·이용 동의(필수)'));ag.appendChild(lb);
  if(F.privacyFor){var pv=el('button','pv-open','내용보기');pv.type='button';pv.setAttribute('data-pv-for',cb.id);ag.appendChild(pv);}
  fm.appendChild(ag);var msg=el('p','qg-msg');msg.hidden=true;msg.setAttribute('role','status');fm.appendChild(msg);

  var cur=null;
  function pick(i){var it=all[i];cur=it;
    btns.forEach(function(b,j){b.setAttribute('aria-pressed',j===i?'true':'false');});
    pan.hidden=false;msg.hidden=true;pq.textContent=it.free?(C.free.q):it.q;
    pa.textContent=it.a||'';pa.hidden=!it.a;
    if(it.href){pl.href=it.href;pl.textContent=(it.label||'자세히 보기')+' →';pl.hidden=false;}else pl.hidden=true;
    ta.hidden=!it.free;if(it.free){ta.placeholder=it.ph||'';setTimeout(function(){ta.focus();},0);}
    if(C.fill&&C.fill.msg&&!it.free){var m=document.querySelector(C.fill.msg);
      if(m&&(!m.value||m.getAttribute('data-qg')===m.value)){m.value='궁금한 것: '+it.q;m.setAttribute('data-qg',m.value);}}
    ga('qg_pick',{q:it.q});
    if(matchMedia('(max-width:900px)').matches){var r=pan.getBoundingClientRect();if(r.top>innerHeight*.6)pan.scrollIntoView({behavior:'smooth',block:'center'});}
  }
  pl.addEventListener('click',function(){if(cur)ga('qg_link',{q:cur.q,href:pl.getAttribute('href')});});
  function say(t,err){msg.hidden=false;msg.textContent=t;msg.classList.toggle('err',!!err);}
  fm.addEventListener('submit',function(e){e.preventDefault();if(!cur)return;
    var p=tel.value.trim(),free=cur.free?ta.value.trim():'';
    if(cur.free&&!free){say('궁금한 것을 한 줄 적어 주세요.',1);ta.focus();return;}
    if(p.replace(/\D/g,'').length<9){say('연락처를 숫자로 적어 주세요. 예) 010-1234-5678',1);tel.focus();return;}
    if(!cb.checked){say('개인정보 수집·이용 동의에 체크해 주세요.',1);return;}
    var fn=window[F.submit];if(typeof fn!=='function'){say(F.err||'잠시 후 다시 시도해 주세요.',1);return;}
    sb.disabled=true;
    var q=cur.free?'직접 적음':cur.q;
    fn({name:'(이름 미기재)',phone:p,interests:(C.tag?C.tag+': ':'')+q,message:free}).then(function(){
      say(F.ok||'접수되었습니다.');fm.reset();ga('qg_submit',{q:q});
    }).catch(function(){say(F.err||'접수 중 오류가 났습니다.',1);}).then(function(){sb.disabled=false;});
  });
})();
