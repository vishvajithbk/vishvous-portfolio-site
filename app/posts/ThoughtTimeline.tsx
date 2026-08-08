import { thoughts } from "./thoughts";
import { ThoughtActions } from "./ThoughtActions";
import styles from "./posts.module.css";

export type ThoughtOrder = "newest" | "oldest";

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  timeZone: "UTC",
});

export function ThoughtTimeline({ order }: { order: ThoughtOrder }) {
  const chronologicalThoughts = [...thoughts].sort(
    (first, second) => {
      const difference =
        new Date(first.postedAt).getTime() -
        new Date(second.postedAt).getTime();

      return order === "newest" ? -difference : difference;
    },
  );
  const archiveMonths = chronologicalThoughts.reduce<
    Array<{ label: string; count: number }>
  >((months, thought) => {
    const label = monthFormatter.format(new Date(thought.postedAt));
    const currentMonth = months.at(-1);

    if (currentMonth?.label === label) {
      currentMonth.count += 1;
    } else {
      months.push({ label, count: 1 });
    }

    return months;
  }, []);

  return (
    <section
      className={styles.thoughtArchive}
      aria-labelledby="thought-archive-title"
    >
      <header className={styles.timelineIntroduction}>
        <div>
          <p className={styles.timelineKicker}>The notes</p>
          <h2 id="thought-archive-title">Observations, in sequence.</h2>
        </div>
        <div className={styles.timelineSummary}>
          <p>
            {thoughts.length} entries · {order} first
          </p>
          <p>
            A running chronology of passing thoughts—kept intact, dated, and
            open for return.
          </p>
        </div>
      </header>

      <div className={styles.timelineFrame}>
        <aside className={styles.timelineGuide} aria-label="Notes archive range">
          <p>Archive</p>
          <strong>2026</strong>
          <dl>
            {archiveMonths.map((month) => (
              <div key={month.label}>
                <dt>{month.label}</dt>
                <dd>{String(month.count).padStart(2, "0")}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <ol
          className={styles.timeline}
          data-order={order}
          key={order}
          aria-label="Thoughts in chronological order"
        >
          {chronologicalThoughts.map((thought) => (
            <li className={styles.timelineItem} key={thought.id}>
              <span className={styles.marker} aria-hidden="true" />

              <article
                className={styles.card}
                aria-label={`Thought posted ${thought.postedLabel}`}
              >
                <div className={styles.thoughtTopline}>
                  <span className={styles.thoughtDate}>
                    <span
                      className={`${styles.actionIcon} ${styles.globeIcon}`}
                    />
                    <time dateTime={thought.postedAt}>
                      {thought.postedLabel}
                    </time>
                  </span>
                  <p className={styles.thought}>{thought.content}</p>
                </div>
                <ThoughtActions content={thought.content} />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
