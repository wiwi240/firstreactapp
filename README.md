# Projet 01 - Front React + API Rails

Ce depot contient un exercice d'integration entre un front React et un backend Rails API.

## Objectif

Relier un front `React + Vite` a une API Rails locale avec :

- `GET /api/projects`
- `POST /api/projects`

Les projets sont stockes en memoire pour rester sur un MVP simple.

## Structure

- `backend/` : application Rails API
- `src/` : front React principal
- `integration/README.md` : documentation detaillee de l'integration

## Lancer le projet

### Backend

```bash
cd backend
bundle install
bin/rails server
```

Le backend tourne sur `http://localhost:3000`.

### Frontend

```bash
npm install
npm run dev
```

Le front tourne sur `http://localhost:5173`.

## Fonctionnalites

- recuperation de la liste des projets via l'API Rails
- creation d'un projet via un formulaire React
- configuration CORS pour autoriser `localhost:5173`
- test d'integration Rails pour `GET` et `POST`

## Documentation detaillee

Voir [integration/README.md](/home/mon_pc/project/github/module%20thp/vibecoding/module%20app-react/integration/README.md:1) pour le detail des choix techniques, des modifications et des tests.
