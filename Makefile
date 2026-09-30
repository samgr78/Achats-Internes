.PHONY: setup up down test reset

setup: ## Première installation : .env, build, clé, migrations + seed
	@test -f backend/.env || cp backend/.env.example backend/.env
	docker compose build
	@KEY=$$(docker compose run --rm --no-deps backend php artisan key:generate --show) && \
		sed -i.bak "s|^APP_KEY=.*|APP_KEY=$$KEY|" backend/.env && rm -f backend/.env.bak
	docker compose up -d
	docker compose exec backend php artisan migrate --seed --force

up: ## Démarre les conteneurs
	docker compose up -d

down: ## Arrête les conteneurs
	docker compose down

test: ## Lance les tests backend
	docker compose exec backend php artisan test

reset: ## Recrée la base et rejoue le seed
	docker compose exec backend php artisan migrate:fresh --seed --force
