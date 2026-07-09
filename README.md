# First Venture No-Build CMS

Эта версия работает без Python, без сборки и без сервера.

## Как добавить новый проект

1. Создать папку:

`projects/new-project/`

2. Скопировать туда файл:

`projects/_template-data.js`

и переименовать в:

`projects/new-project/data.js`

3. Заполнить поля внутри `data.js`.

4. Добавить карточку проекта в файл:

`assets/js/project-manifest.js`

Пример:

```js
{
  id: "new-project",
  name: "Название проекта",
  logoText: "NP",
  industry: "Software",
  status: "partner",
  statusLabel: "Партнерский проект",
  tags: ["SaaS", "B2B"],
  short: "Короткое описание для карточки каталога.",
  folder: "new-project",
  published: true
}
```

5. Страница проекта будет доступна по ссылке:

`projects/project.html?id=new-project`

## Как скрыть проект

В `assets/js/project-manifest.js` поставь:

`published: false`

## Как я могу помогать

Ты присылаешь deck. Я разбираю его и возвращаю:
- блок для `project-manifest.js`;
- файл `data.js`;
- при необходимости готовую папку проекта.