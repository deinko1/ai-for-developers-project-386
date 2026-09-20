# Календарь звонков


[![hexlet-check](https://github.com/deinko1/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/deinko1/ai-for-developers-project-386/actions)

Разработайте совместно с ИИ сервис для бронирования календаря

Учебный проект Хекслета: https://ru.hexlet.io/programs/ai-for-developers
Как это должно работать: https://files.hexlet.app/a/2ipc5m

## Стек

- **Backend:** Ruby on Rails 8.1 (API-only), PostgreSQL 18
- **Frontend:** Vite 8 + React 19 + TypeScript + Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/)
- **Менеджер версий:** [mise](https://mise.jdx.dev/) (Ruby 3.4, Node 24)
- **Запуск обоих серверов:** foreman (`Procfile.dev`)

## Структура

```text
.
├── backend/        # Rails API (http://localhost:3000)
├── frontend/       # Vite + React (http://localhost:5173)
├── Makefile        # команды разработки
├── Procfile.dev    # запуск backend + frontend вместе
└── mise.toml       # версии Ruby и Node
```

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

## Использование

Запустить оба сервера одной командой:

```bash
make dev
```

- API: <http://localhost:3000>
- Проверка API: <http://localhost:3000/api/v1/health>
- Frontend: <http://localhost:5173>

Запросы с фронтенда на `/api/*` проксируются на Rails (см. `frontend/vite.config.ts`), поэтому CORS в разработке не нужен.

Полезные команды:

```bash
make help            # список всех команд
make backend         # только Rails API (:3000)
make frontend        # только Vite (:5173)
make test            # тесты Rails + проверка типов TypeScript
make lint            # RuboCop + oxlint
make build           # production-сборка фронтенда
make console         # Rails console
make routes          # список маршрутов
make db-migrate      # миграции
```

<!-- Добавьте запись asciinema — именно это смотрит работодатель -->

### shadcn/ui

Tailwind CSS v4 и shadcn/ui настроены (`frontend/components.json`), но готовых UI-компонентов пока нет — проект на этапе bootstrap.
Добавить компонент по мере необходимости:

```bash
cd frontend
npx shadcn@latest add button
```

## Переменные окружения

| Переменная | Где | Назначение |
| --- | --- | --- |
| `DATABASE_URL` | backend | Подключение к PostgreSQL (переопределяет `config/database.yml`) |
| `FRONTEND_ORIGIN` | backend | Дополнительный origin для CORS в production |
| `RAILS_MAX_THREADS` | backend | Размер пула соединений (по умолчанию 5) |

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
