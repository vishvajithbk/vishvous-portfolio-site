import { thoughts } from "./thoughts";
import { ThoughtActions } from "./ThoughtActions";
import styles from "./posts.module.css";

export function ThoughtTimeline() {
  const chronologicalThoughts = [...thoughts].sort(
    (first, second) =>
      new Date(second.postedAt).getTime() - new Date(first.postedAt).getTime(),
  );

  return (
    <ol className={styles.timeline} aria-label="Thoughts in chronological order">
      {chronologicalThoughts.map((thought) => (
        <li className={styles.timelineItem} key={thought.id}>
          <span className={styles.marker} aria-hidden="true" />

          <article
            className={styles.card}
            aria-label={`Thought posted ${thought.postedLabel}`}
          >
            <div className={styles.thoughtTopline}>
              <p className={styles.thought}>{thought.content}</p>
              <span className={styles.thoughtDate}>
                <span className={`${styles.actionIcon} ${styles.globeIcon}`} />
                <time dateTime={thought.postedAt}>{thought.postedLabel}</time>
              </span>
            </div>
            <ThoughtActions content={thought.content} />
          </article>
        </li>
      ))}
    </ol>
  );
}
