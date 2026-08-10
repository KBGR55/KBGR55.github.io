import { html } from 'lit-element'
import { getT } from '../i18n.js'

const TECH_BY_JOB = [
  ['Angular', 'Cypress', 'Node.js', 'Playwright', 'Jira'],
  ['Python', 'Pyramid', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'React Native'],
  ['Angular', 'Jira', 'Scrum', 'QA Testing'],
  ['Node.js', 'JavaScript'],
  ['Jakarta EE', 'Flutter', 'Dart', 'Java'],
  ['Django', 'Python'],
]

function timelineItem(role, date, company, descList, techs) {
  return html`
    <div class="timeline-item reveal">
      <div class="timeline-card">
        <div class="timeline-header">
          <span class="timeline-role">${role}</span>
          <span class="timeline-date">${date}</span>
        </div>
        <div class="timeline-company">${company}</div>
        <ul class="timeline-desc">
          ${descList.map((d) => html`<li>${d}</li>`)}
        </ul>
        <div class="timeline-tech">
          ${techs.map((t) => html`<span class="tech-pill">${t}</span>`)}
        </div>
      </div>
    </div>
  `
}

export function template(host) {
  const t = getT(host.lang)
  const e = t.experience
  return html`
    <section>
      <div class="section-header">
        <h2 class="section-title">${e.title}</h2>
        <div class="section-line"></div>
      </div>
      <div class="timeline">
        ${timelineItem(e.job1Role, e.job1Date, e.job1Company, e.job1Desc, TECH_BY_JOB[0])}
        ${timelineItem(e.job2Role, e.job2Date, e.job2Company, e.job2Desc, TECH_BY_JOB[1])}
        ${timelineItem(e.job3Role, e.job3Date, 'ISBEN SOLUTION', e.job3Desc, TECH_BY_JOB[2])}
        ${timelineItem(e.job4Role, e.job4Date, e.job4Company, e.job4Desc, TECH_BY_JOB[3])}
        ${timelineItem(e.job5Role, e.job5Date, e.job5Company, e.job5Desc, TECH_BY_JOB[4])}
        ${timelineItem(e.job6Role, e.job6Date, e.job6Company, e.job6Desc, TECH_BY_JOB[5])}
      </div>
    </section>
  `
}
