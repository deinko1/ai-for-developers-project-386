# Календарь звонков

[![hexlet-check](https://github.com/deinko1/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/deinko1/ai-for-developers-project-386/actions)

Сервис для бронирования календаря звонков, разработанный совместно с ИИ.

Учебный проект Хекслета: https://ru.hexlet.io/programs/ai-for-developers
Как это должно работать: https://files.hexlet.app/a/2ipc5m

## Стек

- **Backend:** Ruby on Rails 8.1 (API-only), PostgreSQL 18
- **Frontend:** Vite 8 + React 19 + TypeScript + Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/)
- **Менеджер версий:** [mise](https://mise.jdx.dev/) (Ruby 3.4, Node 24)
- **Запуск обоих серверов:** foreman (`Procfile.dev`)
- **Тесты и линтеры:** Minitest + SimpleCov + RuboCop (backend), Vitest + React Testing Library + oxlint (frontend)

## Требования

- macOS / Linux
- [Homebrew](https://brew.sh/)
- [mise](https://mise.jdx.dev/getting-started.html)
- PostgreSQL

```bash
# Ruby-зависимости для сборки (macOS)
brew install openssl@3 libyaml gmp rust postgresql@18
brew services start postgresql@18

# Версии инструментов из mise.toml
mise install
gem install rails
```

## Установка

```bash
git clone https://github.com/deinko1/ai-for-developers-project-386.git
cd ai-for-developers-project-386
make setup
```

`make setup` устанавливает гемы и npm-пакеты и готовит базу данных.

После клонирования установите git-хуки (pre-commit запускает `make check`, commit-msg проверяет формат сообщений):

```bash
make hooks
```

## Запуск

Запустить оба сервера одной командой:

```bash
make dev
```

- API: <http://localhost:3000>
- Проверка API: <http://localhost:3000/api/v1/health>
- Frontend: <http://localhost:5173>

Запросы с фронтенда на `/api/*` проксируются на Rails (см. `frontend/vite.config.ts`), поэтому CORS в разработке не нужен.

Запустить серверы по отдельности или посмотреть все команды:

```bash
make backend  # только Rails API (:3000)
make frontend # только Vite (:5173)
make help     # полный список команд с описанием
```

## Тесты

Одна команда для полной проверки — линтеры, тесты и типы:

```bash
make check
```

Запустить только тесты или проверку типов:

```bash
make test               # тесты Rails + тесты фронтенда + проверка типов
make backend-test       # тесты Rails (Minitest)
make frontend-test      # тесты фронтенда (Vitest)
make frontend-typecheck # проверка типов TypeScript
```

Правило проекта: каждая новая фича приходит вместе с тестами. Фронтенд — Vitest + React Testing Library (`frontend/src/**/*.test.tsx`), бэкенд — Minitest (`backend/test/`).

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
