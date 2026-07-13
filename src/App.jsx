import { useState } from 'react'
import Header from './components/Header'
import ProjectsList from './components/ProjectsList'
import './App.css'

const TRANSLATIONS = {
  fr: {
    projectLabel: 'Projet 01',
    title: 'Front React connecte a une API Rails',
    intro:
      'Objectif: recuperer des projets depuis le backend et en creer de nouveaux via un formulaire React.',
    languageLabel: 'Langue',
    languages: {
      fr: 'Francais',
      en: 'English',
    },
  },
  en: {
    projectLabel: 'Project 01',
    title: 'React frontend connected to a Rails API',
    intro:
      'Goal: fetch projects from the backend and create new ones through a React form.',
    languageLabel: 'Language',
    languages: {
      fr: 'Francais',
      en: 'English',
    },
  },
}

function App() {
  const [language, setLanguage] = useState('fr')
  const copy = TRANSLATIONS[language]

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
        <ProjectsList key={language} />
      </section>
    </main>
  )
}

export default App
