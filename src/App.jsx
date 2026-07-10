import { useEffect, useState } from 'react'
import Header from './components/Header'
import TodoItem from './components/TodoItem'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
const TRANSLATIONS = {
  fr: {
    projectLabel: 'Projet 01',
    title: 'Ma premiere app React Todo',
    intro:
      'Cette mini application charge 5 taches depuis une API puis te laisse en ajouter localement.',
    languageLabel: 'Langue',
    inputLabel: 'Nouvelle tache',
    inputPlaceholder: 'Ajouter une tache...',
    addButton: 'Ajouter',
    tasksLabel: 'taches',
    completedLabel: 'terminees',
    loadingMessage: 'Chargement des taches...',
    fetchError: 'Impossible de recuperer les taches depuis l API.',
    unknownError: 'Une erreur inconnue est survenue.',
    apiSource: 'Depuis l API',
    localSource: 'Ajoute localement',
    languages: {
      fr: 'Francais',
      en: 'English',
    },
  },
  en: {
    projectLabel: 'Project 01',
    title: 'My First React Todo App',
    intro:
      'This small app loads 5 tasks from an API and lets you add more locally.',
    languageLabel: 'Language',
    inputLabel: 'New task',
    inputPlaceholder: 'Add a task...',
    addButton: 'Add',
    tasksLabel: 'tasks',
    completedLabel: 'completed',
    loadingMessage: 'Loading tasks...',
    fetchError: 'Unable to load tasks from the API.',
    unknownError: 'An unknown error occurred.',
    apiSource: 'From API',
    localSource: 'Added locally',
    languages: {
      fr: 'Francais',
      en: 'English',
    },
  },
}

function App() {
  const [language, setLanguage] = useState('fr')
  const [todos, setTodos] = useState([])
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorKey, setErrorKey] = useState('')
  const copy = TRANSLATIONS[language]

  useEffect(() => {
    let isMounted = true

    async function fetchTodos() {
      try {
        setIsLoading(true)
        setErrorKey('')

        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('fetch_error')
        }

        const data = await response.json()

        const formattedTodos = data
          .filter((todo) => typeof todo.title === 'string' && todo.title.trim() !== '')
          .map((todo) => ({
            id: todo.id,
            title: todo.title,
            completed: Boolean(todo.completed),
            source: 'api',
          }))

        if (isMounted) {
          setTodos(formattedTodos)
        }
      } catch (fetchError) {
        if (isMounted) {
          setErrorKey(fetchError.message || 'unknown_error')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchTodos()

    return () => {
      isMounted = false
    }
  }, [])

  function handleAddTodo(event) {
    event.preventDefault()

    const trimmedTitle = newTodoTitle.trim()

    if (!trimmedTitle) {
      return
    }

    const localTodo = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
      source: 'local',
    }

    setTodos((currentTodos) => [localTodo, ...currentTodos])
    setNewTodoTitle('')
  }

  function handleToggleTodo(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const errorMessage =
    errorKey === 'fetch_error'
      ? copy.fetchError
      : errorKey === 'unknown_error'
        ? copy.unknownError
        : errorKey

  return (
    <main className="app-shell">
      <section className="todo-card">
        <div className="toolbar">
          <label className="language-switcher" htmlFor="language-select">
            <span>{copy.languageLabel}</span>
            <select
              id="language-select"
              className="language-select"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="fr">{copy.languages.fr}</option>
              <option value="en">{copy.languages.en}</option>
            </select>
          </label>
        </div>

        <Header eyebrow={copy.projectLabel} title={copy.title} />

        <p className="intro">{copy.intro}</p>

        <form className="todo-form" onSubmit={handleAddTodo}>
          <label className="sr-only" htmlFor="todo-title">
            {copy.inputLabel}
          </label>
          <input
            id="todo-title"
            className="todo-input"
            type="text"
            placeholder={copy.inputPlaceholder}
            value={newTodoTitle}
            onChange={(event) => setNewTodoTitle(event.target.value)}
          />
          <button className="todo-button" type="submit">
            {copy.addButton}
          </button>
        </form>

        <div className="todo-meta">
          <span>
            {todos.length} {copy.tasksLabel}
          </span>
          <span>
            {completedCount} {copy.completedLabel}
          </span>
        </div>

        {isLoading && <p className="status-message">{copy.loadingMessage}</p>}
        {errorMessage && !isLoading && (
          <p className="status-message error">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                apiSourceLabel={copy.apiSource}
                localSourceLabel={copy.localSource}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
