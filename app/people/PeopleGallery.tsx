"use client";

import { useEffect, useRef, useState } from "react";
import type { Person } from "./people";
import { people, peopleInfluencePassage } from "./people";
import styles from "./people.module.css";

const COLUMN_COUNT = 3;
const INITIAL_VISIBLE_COUNT = 15;
const LOAD_BATCH_SIZE = 9;
const INFLUENCE_INSERT_INDEX = 24;

const cardFormats = [
  "portrait",
  "landscape",
  "tall",
  "landscape",
  "tall",
  "portrait",
  "tall",
  "square",
  "landscape",
  "square",
  "portrait",
  "tall",
] as const;

type RenderedPerson = {
  person: Person;
  position: number;
  format: (typeof cardFormats)[number];
};

function buildVisiblePeople(count: number): RenderedPerson[] {
  return Array.from({ length: count }, (_, position) => ({
    person: people[position % people.length],
    position,
    format: cardFormats[position % cardFormats.length],
  }));
}

function MasonryGallery({
  entries,
  label,
}: {
  entries: RenderedPerson[];
  label: string;
}) {
  const columns = Array.from({ length: COLUMN_COUNT }, (_, columnIndex) =>
    entries.filter(({ position }) => position % COLUMN_COUNT === columnIndex),
  );

  return (
    <div className={styles.gallery} role="list" aria-label={label}>
      {columns.map((column, columnIndex) => (
        <div
          className={styles.galleryColumn}
          role="presentation"
          key={columnIndex}
        >
          {column.map(({ person, position, format }) => (
            <div
              className={styles.galleryItem}
              role="listitem"
              key={`${person.id}-${position}`}
            >
              <figure
                className={styles.card}
                data-format={format}
                data-has-image={person.image ? "true" : "false"}
              >
                <div className={styles.portrait}>
                  {person.image ? (
                    // Portraits are local editorial assets; native lazy loading keeps
                    // the gallery free from additional image runtime code.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={styles.portraitImage}
                      src={person.image.src}
                      alt={person.image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className={styles.portraitPlaceholder}
                      role="img"
                      aria-label={`Portrait placeholder for ${person.name}`}
                    >
                      <span
                        className={styles.placeholderHead}
                        aria-hidden="true"
                      />
                      <span
                        className={styles.placeholderBody}
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                <figcaption className={styles.name}>{person.name}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function PeopleGallery() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const visiblePeople = buildVisiblePeople(visibleCount);
  const peopleBeforePassage = visiblePeople.slice(0, INFLUENCE_INSERT_INDEX);
  const peopleAfterPassage = visiblePeople.slice(INFLUENCE_INSERT_INDEX);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((currentCount) => currentCount + LOAD_BATCH_SIZE);
        }
      },
      { rootMargin: "0px 0px 600px" },
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.feed}
      aria-label="People who shaped Vishva's thinking"
    >
      <MasonryGallery
        entries={peopleBeforePassage}
        label="People gallery"
      />

      {visibleCount >= INFLUENCE_INSERT_INDEX ? (
        <>
          <div className={styles.influenceSection}>
            <p className={styles.influencePassage}>{peopleInfluencePassage}</p>
          </div>
          {peopleAfterPassage.length > 0 ? (
            <MasonryGallery
              entries={peopleAfterPassage}
              label="More people"
            />
          ) : null}
        </>
      ) : null}

      <div
        ref={loadMoreRef}
        className={styles.loadMoreSentinel}
        aria-live="polite"
      >
        <span className="sr-only">
          {`Showing ${visibleCount} people. More load while scrolling.`}
        </span>
      </div>
    </section>
  );
}
