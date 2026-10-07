import { useState } from 'react'
import './App.css'

const adminAccessCode = import.meta.env.VITE_ADMIN_ACCESS_CODE || 'ADMIN2026'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    building: <><path d="M4 21V5l8-3v19" /><path d="M12 8h8v13" /><path d="M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    dollar: <><path d="M12 2v20M17 5.5h-5.5a3.5 3.5 0 0 0 0 7h7a3.5 3.5 0 0 1 0 7H6.5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.34 1.88V22a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 20a1.7 1.7 0 0 0-1.88-.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.88-.34H2a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4 9a1.7 1.7 0 0 0 .34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .34-1.88V2a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4a1.7 1.7 0 0 0 1.88.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.36.35.68.6 1 .3.3.7.5 1.1.5H22a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 20 15a1.7 1.7 0 0 0-.6 1Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowLeft: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    folder: <><path d="M3 6h6l2 2h10v11H3z" /></>
  }
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const initialProjects = [
  { id: 1, name: 'Résidence Moderne', location: 'Alger · Ain Benian', status: 'Actif', value: 'DZD 12,9M', owner: 'Amina Merabet' },
  { id: 2, name: 'Maison d’exception', location: 'Alger · Hydra', status: 'En attente', value: 'DZD 18,5M', owner: 'Khaled Benali' },
  { id: 3, name: 'Villa de campagne', location: 'Oran · Sidi El Houari', status: 'Actif', value: 'DZD 24M', owner: 'Lina Bensaid' }
]

const navItems = [
  { label: 'Vue d’ensemble', icon: 'grid' },
  { label: 'Mes projets', icon: 'building' },
  { label: 'Clients', icon: 'users' },
  { label: 'Finances', icon: 'dollar' }
]

function App() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('yele-admin-session') === 'true')
  const [accessCode, setAccessCode] = useState('')
  const [accessError, setAccessError] = useState('')
  const [activeSection, setActiveSection] = useState('Vue d’ensemble')
  const [projects, setProjects] = useState(initialProjects)
  const [modalOpen, setModalOpen] = useState(false)
  const [projectForm, setProjectForm] = useState({ name: '', location: '', value: '', owner: '' })
  const [saved, setSaved] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    if (accessCode.trim() !== adminAccessCode) {
      setAccessError('Le code d’accès est incorrect.')
      return
    }
    sessionStorage.setItem('yele-admin-session', 'true')
    setAuthenticated(true)
    setAccessError('')
  }

  const logout = () => {
    sessionStorage.removeItem('yele-admin-session')
    setAuthenticated(false)
    setAccessCode('')
  }

  const addProject = event => {
    event.preventDefault()
    const newProject = { id: Date.now(), ...projectForm, status: 'Actif' }
    setProjects(current => [newProject, ...current])
    setProjectForm({ name: '', location: '', value: '', owner: '' })
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      setModalOpen(false)
    }, 900)
  }

  const filteredProjects = projects.filter(project =>
    `${project.name} ${project.location} ${project.owner}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!authenticated) {
    return (
      <main className="admin-login-shell">
        <button className="admin-login-return" type="button" onClick={() => window.location.assign('/')}><Icon name="arrowLeft" /> Retour au site</button>
        <section className="admin-login-panel">
          <div className="admin-login-brand"><span>YI</span><div><strong>YELE</strong><small>IMMOBILIER</small></div></div>
          <p className="admin-kicker">Espace privé</p>
          <h1>Administration</h1>
          <p className="admin-login-copy">Accédez uniquement à votre espace de gestion YELE IMMOBILIER.</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="admin-code">Code d’accès administrateur</label>
            <div className="admin-code-input"><Icon name="lock" /><input id="admin-code" type="password" value={accessCode} onChange={event => setAccessCode(event.target.value)} placeholder="Saisissez le code" autoComplete="current-password" required /></div>
            {accessError && <p className="admin-error">{accessError}</p>}
            <button className="admin-primary-button" type="submit">Accéder au tableau de bord <Icon name="arrow" /></button>
          </form>
          <p className="admin-demo-note">Demo frontend : le code par défaut est <strong>ADMIN2026</strong>. La protection réelle doit être gérée par le backend.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="admin-dashboard-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand"><span>YI</span><div><strong>YELE</strong><small>IMMOBILIER</small></div></div>
        <nav aria-label="Navigation administrateur">
          {navItems.map(item => <button key={item.label} className={activeSection === item.label ? 'active' : ''} onClick={() => setActiveSection(item.label)}><Icon name={item.icon} />{item.label}</button>)}
        </nav>
        <div className="admin-sidebar-bottom"><Icon name="settings" /><div><strong>Mode frontend</strong><small>Accès local simulé</small></div></div>
      </aside>

      <section className="admin-dashboard">
        <header className="admin-topbar">
          <div><p>GESTION / {activeSection.toUpperCase()}</p><h1>{activeSection}</h1></div>
          <div className="admin-topbar-actions"><button className="admin-icon-button" type="button" aria-label="Notifications"><Icon name="bell" /><i /></button><div className="admin-user"><span>YM</span><div><strong>Yele Manager</strong><small>Administrateur</small></div></div><button className="admin-logout" type="button" onClick={logout}>Déconnexion</button></div>
        </header>

        <div className="admin-content">
          {activeSection === 'Vue d’ensemble' && (
            <>
              <div className="admin-metrics">
                <article><span>Valeur du portefeuille</span><strong>DZD 84,2M</strong><small>↗ 8,4% ce mois</small></article>
                <article><span>Projets actifs</span><strong>{projects.filter(project => project.status === 'Actif').length}</strong><small>+3 cette semaine</small></article>
                <article><span>Transactions</span><strong>18</strong><small>6 en attente</small></article>
              </div>
              <div className="admin-overview-grid">
                <article className="admin-chart-card"><div><div><small>Évolution du portefeuille</small><strong>+18,4%</strong></div><span>6 mois</span></div><div className="admin-bars"><i style={{ height: '32%' }} /><i style={{ height: '48%' }} /><i style={{ height: '38%' }} /><i style={{ height: '62%' }} /><i style={{ height: '54%' }} /><i style={{ height: '78%' }} /><i style={{ height: '92%' }} /></div></article>
                <article className="admin-activity-card"><div><small>Activité récente</small><button type="button">Voir tout</button></div><ul><li><span>✓</span><div><strong>Projet ajouté</strong><small>Résidence Moderne · 2 min</small></div></li><li><span>↗</span><div><strong>Financement confirmé</strong><small>Maison d’exception · 1 h</small></div></li></ul></article>
              </div>
            </>
          )}

          {activeSection === 'Mes projets' && (
            <article className="admin-projects-card">
              <div className="admin-panel-heading"><div><small>Portefeuille</small><h2>Projets</h2></div><button className="admin-primary-button compact" type="button" onClick={() => setModalOpen(true)}><Icon name="plus" /> Ajouter un projet</button></div>
              <div className="admin-search"><Icon name="search" /><input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Rechercher un projet..." aria-label="Rechercher un projet" /></div>
              <div className="admin-table-wrap">
                <table>
                  <thead><tr><th>Projet</th><th>Localisation</th><th>Propriétaire</th><th>Statut</th><th>Valeur</th></tr></thead>
                  <tbody>{filteredProjects.map(project => <tr key={project.id}><td><strong>{project.name}</strong></td><td>{project.location}</td><td>{project.owner}</td><td><span className={project.status === 'Actif' ? 'status-active' : 'status-pending'}>{project.status}</span></td><td>{project.value}</td></tr>)}</tbody>
                </table>
              </div>
            </article>
          )}

          {activeSection === 'Clients' && <article className="admin-placeholder-card"><span><Icon name="users" /></span><h2>Clients</h2><p>Le module clients sera relié à la base de données dans la prochaine étape.</p></article>}
          {activeSection === 'Finances' && <article className="admin-placeholder-card"><span><Icon name="dollar" /></span><h2>Finances</h2><p>Les rapports financiers seront ajoutés avec la connexion backend.</p></article>}
        </div>
      </section>

      {modalOpen && (
        <div className="admin-modal-backdrop" onMouseDown={() => setModalOpen(false)}>
          <form className="admin-modal" onSubmit={addProject} onMouseDown={event => event.stopPropagation()}>
            <button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)} aria-label="Fermer"><Icon name="close" /></button>
            <p className="admin-kicker">Nouveau projet</p><h2>Ajouter un projet</h2><p>Les données sont stockées uniquement dans l’état frontend de cette session.</p>
            <label>Nom du projet<input required value={projectForm.name} onChange={event => setProjectForm({ ...projectForm, name: event.target.value })} placeholder="Ex. Appartement Résidence" /></label>
            <label>Localisation<input required value={projectForm.location} onChange={event => setProjectForm({ ...projectForm, location: event.target.value })} placeholder="Ville, quartier" /></label>
            <div className="admin-form-row"><label>Valeur estimée<input required value={projectForm.value} onChange={event => setProjectForm({ ...projectForm, value: event.target.value })} placeholder="DZD 00 000 000" /></label><label>Propriétaire<input required value={projectForm.owner} onChange={event => setProjectForm({ ...projectForm, owner: event.target.value })} placeholder="Nom complet" /></label></div>
            <button className="admin-primary-button" type="submit">{saved ? <><Icon name="check" /> Projet ajouté</> : <><Icon name="plus" /> Enregistrer le projet</>}</button>
          </form>
        </div>
      )}
    </main>
  )
}

export default App
