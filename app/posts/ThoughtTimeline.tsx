import { thoughts } from "./thoughts";
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
            <div className={styles.profile}>
              <span
                className={styles.avatar}
                aria-label={`${thought.author} profile`}
                role="img"
              >
                {thought.initials}
              </span>

              <div className={styles.identity}>
                <span className={styles.author}>{thought.author}</span>
                <time className={styles.date} dateTime={thought.postedAt}>
                  {thought.postedLabel}
                </time>
              </div>
            </div>

            <p className={styles.thought}>{thought.content}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
