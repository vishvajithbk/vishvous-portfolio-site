"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { lifeMonths, type LifeMedia } from "./life";
import styles from "./life.module.css";

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m7 7 10 10" />
      <path d="m17 7-10 10" />
    </svg>
  );
}

function Media({ item, expanded = false }: { item: LifeMedia; expanded?: boolean }) {
  if (item.kind === "video") {
    return (
      <video
        className={styles.media}
        src={item.src}
        muted
        loop={!expanded}
        playsInline
        controls={expanded}
        autoPlay={expanded}
        preload={expanded ? "auto" : "metadata"}
        data-life-video={expanded ? undefined : "true"}
        aria-label={expanded ? item.alt : undefined}
        aria-hidden={expanded ? undefined : true}
      />
    );
  }

  return (
    // Native media keeps image and video behavior aligned inside the scrapbook.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.media}
      src={item.src}
      alt={expanded ? item.alt : ""}
      loading={expanded ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function LifeScrapbook() {
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const scrapbookRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const allItems = useMemo(
    () => lifeMonths.flatMap((month) => month.items),
    [],
  );
  const activeItem = allItems.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    const root = scrapbookRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const videos = Array.from(
      root.querySelectorAll<HTMLVideoElement>("video[data-life-video]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.45 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [shuffleSeed]);

  function openItem(itemId: string, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveId(itemId);
    window.requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function closeItem() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setActiveId(null);
    triggerRef.current?.focus();
  }

  return (
    <main className={styles.lifePage} id="life-top" aria-label="Life page">
      <header className={styles.hero}>
        <p className={styles.eyebrow}>A visual diary</p>
        <div className={styles.heroGrid}>
          <h1>Life, loosely kept.</h1>
          <div className={styles.heroAside}>
            <p>
              Things I saw, saved, made, or simply did not want to lose.
              Arranged by month; remembered without much discipline.
            </p>
            <div className={styles.heroControls}>
              <button
                type="button"
                onClick={() => setShuffleSeed((seed) => seed + 1)}
                aria-label="Shuffle the Life scrapbook"
              >
                Shuffle the pile <span aria-hidden="true">↻</span>
              </button>
              <span>{allItems.length} fragments</span>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.scrapbook} ref={scrapbookRef} aria-label="Life scrapbook">
        {lifeMonths.map((month, monthIndex) => {
          const offset = shuffleSeed
            ? (shuffleSeed * (monthIndex + 1)) % month.items.length
            : 0;
          const orderedItems = month.items.map(
            (_, index) => month.items[(index + offset) % month.items.length],
          );

          return (
            <section
              className={styles.month}
              key={month.id}
              aria-labelledby={`${month.id}-heading`}
            >
              <header className={styles.monthMarker}>
                <h2 id={`${month.id}-heading`}>{month.label}</h2>
                <span>{month.year}</span>
                <span className={styles.monthRule} aria-hidden="true" />
              </header>

              <div className={styles.collage} data-month={month.id}>
                {orderedItems.map((item, index) => {
                  const slot = month.slots[index];
                  return (
                    <button
                      className={`${styles.fragment} ${styles[slot]}`}
                      type="button"
                      key={`${shuffleSeed}-${item.id}`}
                      aria-label={`Open ${item.title}`}
                      onClick={(event) => openItem(item.id, event.currentTarget)}
                    >
                      <span className={styles.frame}>
                        <Media item={item} />
                        <span className={styles.motionBadge} data-kind={item.kind}>
                          {item.kind === "video" ? "Motion" : "Still"}
                        </span>
                        <span className={styles.fragmentCopy}>
                          <span>{item.title}</span>
                          <span aria-hidden="true">↗</span>
                        </span>
                      </span>
                      <span className={styles.credit} aria-hidden="true">
                        {item.date} · {item.creator}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <p>Nothing definitive. More gets added when it refuses to be forgotten.</p>
        <a href="#life-top" aria-label="Return to the top of Life">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>

      {activeItem ? (
        <dialog
          className={styles.viewer}
          ref={dialogRef}
          aria-labelledby="life-viewer-title"
          aria-describedby="life-viewer-note"
          onCancel={(event) => {
            event.preventDefault();
            closeItem();
          }}
          onClose={handleDialogClose}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeItem();
          }}
        >
          <button
            className={styles.viewerClose}
            type="button"
            aria-label="Close Life viewer"
            onClick={closeItem}
          >
            <CloseIcon />
          </button>
          <div className={styles.viewerLayout}>
            <div className={styles.viewerMedia}>
              <Media item={activeItem} expanded />
            </div>
            <div className={styles.viewerCopy}>
              <p className={styles.viewerMeta}>
                {activeItem.kind} · {activeItem.date}
              </p>
              <h2 id="life-viewer-title">{activeItem.title}</h2>
              <p id="life-viewer-note">{activeItem.note}</p>
              <a
                href={activeItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeItem.creator} on {activeItem.sourceName}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </dialog>
      ) : null}
    </main>
  );
}
