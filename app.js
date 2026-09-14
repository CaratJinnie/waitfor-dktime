
const DATA=window.DK_DATA;
let LANG=localStorage.getItem("dk-lang")||"zh";
const ENLISTMENT="2026-09-08",DISCHARGE="2028-03-07",TOTAL=546,DISCHARGE_MOMENT=new Date("2028-03-07T00:00:00+09:00");
const TEXT={
 zh:{home:"首页",explore:"探索",calendar:"日历",archive:"Archive",timeline:"时间线",now:"DK Now",past:"已走过",today:"今天",future:"等待中",open:"查看原帖",noresult:"暂时没找到对应内容。"},
 ko:{home:"홈",explore:"탐색",calendar:"캘린더",archive:"Archive",timeline:"타임라인",now:"DK Now",past:"지나온 날",today:"오늘",future:"기다리는 중",open:"원문 보기",noresult:"아직 맞는 내용을 찾지 못했어요."},
 en:{home:"Home",explore:"Explore",calendar:"Calendar",archive:"Archive",timeline:"Timeline",now:"DK Now",past:"Passed",today:"Today",future:"Waiting",open:"Open original",noresult:"No matching archive entry yet."}
};
function txt(o){return o?.[LANG]||o?.en||o?.zh||""}
function kst(){const p=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date()),o={};p.forEach(x=>o[x.type]=x.value);return {y:+o.year,m:+o.month,d:+o.day,iso:`${o.year}-${o.month}-${o.day}`}}
function utc(s){const [y,m,d]=s.split("-").map(Number);return Date.UTC(y,m-1,d)}
function diff(a,b){return Math.round((utc(b)-utc(a))/86400000)}
function initNav(active){
 const nav=document.querySelector(".site-nav"); if(!nav)return;
 nav.innerHTML=`<a class="brand" href="index.html"><span class="brand-mark">🌻</span>Waiting for DK</a>
 <div class="nav-links">
  <a href="index.html" data-nav="home">${TEXT[LANG].home}</a>
  <a href="explore.html" data-nav="explore">${TEXT[LANG].explore}</a>
  <a href="calendar.html" data-nav="calendar">${TEXT[LANG].calendar}</a>
  <a href="archive.html" data-nav="archive">${TEXT[LANG].archive}</a>
  <a href="timeline.html" data-nav="timeline">${TEXT[LANG].timeline}</a>
  <a href="now.html" data-nav="now">${TEXT[LANG].now}</a>
 </div>
 <div class="lang"><button data-lang="ko">한국어</button><button data-lang="zh">中文</button><button data-lang="en">EN</button></div>`;
 nav.querySelector(`[data-nav="${active}"]`)?.classList.add("active");
 nav.querySelectorAll("[data-lang]").forEach(b=>{b.classList.toggle("active",b.dataset.lang===LANG);b.onclick=()=>{LANG=b.dataset.lang;localStorage.setItem("dk-lang",LANG);location.reload()}});
 let dock=document.querySelector(".mobile-dock");
 if(!dock){dock=document.createElement("div");dock.className="mobile-dock";document.body.appendChild(dock)}
 dock.innerHTML=`<a href="index.html" data-d="home"><b>⌂</b>${TEXT[LANG].home}</a><a href="explore.html" data-d="explore"><b>🪐</b>${TEXT[LANG].explore}</a><a href="calendar.html" data-d="calendar"><b>🗓️</b>${TEXT[LANG].calendar}</a><a href="archive.html" data-d="archive"><b>🔎</b>${TEXT[LANG].archive}</a><a href="timeline.html" data-d="timeline"><b>🕰️</b>${TEXT[LANG].timeline}</a><a href="now.html" data-d="now"><b>💬</b>${TEXT[LANG].now}</a>`;
 dock.querySelector(`[data-d="${active}"]`)?.classList.add("active");
}
function updateCountdown(){
 const t=kst(),left=diff(t.iso,DISCHARGE),elapsed=Math.max(0,Math.min(TOTAL,diff(ENLISTMENT,t.iso)));
 const d=left>0?`D-${left}`:left===0?"D-DAY":"WELCOME BACK";
 document.querySelectorAll("[data-dday]").forEach(e=>e.textContent=d);
 document.querySelectorAll("[data-progress-text]").forEach(e=>e.textContent=`${elapsed} / ${TOTAL} days`);
 document.querySelectorAll("[data-progress-fill]").forEach(e=>e.style.width=`${Math.min(100,elapsed/TOTAL*100)}%`);
 const ms=DISCHARGE_MOMENT-new Date();
 if(ms>0){
  const vals=[Math.floor(ms/86400000),Math.floor(ms%86400000/3600000),Math.floor(ms%3600000/60000),Math.floor(ms%60000/1000)];
  ["days","hours","mins","secs"].forEach((id,i)=>{const e=document.getElementById(id);if(e)e.textContent=i?String(vals[i]).padStart(2,"0"):vals[i]});
 }
}
function openMoment(m){
 const back=document.getElementById("modalBack"); if(!back)return;
 const body=document.getElementById("modalContent");
 body.innerHTML=`<div class="eyebrow">${m.source} · ${m.date}</div><h2 class="section-title">${txt(m.title)}</h2><p class="lede">${txt(m.excerpt)}</p>${m.image?`<img src="${m.image}" alt="" style="width:100%;border-radius:20px;margin:8px 0 14px">`:""}<a class="btn primary" target="_blank" href="${m.url}">${TEXT[LANG].open} ↗</a>`;
 back.classList.add("show");
}
function initModal(){
 const back=document.getElementById("modalBack"); if(!back)return;
 document.getElementById("modalClose").onclick=()=>back.classList.remove("show");
 back.onclick=e=>{if(e.target===back)back.classList.remove("show")}
}
function footer(){const f=document.querySelector(".footer");if(f)f.innerHTML=`<span>Waiting for DK · Explore DK</span><span>2026.09.08 → 2028.03.07 · KST</span>`}
setInterval(updateCountdown,1000);
document.addEventListener("DOMContentLoaded",()=>{updateCountdown();initModal();footer()});
