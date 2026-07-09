function getId() {
  return new URLSearchParams(window.location.search).get("id");
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, s => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[s]);
}

function list(items) {
  if (!items || !items.length) return "";
  return `<ul>${items.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
}

function box(title, html) {
  if (!html) return "";
  return `<div class="detail-box"><h4>${escapeHtml(title)}</h4>${html}</div>`;
}

function contacts(c) {
  if (!c) return "";
  const arr = [];
  if (c.email) arr.push(`Email: <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>`);
  if (c.phone) arr.push(`Тел.: <a href="tel:${escapeHtml(c.phone.replace(/\s/g, ""))}">${escapeHtml(c.phone)}</a>`);
  if (c.site) arr.push(`Сайт: ${escapeHtml(c.site)}`);
  if (c.telegram) arr.push(`Telegram: ${escapeHtml(c.telegram)}`);
  return arr.length ? `<p>${arr.join("<br>")}</p>` : "";
}

function renderProject(p) {
  document.title = `${p.name} — First Venture Projects`;
  const email = p.contact && p.contact.email;
  const contactHref = email ? `mailto:${email}?subject=Запрос по ${p.name}` : "../index.html#contact";
  document.getElementById("topContact").href = contactHref;

  document.getElementById("projectRoot").innerHTML = `
    <section class="project-hero">
      <div class="container project-hero-grid">
        <div>
          <a href="../projects.html" class="back-link">← Все проекты</a>
          <div class="project-logo-big">${escapeHtml(p.logoText || "FV")}</div>
          <div class="eyebrow">${escapeHtml(p.industry || "")}</div>
          <h1>${escapeHtml(p.name || "")}</h1>
          <p class="section-lead">${escapeHtml(p.description || p.short || "")}</p>
          <div class="tags">${(p.tags || []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}</div>
        </div>
        <div class="info-card">
          <h3>Ключевые показатели</h3>
          ${list(p.metrics) || `<p>${escapeHtml(p.statusLabel || p.status || "Проект")}</p>`}
        </div>
      </div>
    </section>

    <section>
      <div class="container detail-grid">
        ${box("Что предлагает", list(p.services))}
        ${box("Преимущества", list(p.advantages))}
        ${box("Примеры внедрений", list(p.cases))}
        ${box("Клиенты / примеры", list(p.clients))}
        ${box("Статус", `<p>${escapeHtml(p.statusLabel || p.status || "")}</p>`)}
        ${box("Контакты", contacts(p.contact))}
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Запросить интро или демонстрацию</h2>
        <p>${escapeHtml(p.ctaText || "Оставьте запрос, если хотите обсудить проект.")}</p>
        <a href="${contactHref}" class="btn">Связаться</a>
      </div>
    </section>
  `;
}

function loadProject() {
  const id = getId();
  if (!id) {
    document.getElementById("projectRoot").innerHTML = `<section><div class="container"><h1>Проект не указан</h1><p class="section-lead">Вернитесь в каталог и выберите проект.</p></div></section>`;
    return;
  }

  const script = document.createElement("script");
  script.src = `${id}/data.js`;
  script.onload = () => {
    const p = window.FV_PROJECT_DATA;
    if (!p) throw new Error("No project data");
    renderProject(p);
  };
  script.onerror = () => {
    document.getElementById("projectRoot").innerHTML = `<section><div class="container"><a href="../projects.html" class="back-link">← Все проекты</a><h1>Проект не найден</h1><p class="section-lead">Не найден файл projects/${id}/data.js</p></div></section>`;
  };
  document.body.appendChild(script);
}

loadProject();