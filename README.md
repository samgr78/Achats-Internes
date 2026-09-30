# Achats internes

Application de gestion des demandes d'achat internes : enveloppes budgétaires, demandes, validation, commandes, réceptions et suivi des engagements.

## Stack

Un seul projet Laravel 13 qui sert à la fois l'API et le front :

- **API** — Laravel (`routes/api.php`), authentification par cookie de session via Sanctum
- **Front** — Vue 3 (SPA) dans `resources/js/`, compilé par Vite : Vue Router, Pinia, Axios, Tailwind CSS
- **MySQL 8.4** via Docker Compose

Laravel renvoie `resources/views/app.blade.php` pour toute URL hors `/api` ; Vue Router prend ensuite le relais. Front et API partagent la même origine : pas de CORS.

## Démarrage (Docker)

```bash
make setup   # première installation
make up      # démarrer
make down    # arrêter
make test    # tests
make reset   # base réinitialisée + seed
```

Application : http://localhost:8000

## Développement local (sans Docker)

```bash
cp .env.example .env && composer install && npm install && php artisan key:generate && php artisan migrate --seed
```

```bash
composer run dev
```

`composer run dev` lance le serveur Laravel, la file de jobs, les logs et Vite en même temps.

## Architecture

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

resources/js/
├── app.js                  point d'entrée (Vue + Pinia + Router)
├── api/                    tous les appels Axios (http.js = instance commune)
├── stores/                 Pinia (utilisateur connecté, rôle)
├── router/                 routes + gardes
├── views/                  pages
├── components/
└── utils/
```

Les liaisons interface → implémentation se déclarent dans `AppServiceProvider::$bindings`.
