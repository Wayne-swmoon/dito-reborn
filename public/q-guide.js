/* 위즈웹 모듈: 한 줄 질문 안내 (q-guide) v3 — 2026-11-27
   방문자가 질문 하나를 누르면 → 그 줄 아래로 미리 정한 짧은 답(대화처럼) + 안내서 쪽 링크 + 그 질문이 담긴 상담 접수(연락처만).
   AI가 즉석에서 답하지 않음: 답 문장은 모두 사이트 데이터(window.QGUIDE)에서만 나온다.
   붙이기: <div data-qguide></div> + window.QGUIDE = {...} + <script src="/q-guide.js" defer>
   데이터 칸
     look                  "band" 짙은 띠(사이트 --accent 색) · 없으면 밝은 판
     eyebrow, title, sub   머리 글 (title 안 \n 은 줄바꿈, *낱말* 은 강조색)
     aside                 {text, tel, telLabel} — 머리 아래 작은 줄(전화가 편한 분께)
     items[]               {q, a, href, label}  — q 질문 · a 짧은 답 · href 더 볼 쪽 · label 링크 글
     free                  {q, ph}  — '직접 적기' 줄(없으면 안 그림)
     who                   답 말풍선 위 이름표 (예: "전담 매니저")
     form                  {hint, btn, agree, privacyFor, ok, err, submit(전역 함수 이름 — {name, phone, interests, message} → Promise)}
     tag                   접수 때 interests 앞에 붙일 말
     fill                  {msg:"#c-msg"} — 질문을 누르면 사이트 본 상담 폼 '상황 설명' 칸에도 적어 둠(비었을 때만)
     track                 ["#form", ...] — 폼 단계 측정: form_start · form_try · form_leave(마지막 칸)
     open                  처음부터 펼쳐 둘 질문 번호(0부터) · 없으면 모두 닫힘
     qa                    true 면 번호 대신 Q · 답 앞에 A (자주 묻는 질문 모양)
     typing                true 면 답 전에 입력 중 점 0.5초 (기본 끔)
     offset                질문을 눌렀을 때 위에서 띄울 거리(고정 머리 높이, 기본 84)
   GA 사건: qg_pick{q} · qg_link{q,href} · qg_submit{q} · form_start{form} · form_try{form} · form_leave{form,last}
*/
(function(){
  var C=window.QGUIDE,box=document.querySelector('[data-qguide]');
  function ga(n,p){if(typeof window.gtag==='function')window.gtag('event',n,p||{});}
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e;}
  var still=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 폼 단계 측정 */
  (C&&C.track||[]).forEach(function(sel){var f=document.querySelector(sel);if(!f)return;
    var id=f.id||sel,started=false,sent=false,last='';
    f.addEventListener('focusin',function(e){var t=e.target;if(/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)){var k=t.id||t.name||t.type||'';if(k)last=k;}
      if(!started){started=true;ga('form_start',{form:id});}});
    f.addEventListener('submit',function(){sent=true;ga('form_try',{form:id,last:last});},true);
    addEventListener('pagehide',function(){if(started&&!sent)ga('form_leave',{form:id,last:last,transport_type:'beacon'});});
  });
  if(!C||!box||!(C.items||[]).length)return;

  var F=C.form||{},uid='qg'+Math.random().toString(36).slice(2,7);
  box.classList.add('qg');if(C.look)box.classList.add('qg--'+C.look);
  /* 머리 */
  var hd=el('div','qg-hd');box.appendChild(hd);
  if(C.eyebrow)hd.appendChild(el('p','qg-eb',C.eyebrow));
  if(C.title){var h=el('h2','qg-t');String(C.title).split('\n').forEach(function(line,i){if(i)h.appendChild(el('br'));
    line.split(/(\*[^*]+\*)/).forEach(function(s){if(!s)return;if(/^\*.*\*$/.test(s))h.appendChild(el('em',null,s.slice(1,-1)));else h.appendChild(document.createTextNode(s));});});hd.appendChild(h);}
  if(C.sub)hd.appendChild(el('p','qg-s',C.sub));
  if(C.aside){var as=el('p','qg-aside');as.appendChild(document.createTextNode((C.aside.text||'')+' '));
    if(C.aside.tel){var a=el('a',null,C.aside.telLabel||C.aside.tel);a.href='tel:'+String(C.aside.tel).replace(/[^\d+]/g,'');as.appendChild(a);}hd.appendChild(as);}

  /* 질문 목록 */
  var list=el('ol','qg-list');box.appendChild(list);
  var all=C.items.slice();if(C.free)all.push({q:C.free.q,free:true,ph:C.free.ph});
  var rows=all.map(function(it,i){var li=el('li','qg-row'+(it.free?' qg-free':''));li.style.setProperty('--i',i);
    var b=el('button','qg-q');b.type='button';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls',uid+'-p');
    b.appendChild(el('span','qg-n',C.qa?'Q':(it.free?'+':String(i+1).padStart(2,'0'))));b.appendChild(el('span','qg-qt',it.q));
    var ar=el('span','qg-ar');ar.setAttribute('aria-hidden','true');b.appendChild(ar);
    b.addEventListener('click',function(){toggle(i);});li.appendChild(b);list.appendChild(li);return li;});

  /* 답 판 (누른 줄 아래로 옮겨 다님) */
  var pan=el('div','qg-pan');pan.id=uid+'-p';pan.hidden=true;pan.setAttribute('aria-live','polite');
  var bub=el('div','qg-bub');pan.appendChild(bub);
  if(C.who)bub.appendChild(el('p','qg-who',C.who));
  if(C.qa)bub.appendChild(el('span','qg-alab','A'));
  var typing=el('p','qg-typing');typing.setAttribute('aria-hidden','true');typing.innerHTML='<i></i><i></i><i></i>';bub.appendChild(typing);
  var pa=el('p','qg-a'),pl=el('a','qg-link');bub.appendChild(pa);bub.appendChild(pl);
  var fm=el('form','qg-form');fm.noValidate=true;pan.appendChild(fm);
  var hint=el('p','qg-hint',F.hint||'');fm.appendChild(hint);
  var ta=el('textarea','qg-ta');ta.rows=2;ta.setAttribute('aria-label','궁금한 것');ta.hidden=true;fm.appendChild(ta);
  var row=el('div','qg-in'),tel=el('input','qg-tel');tel.type='tel';tel.inputMode='numeric';tel.autocomplete='tel';
  tel.placeholder='010-0000-0000';tel.setAttribute('aria-label','연락처');
  var sb=el('button','qg-btn',F.btn||'보내기');sb.type='submit';row.appendChild(tel);row.appendChild(sb);fm.appendChild(row);
  var ag=el('div','qg-ag'),lb=el('label'),cb=el('input');cb.type='checkbox';cb.id=uid+'-ag';lb.appendChild(cb);
  lb.appendChild(document.createTextNode(F.agree||'개인정보 수집·이용 동의(필수)'));ag.appendChild(lb);
  if(F.privacyFor){var pv=el('button','pv-open','내용보기');pv.type='button';pv.setAttribute('data-pv-for',cb.id);ag.appendChild(pv);}
  fm.appendChild(ag);var msg=el('p','qg-msg');msg.hidden=true;msg.setAttribute('role','status');fm.appendChild(msg);

  var cur=-1,tmr;
  function shut(i){rows[i].classList.remove('on');rows[i].querySelector('.qg-q').setAttribute('aria-expanded','false');}
  function toggle(i){if(cur===i){shut(i);pan.hidden=true;cur=-1;return;}open(i,true);}
  function open(i,user){var it=all[i];if(cur>=0)shut(cur);
    cur=i;rows[i].classList.add('on');rows[i].querySelector('.qg-q').setAttribute('aria-expanded','true');rows[i].appendChild(pan);
    pan.hidden=false;msg.hidden=true;
    pa.textContent=it.free?'궁금한 것을 한 줄 적어 주세요. 매니저가 읽고 전화드려요.':(it.a||'');
    if(it.href){pl.href=it.href;pl.textContent=(it.label||'자세히 보기')+' →';pl.hidden=false;}else pl.hidden=true;
    hint.textContent=it.free?'':(F.hint||'');hint.hidden=!!it.free||!F.hint;
    ta.hidden=!it.free;if(it.free)ta.placeholder=it.ph||'';
    clearTimeout(tmr);
    if(user&&!still&&C.typing){bub.classList.add('wait');tmr=setTimeout(function(){bub.classList.remove('wait');if(it.free)ta.focus();},520);}
    else bub.classList.remove('wait');
    if(!user)return;
    if(C.fill&&C.fill.msg&&!it.free){var m=document.querySelector(C.fill.msg);
      if(m&&(!m.value||m.getAttribute('data-qg')===m.value)){m.value='궁금한 것: '+it.q;m.setAttribute('data-qg',m.value);}}
    ga('qg_pick',{q:it.q});
    var r=rows[i].getBoundingClientRect(),top=C.offset||84;if(r.top<top||r.top>innerHeight*.55)window.scrollTo({top:r.top+scrollY-top,behavior:still?'auto':'smooth'});
  }
  pl.addEventListener('click',function(){if(cur>=0)ga('qg_link',{q:all[cur].q,href:pl.getAttribute('href')});});
  function say(t,err){msg.hidden=false;msg.textContent=t;msg.classList.toggle('err',!!err);}
  fm.addEventListener('submit',function(e){e.preventDefault();if(cur<0)return;var it=all[cur];
    var p=tel.value.trim(),free=it.free?ta.value.trim():'';
    if(it.free&&!free){say('궁금한 것을 한 줄 적어 주세요.',1);ta.focus();return;}
    if(p.replace(/\D/g,'').length<9){say('연락처를 숫자로 적어 주세요. 예) 010-1234-5678',1);tel.focus();return;}
    if(!cb.checked){say('개인정보 수집·이용 동의에 체크해 주세요.',1);return;}
    var fn=window[F.submit];if(typeof fn!=='function'){say(F.err||'잠시 후 다시 시도해 주세요.',1);return;}
    sb.disabled=true;var q=it.free?'직접 적음':it.q;
    fn({name:'(이름 미기재)',phone:p,interests:(C.tag?C.tag+': ':'')+q,message:free}).then(function(){
      say(F.ok||'접수되었습니다.');fm.reset();ga('qg_submit',{q:q});
    }).catch(function(){say(F.err||'접수 중 오류가 났습니다.',1);}).then(function(){sb.disabled=false;});
  });

  /* 화면에 들어오면 줄이 차례로 나타남 */
  if(!still&&'IntersectionObserver' in window){box.classList.add('qg-pre');
    var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){box.classList.remove('qg-pre');io.disconnect();}},{threshold:.12});io.observe(box);}
  if(typeof C.open==='number'&&all[C.open])open(C.open,false);
})();
