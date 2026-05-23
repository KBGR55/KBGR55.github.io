import { html } from 'lit-element'
import { getT } from '../i18n.js'
import { icon } from '../icons.js'

const MAX_TOPICS = 5

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch (e) {
    return url
  }
}

function browserHeader(host, repo) {
  const initial = repo.name.replace(/[^a-z0-9]/gi, '').charAt(0).toUpperCase()
  let urlIcon
  let urlText
  if (repo.private) {
    urlIcon = 'lock'
    urlText = repo.domain
  } else if (repo.homepage) {
    urlIcon = 'globe'
    urlText = domainOf(repo.homepage)
  } else {
    urlIcon = 'github'
    urlText = `github.com/${host.user}/${repo.name}`
  }
  return html`
    <div class="browser-mock">
      <div class="browser-bar">
        <span class="b-dot"></span><span class="b-dot"></span><span class="b-dot"></span>
        <span class="browser-url">${icon(urlIcon)} ${urlText}</span>
      </div>
      <div class="browser-screen">
        <span class="screen-glyph">${initial}</span>
        ${repo.homepage
          ? html`<span class="screen-live"><span class="live-dot"></span> Live</span>`
          : ''}
      </div>
    </div>
  `
}

function topicsRow(repo) {
  if (!repo.topics || !repo.topics.length) return ''
  const shown = repo.topics.slice(0, MAX_TOPICS)
  const rest = repo.topics.length - shown.length
  return html`
    <div class="card-topics">
      ${shown.map((tp) => html`<span class="topic-chip">${tp}</span>`)}
      ${rest > 0 ? html`<span class="topic-chip more">+${rest}</span>` : ''}
    </div>
  `
}

function projectCard(host, repo) {
  const t = getT(host.lang)
  const langColor = host._langColor(repo.language)
  const styleVar = `--lang-color: ${langColor}; --accent: ${langColor};`
  return html`
    <article class="project-card reveal ${repo.private ? 'private-card' : ''}" style="${styleVar}">
      ${browserHeader(host, repo)}
      <div class="card-body">
        <div class="card-titlebar">
          <h3 class="card-title">${repo.name}</h3>
          ${repo.private
            ? html`<span class="private-tag">${icon('lock')} ${t.projects.private}</span>`
            : ''}
        </div>

        ${repo.description ? html`<p class="card-desc">${repo.description}</p>` : ''}

        ${topicsRow(repo)}

        <div class="card-foot">
          <span class="lang-chip">
            <span class="lang-dot"></span>
            ${repo.language || '—'}
          </span>
          ${repo.private
            ? ''
            : html`
                <span class="card-stats">
                  <span class="stat"><span class="ico">${icon('star')}</span>${repo.stars}</span>
                  <span class="stat"><span class="ico">${icon('gitFork')}</span>${repo.forks}</span>
                </span>
              `}
        </div>

        <div class="card-actions">
          ${repo.private
            ? ''
            : html`
                <a class="btn-action ghost" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                  ${icon('github')} <span>${t.projects.code}</span>
                </a>
              `}
          ${repo.homepage
            ? html`
                <a
                  class="btn-action filled ${repo.private ? 'wide' : ''}"
                  href="${repo.homepage}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ${icon('externalLink')} <span>${t.projects.live}</span>
                </a>
              `
            : ''}
        </div>
      </div>
    </article>
  `
}

export function template(host) {
  const t = getT(host.lang)
  return html`
    <section>
      <div class="section-header">
        <h2 class="section-title">${t.projects.title}</h2>
        <div class="section-line"></div>
      </div>
      ${host.loading
        ? html`<div class="projects-loading"><span class="spinner"></span> ${t.projects.loading}</div>`
        : host.error && host.repos.length === 0
        ? html`<div class="projects-error">⚠ ${t.projects.error}: ${host.error}</div>`
        : host.repos.length === 0
        ? html`<div class="projects-loading">${t.projects.empty}</div>`
        : html`
            <div class="projects-grid">
              ${host.repos.map((r) => projectCard(host, r))}
            </div>
            <div class="projects-see-all">
              <a class="btn btn-outline" href="https://github.com/${host.user}" target="_blank" rel="noopener noreferrer">
                ${icon('github')} ${t.projects.seeAll}
              </a>
            </div>
          `}
    </section>
  `
}
