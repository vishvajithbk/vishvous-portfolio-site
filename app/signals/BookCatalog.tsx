import { books } from "./archive";
import styles from "./archive.module.css";

function SummaryArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function BookCatalog() {
  return (
    <ol className={styles.bookCatalog} aria-label="Books read">
      {books.map((book, index) => (
        <li key={book.id}>
          <article
            className={styles.bookCard}
            aria-label={`${book.title} by ${book.author}`}
          >
            <span className={styles.bookNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className={styles.bookCopy}>
              <span className={styles.bookAuthor}>{book.author}</span>
              <span className={styles.bookTitle}>{book.title}</span>
            </span>

            <span className={styles.bookAction} aria-hidden="true">
              Read notes <SummaryArrow />
            </span>
          </article>
        </li>
      ))}
    </ol>
  );
}
