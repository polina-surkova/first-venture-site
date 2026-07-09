const projects = (window.FV_PROJECTS || []).filter(p => p.published !== false);
const grid = document.getElementById("grid");
const search = document.getElementById("search");
const industry = document.getElementById("industry");
const status = document.getElementById("status");

[...new Set(projects.map(p => p.industry).filter(Boolean))].sort().forEach(i => {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  industry.appendChild(opt);
});

function render() {
  const q = search.value.toLowerCase();
  const ind = industry.value;
  const st = status.value;

  const filtered = projects.filter(p => {
    const text = [p.name, p.short, p.industry, ...(p.tags || [])].join(" ").toLowerCase();
    return text.includes(q) && (ind === "all" || p.industry === ind) && (st === "all" || p.status === st);
  });

  grid.innerHTML = filtered.map(p => `
    <article class="catalog-card">
      <div class="catalog-logo">${p.logoText || "FV"}</div>
      <span class="tag">${p.statusLabel || p.status || "Проект"}</span>
      <h3>${p.name}</h3>
      <p>${p.short || ""}</p>
      <div class="tags">${(p.tags || []).map(t => `<span>${t}</span>`).join("")}</div>
      <a class="btn secondary small" href="projects/project.html?id=${encodeURIComponent(p.id)}">Подробнее</a>
    </article>
  `).join("");

  if (!filtered.length) {
    grid.innerHTML = `<article class="catalog-card"><h3>Ничего не найдено</h3><p>Попробуйте изменить фильтр или поисковый запрос.</p></article>`;
  }
}

search.addEventListener("input", render);
industry.addEventListener("change", render);
status.addEventListener("change", render);
render();