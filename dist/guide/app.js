const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],ROOT=document.body.dataset.root||"",still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
/* 목차 서랍 */
const menu=$(".menu"),sd=$("#sd"),sc=$(".scrim");const dr=o=>{sd.classList.toggle("open",o);sc.hidden=!o;menu.setAttribute("aria-expanded",o);menu.setAttribute("aria-label",o?"목차 닫기":"목차 열기")};
menu.onclick=()=>dr(!sd.classList.contains("open"));sc.onclick=()=>dr(false);addEventListener("keydown",e=>{if(e.key==="Escape")dr(false)});
/* 검색 */
const dlg=$("#sdlg"),q=$("#sq"),res=$("#sres");
const hl=(s,w)=>{let h=esc(s);w.forEach(t=>{h=h.split(esc(t)).join("<mark>"+esc(t)+"</mark>")});return h};
const run=()=>{const w=q.value.trim().split(/\s+/).filter(Boolean);if(!w.length){res.innerHTML=`<div class="s-e"><b>이런 말로 찾아보세요</b><div class="s-c">${WD.chips.map(x=>`<button type="button">${x}</button>`).join("")}</div></div>`;res.querySelectorAll("button").forEach(b=>b.onclick=()=>{q.value=b.textContent;run();q.focus()});return}
 const r=DOCS.map(d=>({d,sc:w.reduce((n,t)=>n+(d.t.includes(t)?5:0)+(d.d.includes(t)?2:0)+(d.x.includes(t)?1:0),0),all:w.every(t=>(d.t+d.d+d.x).includes(t))})).filter(x=>x.all).sort((a,b)=>b.sc-a.sc);
 res.innerHTML=r.length?`<p class="s-n">${r.length}개 글</p>`+r.map(({d})=>{const i=d.x.indexOf(w[0]),sn=i<0?d.d:d.x.slice(Math.max(0,i-24),i+56);return `<a class="s-i" href="${ROOT}${d.s}/"><small>${esc(d.g)}</small><b>${hl(d.t,w)}</b><span>${hl(sn,w)}</span></a>`}).join(""):`<div class="s-e"><b>찾는 글이 없습니다</b><p>${WD.tel?`다른 말로 찾거나 전화로 물어보세요. <a href="tel:${WD.tel.replaceAll("-","")}">${WD.tel}</a>`:`다른 말로 찾거나 <a href="${WD.consult}" target="_top">상담 신청서</a>로 물어보세요.`}</p></div>`};
const open=()=>{if(!dlg.open)dlg.showModal();q.value="";run();q.focus()};$$(".sbtn,.bigs").forEach(b=>b.onclick=open);q.oninput=run;
addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();open()}});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
/* 읽기 진행과 글 안 목차 */
const pb=$(".prog i");const onS=()=>{const m=document.documentElement.scrollHeight-innerHeight;pb.style.width=(m>0?scrollY/m*100:0)+"%"};addEventListener("scroll",onS,{passive:true});onS();
/* 글 안 목차: 스크롤 위치로 계산(짧은 섹션·글 끝에서도 정확). 목차를 누르면 사용자가 직접 스크롤할 때까지 누른 항목을 유지 */
const tl=$$(".rt a");if(tl.length){const secs=tl.map(a=>document.getElementById(a.getAttribute("href").slice(1))).filter(Boolean);let lock=null,raf=0;
 const set=id=>tl.forEach(a=>{const on=a.getAttribute("href")==="#"+id;a.classList.toggle("on",on);on?a.setAttribute("aria-current","true"):a.removeAttribute("aria-current")});
 const calc=()=>{raf=0;if(lock){set(lock);return}const hd=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hd"))||64,line=hd+48;let cur=secs[0];
  for(const s of secs)if(s.getBoundingClientRect().top<=line)cur=s;
  if(innerHeight+scrollY>=document.documentElement.scrollHeight-2){const vis=secs.filter(s=>s.getBoundingClientRect().top<innerHeight);if(vis.length)cur=vis[vis.length-1]}
  set(cur.id)};
 const req=()=>{if(!raf)raf=requestAnimationFrame(calc)};addEventListener("scroll",req,{passive:true});addEventListener("resize",req);
 const unlock=()=>{if(lock){lock=null;req()}};["wheel","touchstart","keydown"].forEach(e=>addEventListener(e,unlock,{passive:true}));
 tl.forEach(a=>a.addEventListener("click",()=>{lock=a.getAttribute("href").slice(1);set(lock)}));
 addEventListener("hashchange",()=>{const id=location.hash.slice(1);if(secs.some(s=>s.id===id)){lock=id;set(id)}});calc()}
/* 기한 표 거르기 */
$$(".chips button").forEach(b=>b.onclick=()=>{$$(".chips button").forEach(x=>{x.classList.toggle("on",x===b);x.setAttribute("aria-pressed",x===b)});$$(".dt tbody tr").forEach(r=>r.hidden=b.dataset.g&&r.dataset.g!==b.dataset.g)});
/* 현재 글을 목차에서 보이게 */
const on=$(".tree .on");if(on&&innerWidth>=960)sd.scrollTop=Math.max(0,on.offsetTop-sd.clientHeight/2);
/* 인쇄 */
const tp=$(".t-print");if(tp)tp.onclick=()=>print();
/* 공유 */
const ts=$(".t-share");if(ts)ts.onclick=async()=>{const lb=ts.querySelector("span");try{if(navigator.share){await navigator.share({title:document.title,url:location.href});return}await navigator.clipboard.writeText(location.href);lb.textContent="복사됨"}catch(e){if(e.name==="AbortError")return;lb.textContent="주소 복사"}setTimeout(()=>lb.textContent="공유",1800)};
/* SPEECH: 읽어 주기. 지금은 브라우저 음성. 유료 음성으로 바꿀 때 이 부분만 교체한다 */
(()=>{const btn=$(".t-listen"),pl=$(".player");if(!btn||!pl)return;const S=window.speechSynthesis,st=$(".p-st"),vs=$(".p-voice"),rt=$(".p-rate"),pp=$(".p-play");
 if(!S){btn.hidden=true;return}
 const paras=$$(".art h1,.art .dek,.art section:not(.rel) h2,.art section:not(.rel) p,.art section:not(.rel) li,.art section:not(.rel) td,.art .q summary,.keys strong,.keys span").filter(e=>!e.closest(".rel"));
 /* 조문·판례 괄호는 소리로 읽지 않는다. 화면에는 그대로 남는다 */
 const say=t=>t.replace(/\([^()]*(제\s?\d+\s?조|판결|결정|같은 (법|조|항))[^()]*\)/g,"").replace(/\s+/g," ").trim();
 let i=0,playing=false,voices=[];
 const fill=()=>{voices=S.getVoices().filter(v=>/^ko/i.test(v.lang));vs.innerHTML=voices.map((v,k)=>`<option value="${k}">${esc(v.name.replace(/Microsoft |Google /,""))}</option>`).join("");$(".p-vw").hidden=!voices.length;if(!voices.length)st.textContent="이 기기에 한국어 음성이 없어 기본 음성으로 읽습니다"};fill();S.onvoiceschanged=fill;
 const mark=()=>{paras.forEach(p=>p.classList.remove("reading"));const e=paras[i];if(e){e.classList.add("reading");e.scrollIntoView({block:"center",behavior:still?"auto":"smooth"})}if(voices.length||!S.getVoices().length)st.textContent=`${i+1} / ${paras.length}`};
 const speak=()=>{S.cancel();if(i>=paras.length){stop();return}mark();const u=new SpeechSynthesisUtterance(say(paras[i].textContent));u.lang="ko-KR";u.rate=+rt.value;const v=voices[+vs.value];if(v)u.voice=v;u.onend=()=>{if(playing&&u===cur){i++;speak()}};cur=u;S.speak(u)};let cur=null;
 const stop=()=>{playing=false;cur=null;S.cancel();paras.forEach(p=>p.classList.remove("reading"));pl.hidden=true;btn.classList.remove("on")};
 const setP=o=>{playing=o;pp.setAttribute("aria-label",o?"일시정지":"재생");pp.innerHTML=o?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'};
 btn.onclick=()=>{if(!pl.hidden){stop();return}pl.hidden=false;btn.classList.add("on");i=0;setP(true);speak()};
 pp.onclick=()=>{if(playing){cur=null;S.cancel();setP(false)}else{setP(true);speak()}};
 $(".p-prev").onclick=()=>{i=Math.max(0,i-1);setP(true);speak()};$(".p-next").onclick=()=>{i=Math.min(paras.length-1,i+1);setP(true);speak()};$(".p-close").onclick=stop;
 rt.onchange=vs.onchange=()=>{if(playing)speak()};addEventListener("pagehide",()=>S.cancel());
})();
/* 승인 화면 시안: 기록은 메모리에만 둔다 */
$$(".rv-tabs button").forEach(b=>b.onclick=()=>{$$(".rv-tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));$$(".rv-p").forEach((p,k)=>p.hidden=k!==+b.dataset.i)});
$$(".rv-form").forEach(f=>{const log=f.querySelector(".rv-log"),badge=$(`.st-b[data-s="${f.dataset.i}"]`),when=()=>new Date().toLocaleString("ko-KR");
 f.onsubmit=e=>{e.preventDefault();const n=f.querySelector("input[type=text]").value.trim();if(!n)return;badge.textContent="승인됨";badge.className="st-b ok";log.textContent=`${n} · ${when()} · 버전 ${f.dataset.ver} 승인`};
 f.querySelector(".rv-c").onclick=()=>{const t=f.querySelector("textarea");if(!t.value.trim()){t.focus();log.textContent="고칠 내용을 적어 주세요";return}badge.textContent="수정 요청";badge.className="st-b ch";log.textContent=`${when()} · 수정 요청 접수`}});
