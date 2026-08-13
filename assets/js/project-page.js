function getId(){return new URLSearchParams(window.location.search).get("id")}
function esc(s){return String(s||"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[x]))}
function list(a){return a&&a.length?`<ul>${a.map(i=>`<li>${esc(i)}</li>`).join("")}</ul>`:""}
function box(t,h){return h?`<div class="detail-box"><h4>${esc(t)}</h4>${h}</div>`:""}
function renderProject(p){
  document.title=`${p.name} — First Venture Projects`;
  const href="../index.html#contact";
  document.getElementById("topContact").href=href;
  document.getElementById("projectRoot").innerHTML=`
  <section class="project-hero"><div class="container project-hero-grid"><div>
    <a href="../projects.html" class="back-link">← Все проекты</a>
    <div class="project-logo-big">${esc(p.logoText||"FV")}</div>
    <div class="eyebrow">${esc(p.industry||"")}</div>
    <h1>${esc(p.name||"")}</h1>
    <p class="section-lead">${esc(p.description||p.short||"")}</p>
    <div class="tags">${(p.tags||[]).map(t=>`<span>${esc(t)}</span>`).join("")}</div>
  </div><div class="info-card"><h3>Ключевые показатели</h3>${list(p.metrics)||`<p>${esc(p.statusLabel||p.status||"Проект")}</p>`}</div></div></section>
  <section><div class="container detail-grid">
    ${box("Что предлагает",list(p.services))}
    ${box("Преимущества",list(p.advantages))}
    ${box("Примеры внедрений",list(p.cases))}
    ${box("Клиенты / примеры",list(p.clients))}
    ${box("Статус",`<p>${esc(p.statusLabel||p.status||"")}</p>`)}
  </div></section>
  <section class="cta"><div class="container"><h2>Запросить интро или демонстрацию</h2><p>${esc(p.ctaText||"Оставьте запрос, если хотите обсудить проект.")}</p><a href="${href}" class="btn">Связаться с First Venture</a></div></section>`
}
function load(){const id=getId();if(!id){document.getElementById("projectRoot").innerHTML='<section><div class="container"><h1>Проект не указан</h1></div></section>';return}const s=document.createElement("script");s.src=`${id}/data.js`;s.onload=()=>window.FV_PROJECT_DATA?renderProject(window.FV_PROJECT_DATA):0;s.onerror=()=>document.getElementById("projectRoot").innerHTML=`<section><div class="container"><a href="../projects.html" class="back-link">← Все проекты</a><h1>Проект не найден</h1><p class="section-lead">Не найден файл projects/${id}/data.js</p></div></section>`;document.body.appendChild(s)}
load();