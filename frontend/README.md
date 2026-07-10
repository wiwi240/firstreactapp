# React Todo App

This folder contains the front-end project delivered for the exercise. The application is a small React todo app built with Vite to practice core React concepts in a simple, readable project.

## Project Location

- `frontend/front-app/`

## Overview

The application fetches a short list of todos from a public API, displays them in a styled interface, lets the user add tasks locally, toggle completion, and switch the UI language between French and English.

## Features

- fetches 5 todos from a public JSON API on initial load
- filters invalid API data before storing it in state
- displays loading and error states
- adds new todos locally through a controlled form
- toggles completion status by clicking on a todo item
- supports French and English through a language selector

## Tech Stack

- React
- Vite
- JavaScript (`.jsx`)
- CSS

## How to Run the Application

From the repository root:

```bash
cd frontend/front-app
npm install
npm run dev
```

## Production Build

```bash
cd frontend/front-app
npm run build
```

## API Used

- `https://jsonplaceholder.typicode.com/todos?_limit=5`

## Project Structure

- `frontend/front-app/src/App.jsx` - main application logic, state management, API call, translations, and language selection
- `frontend/front-app/src/components/Header.jsx` - reusable header component receiving translated props
- `frontend/front-app/src/components/TodoItem.jsx` - todo item component handling click-based completion toggle
- `frontend/front-app/src/App.css` - component-level styles
- `frontend/front-app/src/index.css` - global styles

## How AI Helped

AI was used to:

- generate the initial component structure
- implement `useState`, `useEffect`, and the `fetch` workflow
- suggest a simple and readable UI
- help reorganize the project so it matches the exercise requirements

## What Was Modified

- the default Vite starter content was replaced with a todo application
- reusable components were added in `src/components/`
- API loading, filtering, error handling, and local todo creation were implemented
- a language switcher was added for French and English
- the project structure was cleaned to remove template leftovers and duplicate documentation
