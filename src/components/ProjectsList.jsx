import { useEffect, useState } from 'react'

const API_URL = '/api/projects'

const EMPTY_FORM = {
  title: '',
  description: '',
}

function buildResponseErrorMessage(response, fallbackMessage) {
  if (response.status === 404) {
    return `Route API introuvable (${API_URL}). Verifie l'URL ou le proxy Vite.`
  }

  if (response.status >= 500) {
    return "Le serveur a rencontre une erreur. Verifie le terminal Rails."
  }

  return fallbackMessage
}

async function parseJsonSafely(response) {
  const contentType = response.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    return null
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

function buildNetworkErrorMessage(error) {
  if (error instanceof TypeError) {
    return `Impossible de joindre l'API ${API_URL}. Verifie que Rails tourne et que le proxy Vite est actif.`
  }

  return error.message || 'Une erreur reseau est survenue.'
}

function ProjectsList() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProjects() {
      try {
        setIsLoading(true)
        setErrorMessage('')

        const response = await fetch(API_URL, { signal: controller.signal })
        const data = await parseJsonSafely(response)

        if (!response.ok) {
          throw new Error(
            buildResponseErrorMessage(
              response,
              'Impossible de recuperer les projets.',
            ),
          )
        }

        setProjects(Array.isArray(data) ? data : [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage(buildNetworkErrorMessage(error))
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProjects()

    return () => controller.abort()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const title = form.title.trim()
    const description = form.description.trim()

    if (!title || !description) {
      setErrorMessage('Le titre et la description sont obligatoires.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      const data = await parseJsonSafely(response)

      if (!response.ok) {
        throw new Error(
          data?.error ||
            buildResponseErrorMessage(
              response,
              'Impossible de creer le projet.',
            ),
        )
      }

      setProjects((currentProjects) => [data, ...currentProjects])
      setForm(EMPTY_FORM)
    } catch (error) {
      setErrorMessage(buildNetworkErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="projects-panel">
      <div className="projects-copy">
        <p className="intro">
          Cette interface consomme une API Rails locale. Le formulaire envoie un
          `POST` JSON et la liste est rechargee en memoire cote front.
        </p>
        <p className="endpoint">
          Endpoint utilise: {API_URL} via le proxy Vite vers Rails
        </p>
      </div>

      <form className="project-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Titre</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: MVP de gestion de projets"
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Explique en une phrase ce que fait le projet."
            rows="4"
          />
        </label>

        <button className="project-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Envoi...' : 'Ajouter le projet'}
        </button>
      </form>

      <div className="projects-meta">
        <span>{projects.length} projets charges</span>
        <span>GET + POST vers Rails</span>
      </div>

      {isLoading && <p className="status-message">Chargement des projets...</p>}
      {errorMessage && <p className="status-message error">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProjectsList
