import { LitElement, css, unsafeCSS } from 'lit-element'
import { sectionStyles, revealStyles, buttonStyles, sharedAnimations } from '../shared-styles.js'
import { RevealMixin } from '../reveal-mixin.js'
import localCss from './app-projects.css?inline'
import { template } from './app-projects.template.js'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  Java: '#b07219',
  Dart: '#00b4ab',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Shell: '#89e051',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4f5d95',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#701516',
  Kotlin: '#a97bff',
  Swift: '#fa7343',
  Astro: '#ff5d01',
}

const CACHE_TTL = 60 * 60 * 1000

const PRIVATE_REPOS = [
  {
    name: 'ARAnet',
    homepage: 'https://aranet.tech/',
    description:
      'Landing de ARANET — proveedor de internet de fibra óptica en El Pangui, Zamora Chinchipe, Ecuador. Construido con Next.js 16, React 19, TypeScript y Tailwind CSS 4.',
    language: 'TypeScript',
    topics: ['react', 'typescript', 'landing-page', 'nextjs', 'tailwindcss', 'framer-motion', 'vercel'],
  },
  {
    name: 'acropole-fit-center',
    homepage: 'https://acropole-fit-center.vercel.app/',
    description:
      'Sitio web del studio Acropole Fit Center · Pole Dance, Pole Sport y flexibilidad en Loja, Ecuador.',
    language: 'JavaScript',
    topics: ['react', 'i18n', 'landing-page', 'nextjs', 'css-modules'],
  },
  {
    name: 'boskanacrochet',
    homepage: 'https://boskanacrochet.vercel.app/',
    description:
      'Sitio web de Boskana Crochet — catálogo de amigurumis, bolsos y accesorios tejidos a mano. Construido con Astro + Tailwind.',
    language: 'Astro',
    topics: ['ecommerce', 'catalog', 'astro', 'tailwindcss'],
  },
]

export class AppProjects extends RevealMixin(LitElement) {
  static get properties() {
    return {
      lang: { type: String },
      user: { type: String },
      repos: { type: Array },
      loading: { type: Boolean },
      error: { type: String },
    }
  }

  constructor() {
    super()
    this.lang = 'es'
    this.user = 'KBGR55'
    this.repos = []
    this.loading = true
    this.error = ''
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchRepos()
  }

  updated(changed) {
    if (changed.has('lang') || changed.has('repos') || changed.has('loading')) {
      this._setupReveal()
    }
  }

  _privateRepos() {
    return PRIVATE_REPOS.map((r) => {
      let domain = r.homepage
      try {
        domain = new URL(r.homepage).hostname.replace(/^www\./, '')
      } catch (e) {}
      return {
        name: r.name,
        description: r.description || '',
        html_url: '',
        homepage: r.homepage,
        domain,
        language: r.language || null,
        stars: 0,
        forks: 0,
        topics: r.topics || [],
        updated: '',
        private: true,
      }
    })
  }

  async _fetchRepos() {
    const cacheKey = `gh_repos_${this.user}_v4`
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null')
      if (cached && Date.now() - cached.t < CACHE_TTL && Array.isArray(cached.data)) {
        this.repos = [...this._privateRepos(), ...cached.data]
        this.loading = false
        return
      }
    } catch (e) {}

    try {
      const res = await fetch(
        `https://api.github.com/users/${this.user}/repos?per_page=100&sort=updated`,
      )
      if (!res.ok) throw new Error(`GitHub ${res.status}`)
      const all = await res.json()
      const filtered = all
        .filter(
          (r) =>
            !r.fork &&
            !r.archived &&
            !r.private &&
            !/\.github\.io$/i.test(r.name) &&
            r.description &&
            r.description.trim().length > 0,
        )
        .map((r) => ({
          name: r.name,
          description: r.description.trim(),
          html_url: r.html_url,
          homepage: r.homepage && r.homepage.trim() ? r.homepage.trim() : '',
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          topics: r.topics || [],
          updated: r.updated_at,
        }))
        .sort((a, b) => {
          if (b.stars !== a.stars) return b.stars - a.stars
          return new Date(b.updated) - new Date(a.updated)
        })
      this.repos = [...this._privateRepos(), ...filtered]
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data: filtered }))
      } catch (e) {}
    } catch (err) {
      this.error = err.message || 'fetch error'
      this.repos = this._privateRepos()
    } finally {
      this.loading = false
    }
  }

  _langColor(l) {
    return LANG_COLORS[l] || '#a855f7'
  }

  static get styles() {
    return [sectionStyles, revealStyles, buttonStyles, sharedAnimations, css`${unsafeCSS(localCss)}`]
  }

  render() {
    return template(this)
  }
}

customElements.define('app-projects', AppProjects)
