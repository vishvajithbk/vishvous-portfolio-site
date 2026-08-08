import styles from "./archive.module.css";
import { BookCatalog } from "./BookCatalog";
import { PlaylistViewer } from "./PlaylistViewer";
import { books, readings } from "./archive";

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArchivePage() {
  return (
    <main
      id="archive-top"
      className={styles.archivePage}
      aria-label="Archive page"
    >
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>A personal archive</p>
          <h1>Worth returning to.</h1>
          <p className={styles.heroDescription}>
            A deliberately small collection of videos, books, and writing—kept
            here because good ideas reward another pass.
          </p>
        </div>

        <dl className={styles.heroCounts} aria-label="Archive contents">
          <div>
            <dt>Watch</dt>
            <dd>01 playlist</dd>
          </div>
          <div>
            <dt>Books</dt>
            <dd>{String(books.length).padStart(2, "0")} read</dd>
          </div>
          <div>
            <dt>Read</dt>
            <dd>{String(readings.length).padStart(2, "0")} selections</dd>
          </div>
        </dl>
      </header>

      <div className={styles.divider} aria-hidden="true" />

      <section className={styles.section} aria-labelledby="watch-heading">
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Watch</p>
            <h2 id="watch-heading">The playlist</h2>
          </div>
        </header>

        <PlaylistViewer />
      </section>

      <section
        className={`${styles.section} ${styles.booksSection}`}
        aria-labelledby="books-heading"
      >
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Books</p>
            <h2 id="books-heading">Books</h2>
            <p className={styles.sectionDescription}>
              Books I have read so far, alongside the ideas and lessons I want
              to carry forward.
            </p>
          </div>
          <p className={styles.sectionCount}>{books.length} books</p>
        </header>

        <BookCatalog />
      </section>

      <section
        className={`${styles.section} ${styles.readSection}`}
        aria-labelledby="read-heading"
      >
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.sectionKicker}>Read</p>
            <h2 id="read-heading">Selected writing</h2>
          </div>
          <p className={styles.sectionCount}>{readings.length} pieces</p>
        </header>

        <ol className={styles.readingList}>
          {readings.map((reading, index) => (
            <li key={reading.url}>
              <a
                className={styles.readingLink}
                href={reading.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${reading.title} by ${reading.author} in a new tab`}
              >
                <span className={styles.readingNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.readingCopy}>
                  <span className={styles.readingAuthor}>{reading.author}</span>
                  <span className={styles.readingTitle}>{reading.title}</span>
                  <span className={styles.readingDescription}>
                    {reading.description}
                  </span>
                </span>

                <span className={styles.readingMeta}>
                  <span>{reading.publication}</span>
                  <span>{reading.date}</span>
                </span>

                <span className={styles.readingArrow}>
                  <ExternalArrow />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <footer className={styles.archiveFooter}>
        <p>Curated slowly. Revisited often.</p>
        <a href="#archive-top" aria-label="Return to the top of Archive">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}
