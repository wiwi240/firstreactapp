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

## Prerequis

- `Node.js`
- `npm`
- `Ruby`
- `Bundler`
- `Rails`

## Lancer le projet

### Methode simple

Depuis la racine du depot `module app-react` :

```bash
npm run dev:all
```

Cette commande lance :

- le backend Rails sur `http://localhost:3000`
- le front Vite sur `http://localhost:5173`
- le proxy Vite redirige `/api/*` vers Rails

Pour tout arreter, fais `Ctrl+C`.

Important :

- lance cette commande depuis la racine du projet
- ne la lance pas depuis `backend/`

### Methode manuelle

Ouvre deux terminaux a la racine du depot.

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
Les appels API du front passent par `/api/*`, puis sont rediriges par Vite vers `http://127.0.0.1:3000`.

## Quel port ouvrir

- `http://localhost:5173` : interface React
- `http://localhost:3000/api/projects` : API Rails
- n'ouvre pas `http://localhost:3000` pour utiliser le front, sinon tu arrives sur Rails

## Ce que fait le projet

- recuperation de la liste des projets via l'API Rails
- creation d'un projet via un formulaire React
- proxy Vite pour eviter les erreurs d'URL front `localhost` / `127.0.0.1`
- configuration CORS cote Rails pour les appels directs a l'API
- test d'integration Rails pour `GET` et `POST`

## Tester manuellement

### 1. Verifier l'API seule

Dans un navigateur ou avec `curl`, ouvre :

```bash
curl http://localhost:3000/api/projects
```

Tu dois recevoir un tableau JSON de projets.

### 2. Verifier le front

Ouvre `http://localhost:5173`.

Tu dois voir :

- la liste des projets venant du backend
- un champ `Titre`
- un champ `Description`
- un bouton pour ajouter un projet

### 3. Verifier la liaison front / back

Ajoute un projet depuis le formulaire.

Tu dois constater :

- une requete `POST /api/projects` cote navigateur
- une redirection de cette requete vers Rails par Vite
- une reponse `201 Created`
- le nouveau projet qui apparait dans la liste

### 4. Verifier dans les DevTools

Dans l'onglet Network du navigateur :

- la requete `GET /api/projects` doit repondre `200`
- la requete `POST /api/projects` doit repondre `201`
- il ne doit pas y avoir d'erreur CORS

## Verifications rapides

### Front

```bash
npm run build
```

### Back

```bash
cd backend
bundle exec rails test
```

## Probleme courant

Si le front ne charge rien :

- verifie que Rails tourne bien sur `localhost:3000`
- verifie que Vite tourne bien sur `localhost:5173`
- verifie que tu es bien sur `http://localhost:5173`
- verifie les erreurs dans la console navigateur
- verifie que le proxy `/api` existe dans `vite.config.js`

## Documentation detaillee

Voir [integration/README.md](/home/mon_pc/project/github/module%20thp/vibecoding/module%20app-react/integration/README.md:1) pour le detail des choix techniques, des modifications et des tests.
