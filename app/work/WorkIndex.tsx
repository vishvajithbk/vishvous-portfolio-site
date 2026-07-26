import { externalProfiles } from "../site-config";
import {
  categoryLabels,
  formatWorkDate,
  getCurrentWork,
  getPreviousWork,
  statusLabels,
  workCategories,
  workItems,
  type WorkItem,
} from "./work";
import styles from "./work.module.css";

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      className={styles.externalLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
      <span className={styles.externalArrow} aria-hidden="true">
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function WorkEntry({ item, prominent = false }: { item: WorkItem; prominent?: boolean }) {
  return (
    <article
      className={`${styles.workEntry} ${prominent ? styles.prominentEntry : ""}`}
      id={item.id}
    >
      <div className={styles.entryMeta}>
        <span>{categoryLabels[item.category]}</span>
        <span aria-hidden="true">·</span>
        <span>{statusLabels[item.status]}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={item.date}>{formatWorkDate(item.date)}</time>
      </div>

      <div className={styles.entryBody}>
        <h3 className={styles.entryTitle}>{item.title}</h3>
        <p className={styles.entrySummary}>{item.summary}</p>

        <ul className={styles.artifactList} aria-label={`${item.title} artifacts`}>
          {item.artifacts.map((artifact) => (
            <li key={`${artifact.platform}-${artifact.href}`}>
              <ExternalLink href={artifact.href}>{artifact.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function WorkIndex() {
  const currentWork = getCurrentWork(workItems);
  const previousWork = getPreviousWork(workItems);
  const hasPreviousWork = workCategories.some(
    (category) => previousWork[category].length > 0,
  );
  const hasWork = currentWork.length > 0 || hasPreviousWork;

  return (
    <div className={styles.workShell}>
      <header className={styles.introduction}>
        <p className={styles.eyebrow}>Selected index</p>
        <h1 className={styles.pageTitle}>Work</h1>
        <p className={styles.pageDescription}>
          Selected writing, projects, and research—published where each belongs.
        </p>

        {externalProfiles.length > 0 ? (
          <nav className={styles.elsewhere} aria-label="Elsewhere">
            <span className={styles.elsewhereLabel}>Elsewhere</span>
            <ul className={styles.profileList}>
              {externalProfiles.map((profile) => (
                <li key={profile.label}>
                  <ExternalLink href={profile.href}>{profile.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      {currentWork.length > 0 ? (
        <section className={styles.currentSection} aria-labelledby="current-work">
          <h2 className={styles.sectionTitle} id="current-work">
            Current
          </h2>
          <div className={styles.entryList}>
            {currentWork.map((item) => (
              <WorkEntry item={item} prominent key={item.id} />
            ))}
          </div>
        </section>
      ) : null}

      {hasPreviousWork ? (
        <div className={styles.index} aria-label="Work index">
          {workCategories.map((category) => {
            const entries = previousWork[category];

            if (entries.length === 0) return null;

            return (
              <section
                className={styles.categorySection}
                aria-labelledby={`${category}-work`}
                key={category}
              >
                <h2 className={styles.sectionTitle} id={`${category}-work`}>
                  {categoryLabels[category]}
                </h2>
                <div className={styles.entryList}>
                  {entries.map((item) => (
                    <WorkEntry item={item} key={item.id} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : null}

      {!hasWork ? (
        <p className={styles.emptyState}>Publishing here soon.</p>
      ) : null}
    </div>
  );
}
