.PHONY: setup up down test reset

setup: ## Première installation : .env, build, clé, migrations + seed
	@test -f .env || cp .env.example .env
	docker compose build
	@KEY=$$(docker compose run --rm --no-deps app php artisan key:generate --show) && \
		sed -i.bak "s|^APP_KEY=.*|APP_KEY=$$KEY|" .env && rm -f .env.bak
	docker compose up -d
	docker compose exec app php artisan migrate --seed --force

up: ## Démarre les conteneurs
	docker compose up -d

down: ## Arrête les conteneurs
	docker compose down

test: ## Lance les tests
	docker compose exec app php artisan test

reset: ## Recrée la base et rejoue le seed
	docker compose exec app php artisan migrate:fresh --seed --force
