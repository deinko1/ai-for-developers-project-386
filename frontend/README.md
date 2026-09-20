# Frontend — Vite + React

Vite 8 + React 19 + TypeScript + Tailwind CSS 4 для проекта «Календарь звонков». Установка, запуск и общие команды — в корневом [README](../README.md).

- Dev-сервер: <http://localhost:5173>
- Запросы на `/api/*` проксируются на Rails (`vite.config.ts`)

```bash
make frontend            # запустить Vite на :5173
make frontend-test       # тесты (Vitest)
make frontend-watch      # тесты в режиме watch
make frontend-typecheck  # проверка типов TypeScript
make frontend-lint       # oxlint
make build               # production-сборка
```

Тесты — Vitest + React Testing Library (`src/**/*.test.tsx`), UI-компоненты — [shadcn/ui](https://ui.shadcn.com/).
