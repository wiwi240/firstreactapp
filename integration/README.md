# Integration Front / Back

## Objectif

Ce projet relie un front React a un backend Rails via une API JSON simple.

- `GET /api/projects` retourne la liste des projets
- `POST /api/projects` ajoute un projet en memoire

Le stockage est volontairement fait en memoire pour rester sur un MVP d'integration.

## Structure

- `backend/` : application Rails API
- `src/` : front React principal du depot
- `scripts/dev-all.sh` : script qui lance Rails et Vite ensemble
- `integration/README.md` : cette documentation

## Backend

Le backend expose un controleur `Api::ProjectsController` avec deux actions :

- `index` retourne le tableau `PROJECTS_STORE` en JSON
- `create` lit `title` et `description` depuis un corps JSON, valide qu'ils ne sont pas vides, puis ajoute le projet en tete du tableau

Les routes sont definies dans `backend/config/routes.rb` :

```ruby
namespace :api do
  resources :projects, only: [:index, :create]
end
```

Le CORS est active dans `backend/config/initializers/cors.rb` pour autoriser `http://localhost:5173` et `http://127.0.0.1:5173`.

## Frontend

Le front React utilise le composant `src/components/ProjectsList.jsx`.

Ce composant :

- charge les projets au montage avec `fetch("/api/projects")`
- affiche les reponses JSON dans une liste
- envoie un `POST` JSON avec `title` et `description`
- met a jour la liste locale apres creation
- affiche les etats de chargement et les erreurs reseau/API

Le front ne contacte plus Rails avec une URL absolue.
Les appels API passent par `/api/*`, puis sont rediriges par Vite vers Rails grace au proxy defini dans `vite.config.js`.

Le front affiche aussi :

- un message d'erreur explicite si l'API est indisponible
- un message d'erreur explicite si la route API est introuvable
- une page `404` si l'URL front demandee n'existe pas

## Lancer le projet

### Methode simple

Depuis la racine du depot `module app-react` :

```bash
npm run dev:all
```

Cette commande lance :

- le backend Rails sur `http://localhost:3000`
- le front Vite sur `http://localhost:5173`
- le proxy Vite qui redirige `/api/*` vers Rails

Pour tout arreter, fais `Ctrl+C`.

Important :

- lance cette commande depuis la racine du projet
- ne la lance pas depuis `backend/`

### Methode manuelle

### 1. Installer les dependances Rails

Depuis la racine du depot :

```bash
cd backend
bundle install
```

### 2. Lancer le backend

```bash
cd backend
bin/rails server
```

Le backend tourne alors sur `http://localhost:3000`.

### 3. Installer les dependances front

Depuis la racine du depot :

```bash
npm install
```

### 4. Lancer le front

```bash
npm run dev
```

Le front tourne alors sur `http://localhost:5173`.
Les appels API du front passent par `/api/*`, puis sont rediriges par Vite vers `http://127.0.0.1:3000`.

## Quel port ouvrir

- `http://localhost:5173` : interface React
- `http://localhost:3000/api/projects` : API Rails
- n'ouvre pas `http://localhost:3000` pour utiliser le front, sinon tu arrives sur Rails

## Tests a faire

1. Ouvrir le front dans le navigateur
2. Verifier que les projets seed du backend s'affichent
3. Ajouter un projet avec le formulaire
4. Verifier dans les DevTools :
   - la requete `GET /api/projects`
   - la requete `POST /api/projects`
   - les reponses JSON
5. Verifier qu'aucune erreur CORS n'apparait

Tests d'erreur utiles :

- si Rails est arrete, le front doit afficher un message indiquant que l'API est injoignable
- si la route API n'existe pas, le front doit afficher un message indiquant que la route est introuvable
- si tu ouvres une URL front inexistante comme `http://localhost:5173/test`, le front doit afficher une page `404`

## Comment l'IA a aide

L'IA a servi a accelerer la generation du squelette et a proposer la structure de base :

- creation du backend Rails API
- generation du controleur `ProjectsController`
- configuration initiale du CORS
- generation du composant React et des appels `fetch`

## Modifications faites et relues

Les modifications appliquees manuellement et relues sont les suivantes :

- ajout de `rack-cors` dans le backend
- ajout d'un store memoire `PROJECTS_STORE`
- implementation des actions `index` et `create`
- ajout des routes `namespace :api`
- remplacement de l'ancienne app Todo par une integration front/back
- ajout d'un formulaire React connecte a l'API
- ajout d'un proxy Vite pour eviter les problemes `localhost` / `127.0.0.1`
- ajout d'une commande unique `npm run dev:all`
- ajout d'un affichage `404` cote front pour les URL inexistantes
- ajout de messages d'erreur plus explicites cote front
- ajout d'un test d'integration Rails pour `GET` et `POST`

## Limites connues

- les donnees sont perdues au redemarrage du serveur Rails
- il n'y a pas de base de donnees
- la validation reste minimale

Ce choix est volontaire pour respecter le scope de l'exercice et se concentrer sur l'integration HTTP entre le front et le back.
