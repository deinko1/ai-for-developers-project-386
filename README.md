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
- **Тесты и линтеры:** Minitest + SimpleCov + RuboCop (backend), Vitest + React Testing Library + oxlint (frontend)

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

После клонирования установите git-хук с проверками перед коммитом:

```bash
make hooks
```

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
make test            # тесты Rails + тесты фронтенда + проверка типов
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

## Тесты и линтеры

Одна команда для полной проверки — линтеры, тесты и типы:

```bash
make check
```

Отдельные команды:

```bash
make backend-test       # тесты Rails (Minitest)
make frontend-test      # тесты фронтенда (Vitest)
make frontend-watch     # тесты фронтенда в режиме watch — удобно при разработке
make frontend-typecheck # проверка типов TypeScript
make backend-lint       # RuboCop
make frontend-lint      # oxlint
make backend-coverage   # тесты Rails + отчёт SimpleCov (backend/coverage/index.html)
make frontend-coverage  # тесты фронтенда + отчёт о покрытии
```

Правило проекта: каждая новая фича приходит вместе с тестами. Фронтенд — Vitest + React Testing Library (`frontend/src/**/*.test.tsx`), бэкенд — Minitest (`backend/test/`). Для примера сейчас есть по одному тесту с каждой стороны.

Чтобы проверки запускались автоматически перед каждым коммитом, один раз после клонирования установите git-хук:

```bash
make hooks
```

Хук выполняет `make check`; при необходимости его можно обойти через `git commit --no-verify`.

## Соглашение о коммитах

Сообщения коммитов следуют [Conventional Commits](https://www.conventionalcommits.org/):

```text
<тип>(<область>): <описание>
```

Например:

```text
feat(backend): add bookings endpoint
fix(frontend): handle empty calendar state
test(backend): cover health endpoint
docs: describe commit convention
```

Основные типы: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Формат проверяется автоматически хуком `commit-msg` (commitlint + `@commitlint/config-conventional`, конфиг в `.commitlintrc.json`). Хук ставится вместе с остальными:

```bash
make hooks
```

Обойти проверку можно через `git commit --no-verify`. В CI сообщения коммитов проверяются для pull request'ов.

## Релизы

Версии и `CHANGELOG.md` генерируются автоматически из Conventional Commits с помощью [release-please](https://github.com/googleapis/release-please); workflow — `.github/workflows/release-please.yml`. Это ещё одна причина следовать соглашению о коммитах: `fix:` даёт patch-версию, `feat:` — minor, а `feat!:` или футер `BREAKING CHANGE:` — major.

Как это работает: после пуша в `main` release-please создаёт или обновляет pull request с новой версией и записями в `CHANGELOG.md`. Пока PR не смержен, релиз не выходит — мержим PR и получаем git-тег `vX.Y.Z` и GitHub Release.

Первый релиз появится после первого коммита `feat:` или `fix:`: текущая история зафиксирована через `bootstrap-sha` в `release-please-config.json`.

Условия, которые нужно настроить один раз в репозитории:

- **Settings → Actions → General → «Allow GitHub Actions to create and approve pull requests»** — иначе release-please не сможет открыть PR.
- Секрет `RELEASE_PLEASE_TOKEN` (fine-grained PAT с правами `Contents` и `Pull requests: write`) — если включена защита ветки, без него обязательные проверки блокируют релизный PR. Подробнее — в разделе [CI и защита ветки](#ci-и-защита-ветки).

## CI и защита ветки

Workflow `.github/workflows/ci.yml` запускается на каждый pull request и на пуш в `main` и состоит из трёх задач:

| Проверка (required check) | Что делает |
| --- | --- |
| `Backend` | RuboCop, Brakeman, bundler-audit и тесты Rails |
| `Frontend` | oxlint, проверка типов и тесты Vitest |
| `Commit messages` | commitlint по коммитам PR (только для pull request'ов) |

Чтобы PR можно было смёржить только после успешных проверок, включите защиту ветки `main`. Это настройка репозитория, в файлах она не хранится:

1. Сначала запушьте ветку и откройте PR — GitHub показывает в списке только те проверки, которые уже хотя бы раз запускались.
2. **Settings → Branches → Add branch protection rule**, pattern `main`:
   - **Require a pull request before merging** — прямой пуш в `main` станет недоступен;
   - **Require status checks to pass before merging** — отметьте `Backend`, `Frontend`, `Commit messages`;
   - при желании — **Require branches to be up to date before merging**.
3. **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests**.
4. Секрет `RELEASE_PLEASE_TOKEN` (fine-grained PAT, `Contents` + `Pull requests: write`) — без него PR от release-please создаются штатным `GITHUB_TOKEN`, CI на них не запускается, и обязательные проверки блокируют релизный PR навсегда.

Тот же набор проверок локально запускается командой `make check`.

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
