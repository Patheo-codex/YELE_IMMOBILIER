import { useState } from 'react'
import logo from './assets/logo.jpg'
import ManagementPage from './ManagementPage.jsx'
import './App.css'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    key: <><circle cx="8" cy="15" r="4"/><path d="m12 11 9-1v3l-2 1v2l-2 1-1-1-1 1-1-1"/></>,
    building: <><path d="M4 21V5l8-3v19"/><path d="M12 8h8v13"/><path d="M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.45-1.19a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    dollar: <><path d="M12 2v20M17 5.5h-5.5a3.5 3.5 0 0 0 0 7h7a3.5 3.5 0 0 1 0 7H6.5"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></>
  }
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const properties = [
  { title: 'Maison d’exception', location: 'Algiers · Hydra', price: 'DZD 18 500 000', type: 'Maison', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85' },
  { title: 'Résidence moderne', location: 'Algiers · Ain Benian', price: 'DZD 12 900 000', type: 'Appartement', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c251c31?auto=format&fit=crop&w=1200&q=85' },
  { title: 'Villa de campagne', location: 'Oran · Sidi El Houari', price: 'DZD 24 000 000', type: 'Villa', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85' }
]

const services = [
  { icon: 'home', title: 'Acheter', text: 'Acquisition, vente et location de biens sélectionnés avec une expertise humaine.' },
  { icon: 'key', title: 'Financement', text: 'Une accompagnement financier adapté, du calcul à la négociation de votre prêt.' },
  { icon: 'building', title: 'Immobilier tiers', text: 'Gestion complète de votre portefeuille avec optimisation et suivi transparent.' },
  { icon: 'chart', title: 'Conseil', text: 'Pilotage de projets, analyse de marché et stratégie de croissance durable.' }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState('home')
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [contactSent, setContactSent] = useState(false)

  const filtered = properties.filter(item => `${item.title} ${item.location} ${item.type}`.toLowerCase().includes(search.toLowerCase()))

  const updateContactForm = event => setContactForm({ ...contactForm, [event.target.name]: event.target.value })
  const submitContactForm = event => {
    event.preventDefault()
    setContactSent(true)
  }

  if (currentPage === 'management') {
    return <ManagementPage onBack={() => setCurrentPage('home')} />
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a href="#accueil" className="brand" aria-label="YELE IMMOBILIER, accueil">
          <img className="brand-logo" src={logo} alt="Logo YELE IMMOBILIER" />
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigation principale">
          <a href="#accueil" onClick={() => setMenuOpen(false)}>Accueil</a>
          <a href="#biens" onClick={() => setMenuOpen(false)}>Biens</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <button className="management-link" type="button" onClick={() => { setMenuOpen(false); setCurrentPage('management') }}>Gestion</button>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <a className="contact-link" href="tel:+2250757279305"><Icon name="phone" size={17} /> +225 0757279305</a>
          <a className="button button-dark" href="#contact">Nous contacter</a>
          <button className="menu-button" type="button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow"><span /> Agence immobilière · Côte d’Ivoire</p>
            <h1>Votre patrimoine<br /><em>prend forme.</em></h1>
            <p className="hero-copy">Nous transformons vos ambitions immobilières en décisions claires, sécurisées et durablement accompagnées.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#biens">Découvrir nos biens <Icon name="arrow" /></a>
              <a className="text-link" href="#services">Explorez nos services <span>↗</span></a>
            </div>
          </div>
          <div className="hero-card">
            <span>01</span>
            <div><strong>Est. 2021</strong><small>Expertise locale & nationale</small></div>
          </div>
          <div className="scroll-cue"><span>Découvrir</span><i /></div>
        </section>

        <section className="trust-strip">
          <p>Une expertise construite sur</p>
          <div><strong>+5 ans</strong><span>d’expérience</span></div>
          <div><strong>50+</strong><span>projets accompagnés</span></div>
          <div><strong>98%</strong><span>clients satisfaits</span></div>
          <div><strong>24/7</strong><span>suivi de votre patrimoine</span></div>
        </section>

        <section className="section properties-section" id="biens">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> Sélection du moment</p><h2>Des biens qui<br />font la différence.</h2></div>
            <p>Une sélection rigoureuse de maisons, apparts et villas, pensés pour répondre à des projets qui comptent.</p>
          </div>
          <div className="property-tools">
            <div className="search-box"><Icon name="search" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un bien..." aria-label="Rechercher un bien" /></div>
            <span>{filtered.length} biens disponibles</span>
          </div>
          <div className="property-grid">
            {filtered.map((item, index) => (
              <article className="property-card" key={item.title}>
                <div className="property-image"><img src={item.image} alt={item.title} /><span>{item.type}</span><button type="button" aria-label={`Préférer ${item.title}`}>♡</button></div>
                <div className="property-info"><div><h3>{item.title}</h3><p><Icon name="location" size={15} /> {item.location}</p></div><strong>{item.price}</strong></div>
                <a href="#contact">En savoir plus <Icon name="arrow" size={16} /></a>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty-state">Aucun bien ne correspond à votre recherche.</div>}
        </section>

        <section className="services-section" id="services">
          <div className="services-intro">
            <p className="eyebrow light"><span /> Ce que nous faisons</p>
            <h2>Un partenaire pour<br />toutes les étapes.</h2>
            <p>De la première idée au dernier appartement, nous réunissons les expertises nécessaires pour avancer sans complexité.</p>
            <a className="button button-outline" href="#contact">Parler de votre projet <Icon name="arrow" /></a>
          </div>
          <div className="services-grid">
            {services.map((service, index) => <article className="service-card" key={service.title}><span className="service-number">0{index + 1}</span><div className="service-icon"><Icon name={service.icon} /></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Découvrir ${service.title}`}>↗</a></article>)}
          </div>
        </section>

        <section className="testimonial-section">
          <p className="eyebrow light"><span /> Témoignage</p>
          <blockquote>“YeLé immobilier ma permis de trouver un bon terrain avec une clarté exceptionnelle.”</blockquote>
          <div className="author"><span>AM</span><div><strong>Monsieur Ben</strong><small>Propriétaire · Côte d’Ivoire</small></div></div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-intro"><p className="eyebrow"><span /> Notre bureau</p><h2>Prêt à construire<br />votre avenir ?</h2><p>Parlez-nous de votre projet. Nous vous répondrons sous 24 heures.</p>
            <div className="contact-details">
              <a href="tel:+2250757279305"><Icon name="phone" /><span><small>Appelez-nous</small><strong>+225 0757279305</strong></span></a>
              <a href="mailto:contact@yeleimmobilier.dz"><Icon name="mail" /><span><small>Écrivez-nous</small><strong>contact@yeleimmobilier.dz</strong></span></a>
              <div><Icon name="location" /><span><small>Nous nous trouvons</small><strong>Abidjan, Côte d’Ivoire</strong></span></div>
            </div>
          </div>
          <div className="contact-form-card">
            {contactSent ? (
              <div className="contact-success" role="status"><span><Icon name="check" size={28} /></span><h3>Votre demande est enregistrée.</h3><p>Merci, {contactForm.name}. Nous vous contacterons bientôt pour répondre à votre projet.</p><button className="button button-dark" type="button" onClick={() => { setContactSent(false); setContactForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}>Envoyer une autre demande</button></div>
            ) : (
              <form className="contact-form" onSubmit={submitContactForm}>
                <div className="form-row"><label>Nom complet<input type="text" name="name" value={contactForm.name} onChange={updateContactForm} placeholder="Votre nom" required /></label><label>Adresse e-mail<input type="email" name="email" value={contactForm.email} onChange={updateContactForm} placeholder="vous@email.dz" required /></label></div>
                <div className="form-row"><label>Numéro de téléphone<input type="tel" name="phone" value={contactForm.phone} onChange={updateContactForm} placeholder="+225 00 00 00 00" /></label><label>Objet<input type="text" name="subject" value={contactForm.subject} onChange={updateContactForm} placeholder="Ex. Achat d’un bien" required /></label></div>
                <label>Votre message<textarea name="message" value={contactForm.message} onChange={updateContactForm} placeholder="Parlez-nous de votre projet..." rows="5" required /></label>
                <button className="button button-dark form-submit" type="submit">Envoyer ma demande <Icon name="arrow" /></button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer><a href="#accueil" className="brand footer-brand"><img className="brand-logo" src={logo} alt="Logo YELE IMMOBILIER" /></a><p>© 2026 YELE IMMOBILIER. Construit pour l’avenir.</p><div><a href="#services">Services</a><a href="#biens">Biens</a><a href="#contact">Contact</a></div></footer>
    </div>
  )
}

export default App
