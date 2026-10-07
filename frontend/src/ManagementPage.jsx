import { useState } from 'react'
import logo from './assets/logo.jpg'

const adminAccessCode = import.meta.env.VITE_ADMIN_ACCESS_CODE || 'ADMIN2026'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V3" /></>,
    building: <><path d="M4 21V5l8-3v19" /><path d="M12 8h8v13" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    dollar: <><path d="M12 2v20M17 5.5h-5.5a3.5 3.5 0 0 0 0 7h7a3.5 3.5 0 0 1 0 7H6.5" /></>,
    key: <><circle cx="8" cy="15" r="4" /><path d="m12 11 9-1v3l-2 1v2l-2 1-1-1-1 1-1-1" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    arrowLeft: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>
  }

  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const dashboardTabs = [
  { name: 'Vue d’ensemble', icon: 'chart' },
  { name: 'Mes projets', icon: 'building' },
  { name: 'Clients', icon: 'users' },
  { name: 'Finances', icon: 'dollar' }
]

const projects = [
  { name: 'Résidence Moderne', location: 'Alger · Ain Benian', status: 'Actif', value: 'DZD 12,9M' },
  { name: 'Maison d’exception', location: 'Alger · Hydra', status: 'En attente', value: 'DZD 18,5M' },
  { name: 'Villa de campagne', location: 'Oran · Sidi El Houari', status: 'Actif', value: 'DZD 24M' }
]

function ManagementPage({ onBack }) {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('yele-admin-session') === 'true')
  const [accessCode, setAccessCode] = useState('')
  const [accessError, setAccessError] = useState('')
  const [activeTab, setActiveTab] = useState('Vue d’ensemble')
  const [modalOpen, setModalOpen] = useState(false)
  const [added, setAdded] = useState(false)

  const handleLogin = (event) => {
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

  const addProperty = (event) => {
    event.preventDefault()
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setModalOpen(false)
    }, 900)
  }

  if (!authenticated) {
    return (
      <section className="admin-login-page">
        <button className="admin-back" type="button" onClick={onBack}><Icon name="arrowLeft" /> Retour à la page principale</button>
        <div className="admin-login-card">
          <div className="admin-login-logo"><img src={logo} alt="Logo YELE IMMOBILIER" /></div>
          <p className="eyebrow"><span /> Espace privé</p>
          <h1>Administration</h1>
          <p className="admin-login-intro">Accédez uniquement à votre espace de gestion YELE IMMOBILIER.</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="admin-code">Code d’accès administrateur</label>
            <div className="admin-code-field"><Icon name="lock" /><input id="admin-code" type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} placeholder="Saisissez le code" autoComplete="current-password" required /></div>
            {accessError && <p className="admin-login-error">{accessError}</p>}
            <button className="button button-dark admin-login-button" type="submit">Accéder au tableau de bord <Icon name="arrow" /></button>
          </form>
          <p className="admin-demo-note">Échantillon frontend : le code de démonstration est <strong>ADMIN2026</strong>. La vérification réelle doit être reliée à l’authentification backend.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-page">
      <div className="admin-page-header">
        <div><p className="eyebrow"><span /> Espace réservé</p><h1>Gestion YELE</h1><p>Portefeuille, projets et opérations en un seul espace.</p></div>
        <div className="admin-header-actions"><button type="button" onClick={logout}>Déconnexion</button><div><span>YI</span><div><strong>Yele Manager</strong><small>Administrateur</small></div></div></div>
      </div>

      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand"><img src={logo} alt="Logo YELE IMMOBILIER" /></div>
          <nav aria-label="Navigation de gestion">
            {dashboardTabs.map((tab) => <button key={tab.name} className={activeTab === tab.name ? 'active' : ''} onClick={() => setActiveTab(tab.name)}><Icon name={tab.icon} /> {tab.name}</button>)}
          </nav>
          <div className="admin-sidebar-footer"><Icon name="key" /><div><strong>Mode frontend</strong><small>Accès local simulé</small></div></div>
        </aside>

        <div className="admin-content">
          <div className="admin-content-header">
            <div><small>Tableau de bord /</small><h2>{activeTab}</h2></div>
            <div><button className="admin-icon-button" type="button" aria-label="Notifications"><Icon name="bell" /><i /></button><button className="button button-dark" type="button" onClick={() => setModalOpen(true)}><Icon name="plus" /> Ajouter un projet</button></div>
          </div>

          <div className="admin-metrics">
            <article><span>Valeur du portefeuille</span><strong>DZD 84,2M</strong><small>↗ 8,4% ce mois</small></article>
            <article><span>Projets actifs</span><strong>24</strong><small>+3 cette semaine</small></article>
            <article><span>Transactions</span><strong>18</strong><small>6 en attente</small></article>
          </div>

          {activeTab === 'Vue d’ensemble' && (
            <div className="admin-dashboard-grid">
              <article className="admin-chart-card"><div><small>Évolution du portefeuille</small><strong>+18,4%</strong></div><div className="admin-chart-bars"><i style={{ height: '32%' }} /><i style={{ height: '48%' }} /><i style={{ height: '38%' }} /><i style={{ height: '62%' }} /><i style={{ height: '54%' }} /><i style={{ height: '78%' }} /><i style={{ height: '92%' }} /></div></article>
              <article className="admin-activity-card"><div><small>Activité récente</small><button type="button">Voir tout</button></div><ul><li><span>✓</span><div><strong>Projet ajouté</strong><small>Résidence Moderne · 2 min</small></div></li><li><span>↗</span><div><strong>Financement confirmé</strong><small>Maison d’exception · 1 h</small></div></li></ul></article>
            </div>
          )}

          {activeTab === 'Mes projets' && (
            <article className="admin-table-card"><div className="admin-table-heading"><div><small>Portefeuille</small><h3>Projets actifs</h3></div><button type="button">Filtrer</button></div><table><thead><tr><th>Projet</th><th>Localisation</th><th>Statut</th><th>Valeur</th></tr></thead><tbody>{projects.map((project) => <tr key={project.name}><td><strong>{project.name}</strong></td><td>{project.location}</td><td><span>{project.status}</span></td><td>{project.value}</td></tr>)}</tbody></table></article>
          )}

          {activeTab === 'Clients' && <article className="admin-empty-card"><span><Icon name="users" /></span><h3>Clients</h3><p>Le module clients sera connecté à votre base de données dans la prochaine étape.</p></article>}
          {activeTab === 'Finances' && <article className="admin-empty-card"><span><Icon name="dollar" /></span><h3>Finances</h3><p>Les rapports financiers seront ajoutés avec la connexion backend.</p></article>}
        </div>
      </div>

      {modalOpen && <div className="admin-modal-backdrop" onMouseDown={() => setModalOpen(false)}><form className="admin-modal" onSubmit={addProperty} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="admin-modal-close" onClick={() => setModalOpen(false)}><Icon name="close" /></button><p className="eyebrow"><span /> Nouveau projet</p><h2>Ajouter un projet</h2><p>Les données resteront locales dans cette version frontend.</p><label>Nom du projet<input required placeholder="Ex. Appartement Résidence" /></label><label>Localisation<input required placeholder="Ville, quartier" /></label><label>Valeur estimée<input required placeholder="DZD 00 000 000" /></label><button className="button button-dark" type="submit">{added ? <><Icon name="check" /> Projet ajouté</> : <><Icon name="plus" /> Enregistrer</>}</button></form></div>}
    </section>
  )
}

export default ManagementPage
