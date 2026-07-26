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
            <p className={styles.thought}>{thought.content}</p>
            <ThoughtActions
              content={thought.content}
              postedAt={thought.postedAt}
              postedLabel={thought.postedLabel}
            />
          </article>
        </li>
      ))}
    </ol>
  );
}
