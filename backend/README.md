# Backend — Rails API

Rails 8.1 (API-only) на PostgreSQL для проекта «Bocal». Установка, запуск и общие команды — в корневом [README](../README.md).

- API: <http://localhost:3000>
- Проверка: <http://localhost:3000/api/v1/health>

```bash
make backend      # запустить Rails API на :3000
make console      # Rails console
make routes       # список маршрутов
make db-migrate   # миграции
make backend-test # тесты (Minitest)
make backend-lint # RuboCop
```

Тесты лежат в `test/`, переменные окружения (`DATABASE_URL`, `RAILS_MAX_THREADS` и др.) описаны в корневом README.
