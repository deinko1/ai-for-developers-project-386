# Настройка репозитория

Разовые настройки GitHub-репозитория, которые не хранятся в файлах и нужны для защиты ветки и работы release-please. Обычные команды разработки — в корневом [README](../README.md).

Чтобы PR можно было смёржить только после успешных проверок, включите защиту ветки `main`.

1. Сначала запушьте ветку и откройте PR — GitHub показывает в списке только те проверки, которые уже хотя бы раз запускались.
2. **Settings → Branches → Add branch protection rule**, pattern `main`:
   - **Require a pull request before merging** — прямой пуш в `main` станет недоступен;
   - **Require status checks to pass before merging** — отметьте `Lint`, `Backend`, `Frontend`, `Commit messages`;
   - при желании — **Require branches to be up to date before merging**.
3. **Settings → Actions → General → Allow GitHub Actions to create and approve pull requests**.
4. Секрет `RELEASE_PLEASE_TOKEN` (fine-grained PAT, `Contents` + `Pull requests: write`) — без него PR от release-please создаются штатным `GITHUB_TOKEN`, CI на них не запускается, и обязательные проверки блокируют релизный PR навсегда.
