# Integration Front / Back

## Objectif

Ce projet relie un front React a un backend Rails via une API JSON simple.

- `GET /api/projects` retourne la liste des projets
- `POST /api/projects` ajoute un projet en memoire

Le stockage est volontairement fait en memoire pour rester sur un MVP d'integration.

## Structure

- `backend/` : application Rails API
- `src/` : front React principal du depot
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

Le CORS est active dans `backend/config/initializers/cors.rb` pour autoriser `http://localhost:5173`.

## Frontend

Le front React utilise le composant `src/components/ProjectsList.jsx`.

Ce composant :

- charge les projets au montage avec `fetch("http://localhost:3000/api/projects")`
- affiche les reponses JSON dans une liste
- envoie un `POST` JSON avec `title` et `description`
- met a jour la liste locale apres creation
- affiche les etats de chargement et les erreurs reseau/API

## Lancer le projet

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

## Tests a faire

1. Ouvrir le front dans le navigateur
2. Verifier que les projets seed du backend s'affichent
3. Ajouter un projet avec le formulaire
4. Verifier dans les DevTools :
   - la requete `GET /api/projects`
   - la requete `POST /api/projects`
   - les reponses JSON
5. Verifier qu'aucune erreur CORS n'apparait

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
- ajout d'un test d'integration Rails pour `GET` et `POST`

## Limites connues

- les donnees sont perdues au redemarrage du serveur Rails
- il n'y a pas de base de donnees
- la validation reste minimale

Ce choix est volontaire pour respecter le scope de l'exercice et se concentrer sur l'integration HTTP entre le front et le back.
