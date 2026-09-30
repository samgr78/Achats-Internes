# Achats internes

Application de gestion des demandes d'achat internes : enveloppes budgétaires, demandes, validation, commandes, réceptions et suivi des engagements.

## Stack

- **backend/** — Laravel 13 (API uniquement, authentification SPA par cookie via Sanctum)
- **frontend/** — Vue 3 + Vite, Pinia, Vue Router, Axios, Tailwind CSS
- **MySQL 8.4** via Docker Compose

## Démarrage (Docker)

```bash
make setup   # première installation
make up      # démarrer
make down    # arrêter
make test    # tests backend
make reset   # base réinitialisée + seed
```

- Frontend : http://localhost:8080
- API : http://localhost:8000/api

## Développement local (sans Docker)

```bash
cd backend && cp .env.example .env && composer install && php artisan key:generate && php artisan migrate --seed && php artisan serve
```

```bash
cd frontend && npm install && npm run dev
```

Le serveur Vite (http://localhost:5173) proxifie `/api` et `/sanctum` vers le backend.

## Architecture backend

```
app/
├── Http/Controllers/Api/   contrôleurs fins : délèguent aux Actions / Services
├── Http/Requests/          validation des entrées
├── Http/Resources/         format JSON renvoyé au front
├── Http/Middleware/
├── Actions/                cas d'usage unitaires (une classe = une action)
├── DTOs/                   objets de transfert typés entre couches
├── Services/               logique métier
├── Repositories/           accès aux données (+ Contracts/ pour les interfaces)
├── Models/
├── Ai/                     génération de résumés IA (+ prompts/)
├── Policies/               droits
├── Enums/
├── Exceptions/
└── Support/                utilitaires (Money…)
```

Les liaisons interface → implémentation se déclarent dans `AppServiceProvider::$bindings`.
