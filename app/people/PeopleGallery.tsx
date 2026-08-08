"use client";

import { useEffect, useRef, useState } from "react";
import type { Person } from "./people";
import { people } from "./people";
import styles from "./people.module.css";

const COLUMN_COUNT = 3;
const INITIAL_VISIBLE_COUNT = 15;
const LOAD_BATCH_SIZE = 9;

type RenderedPerson = {
  person: Person;
  position: number;
};

function buildVisiblePeople(count: number): RenderedPerson[] {
  return people.slice(0, count).map((person, position) => ({
    person,
    position,
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
          {column.map(({ person, position }) => (
            <div
              className={styles.galleryItem}
              role="listitem"
              data-position={position + 1}
              data-person-id={person.id}
              key={`${person.id}-${position}`}
            >
              <figure
                className={styles.card}
                data-has-image={person.image ? "true" : "false"}
              >
                <div className={styles.portrait}>
                  {/* Local editorial portraits use individual focal points so
                      the fixed card ratio never loses the subject's face. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.portraitImage}
                    src={person.image.src}
                    alt={person.image.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      objectPosition: person.image.position,
                      transform:
                        person.image.offsetX || person.image.scale
                          ? `translateX(${person.image.offsetX ?? 0}%) scale(${person.image.scale ?? 1})`
                        : undefined,
                      transformOrigin: person.image.position,
                    }}
                  />
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
  const hasMorePeople = visibleCount < people.length;

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasMorePeople) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      const fallbackTimer = window.setTimeout(
        () => setVisibleCount(people.length),
        0,
      );

      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((currentCount) =>
            Math.min(currentCount + LOAD_BATCH_SIZE, people.length),
          );
        }
      },
      { rootMargin: "0px 0px 600px" },
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, [hasMorePeople]);

  return (
    <section
      className={styles.feed}
      aria-label="People who shaped Vishva's thinking"
    >
      <section
        className={styles.peopleHeroSection}
        aria-labelledby="people-hero-title"
      >
        <div className={styles.peopleHeroHeading}>
          <h1 id="people-hero-title">A record of influence.</h1>
        </div>

        <header className={styles.peopleHero} aria-label="People introduction">
          <div className={styles.heroTopline}>
            <p className={styles.heroKicker}>People</p>
            <p className={styles.heroDescriptor}>A living index of influence</p>
          </div>

          <div className={styles.heroStatement}>
            <p className={styles.heroIntroduction}>
              These are people whose work, choices, and ways of thinking have
              shaped how I see the world. I return to their ideas often—not to
              imitate them, but to expand what I believe is possible.
            </p>
          </div>
        </header>
      </section>

      <header className={styles.profilesHeader}>
        <div>
          <p className={styles.profilesKicker}>The people</p>
          <h2>Names I return to.</h2>
        </div>
        <div className={styles.profilesContext}>
          <p className={styles.profilesCount}>{people.length} people</p>
          <p className={styles.profilesSummary}>
            Their influence quietly shows up in what I learn, build, and
            choose to pursue. This page is a record of that debt.
          </p>
        </div>
      </header>

      <MasonryGallery entries={visiblePeople} label="People gallery" />

      <div
        ref={loadMoreRef}
        className={styles.loadMoreSentinel}
        aria-live="polite"
      >
        <span className="sr-only">
          {hasMorePeople
            ? `Showing ${visibleCount} of ${people.length} people. More load while scrolling.`
            : `All ${people.length} people shown.`}
        </span>
      </div>
    </section>
  );
}
