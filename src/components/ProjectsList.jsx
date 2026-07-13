import { useEffect, useState } from 'react'

const API_URL = '/api/projects'

const EMPTY_FORM = {
  title: '',
  description: '',
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

        if (!response.ok) {
          throw new Error('Impossible de recuperer les projets.')
        }

        const data = await response.json()
        setProjects(Array.isArray(data) ? data : [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage(error.message || 'Une erreur reseau est survenue.')
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

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Impossible de creer le projet.')
      }

      setProjects((currentProjects) => [data, ...currentProjects])
      setForm(EMPTY_FORM)
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur reseau est survenue.')
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
