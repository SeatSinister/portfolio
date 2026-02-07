# Развёртывание портфолио в интернете

## Вариант 1: GitHub Pages (рекомендуется, бесплатно)

### Шаг 1: Создайте репозиторий на GitHub

1. Откройте https://github.com/new
2. Название: `portfolio`
3. Репозиторий: **Public**
4. **Не** добавляйте README, .gitignore — проект уже готов
5. Нажмите **Create repository**

### Шаг 2: Загрузите код

В терминале (в папке `portfolio`):

```bash
git remote add origin https://github.com/SeatSinister/portfolio.git
git push -u origin main
```

(Замените `SeatSinister` на ваш GitHub-username, если отличается)

### Шаг 3: Включите GitHub Pages

1. В репозитории: **Settings** → **Pages**
2. В разделе **Source** выберите **Deploy from a branch**
3. Branch: **main**, папка: **/ (root)**
4. Нажмите **Save**

### Готово

Сайт будет доступен по адресу:
**https://seatsinister.github.io/portfolio/**

(Обычно публикация занимает 1–2 минуты.)

---

## Вариант 2: Netlify (альтернатива)

1. Зарегистрируйтесь на https://netlify.com (можно через GitHub)
2. В терминале: `npx netlify deploy --prod --dir=.`
3. Войдите в Netlify через браузер
4. Укажите папку `.` (корень проекта)
5. После деплоя Netlify выдаст ссылку на сайт

---

## Вариант 3: Vercel

1. Зарегистрируйтесь на https://vercel.com
2. В терминале: `npx vercel`
3. Войдите в аккаунт по инструкциям
4. После деплоя получите ссылку вида `https://portfolio-xxx.vercel.app`
