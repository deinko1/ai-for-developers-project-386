SHELL    := /bin/bash
# make runs recipes in a non-interactive shell that does not load ~/.zshrc,
# so put mise and Homebrew on PATH explicitly.
export PATH := $(HOME)/.local/bin:/opt/homebrew/bin:$(PATH)

MISE     := mise exec --
BACKEND  := backend
FRONTEND := frontend

.DEFAULT_GOAL := help

.PHONY: help setup install backend-install frontend-install db-prepare db-migrate db-reset \
        console routes dev backend frontend test check lint backend-lint frontend-lint \
        backend-test frontend-test frontend-typecheck backend-coverage frontend-coverage \
        hooks build clean

help: ## Show available commands
	@grep -hE '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

setup: install db-prepare ## Install dependencies and prepare the database

install: backend-install frontend-install ## Install all dependencies

backend-install: ## Install Ruby gems
	cd $(BACKEND) && $(MISE) bundle install

frontend-install: ## Install npm packages
	cd $(FRONTEND) && $(MISE) npm install

db-prepare: ## Create the database (if needed) and run migrations
	cd $(BACKEND) && $(MISE) bin/rails db:prepare

db-migrate: ## Run pending migrations
	cd $(BACKEND) && $(MISE) bin/rails db:migrate

db-reset: ## Drop, recreate, load schema and seed the database
	cd $(BACKEND) && $(MISE) bin/rails db:reset

console: ## Open the Rails console
	cd $(BACKEND) && $(MISE) bin/rails console

routes: ## List backend routes
	cd $(BACKEND) && $(MISE) bin/rails routes

dev: ## Run the Rails API (:3000) and Vite (:5173) together
	BUNDLE_GEMFILE=$(BACKEND)/Gemfile $(MISE) bundle exec foreman start -f Procfile.dev

backend: ## Run only the Rails API server on :3000
	cd $(BACKEND) && $(MISE) bin/rails server -p 3000

frontend: ## Run only the Vite dev server on :5173
	cd $(FRONTEND) && $(MISE) npm run dev

test: backend-test frontend-test frontend-typecheck ## Run all tests and type checks

check: lint test ## Run linters, tests and type checks (used by CI and the pre-commit hook)

backend-test: ## Run Rails tests
	cd $(BACKEND) && $(MISE) bin/rails test

frontend-test: ## Run frontend tests (Vitest)
	cd $(FRONTEND) && $(MISE) npm run test

frontend-watch: ## Run frontend tests in watch mode
	cd $(FRONTEND) && $(MISE) npm run test:watch

frontend-typecheck: ## Type-check the frontend
	cd $(FRONTEND) && $(MISE) npx tsc -b

backend-coverage: ## Run Rails tests with a SimpleCov coverage report
	cd $(BACKEND) && $(MISE) bin/rails test
	@echo "Coverage report: $(BACKEND)/coverage/index.html"

frontend-coverage: ## Run frontend tests with a coverage report
	cd $(FRONTEND) && $(MISE) npm run test:coverage

hooks: ## Install the git hooks (pre-commit runs `make check`)
	git config core.hooksPath .githooks
	@echo "Git hooks installed from .githooks/"

lint: backend-lint frontend-lint ## Lint both apps

backend-lint: ## RuboCop
	cd $(BACKEND) && $(MISE) bundle exec rubocop

frontend-lint: ## oxlint
	cd $(FRONTEND) && $(MISE) npm run lint

build: ## Build the frontend for production
	cd $(FRONTEND) && $(MISE) npm run build

clean: ## Remove build artifacts and caches
	rm -rf $(FRONTEND)/dist $(FRONTEND)/node_modules/.vite
	rm -f $(BACKEND)/log/*.log
	rm -rf $(BACKEND)/tmp/cache
