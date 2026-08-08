"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./research.module.css";

const workCategories = [
  {
    id: "blogs",
    title: "Blogs",
    description:
      "Blog posts and essays on technology, systems, and the ideas shaping my work.",
    siteName: "Substack",
    siteHref: "https://vishvajithbk.substack.com/",
    crop: "left",
    icon: "/work-blogs.svg?v=2",
  },
  {
    id: "projects",
    title: "Projects",
    description:
      "Products, experiments, and tools I am building to explore those ideas.",
    siteName: "GitHub",
    siteHref: "https://github.com/",
    crop: "center",
    icon: "/work-projects.svg?v=1",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Deeper investigations, technical explorations, and questions in progress.",
    siteName: "Medium",
    siteHref: "https://medium.com/",
    crop: "right",
    icon: "/work-research.svg?v=1",
  },
] as const;

const blogPosts = [
  {
    title: "Luck Maximization",
    description:
      "“We are just an advanced breed of monkeys on a minor planet of a very average star.”",
    date: "2026-06-12",
    displayDate: "Jun 12, 2026",
    month: "June 2026",
    href: "https://vishvajithbk.substack.com/p/luck-maximization",
    image: "/work-blog-luck.jpg",
  },
  {
    title: "8 Independent Thoughts",
    description:
      '"The total number of minds in the universe is one." — Erwin Schrödinger',
    date: "2026-03-17",
    displayDate: "Mar 17, 2026",
    month: "March 2026",
    href: "https://vishvajithbk.substack.com/p/8-independent-thoughts",
    image: "/work-blog-independent-thoughts.jpg",
  },
  {
    title: "Victims of Modernity",
    description:
      "The Coming Collapse of Human-Centric Systems: AGI, Intelligence Explosion and Beyond",
    date: "2025-03-25",
    displayDate: "Mar 25, 2025",
    month: "March 2025",
    href: "https://vishvajithbk.substack.com/p/victims-of-modernity",
    image: "/work-blog-victims-modernity.jpg",
  },
  {
    title: "20s, Unfolded",
    description: "Random Reflections on Life",
    date: "2025-01-18",
    displayDate: "Jan 18, 2025",
    month: "January 2025",
    href: "https://vishvajithbk.substack.com/p/20s-unfolded",
    image: "/work-blog-20s-unfolded.jpg",
  },
] as const;

const projects = [
  {
    title: "SequenceStudio",
    description:
      "A browser-based workspace for exploring biological sequences and computational tools.",
    href: "https://github.com/",
  },
  {
    title: "Protein Engineering AI IDE",
    description:
      "An experimental interface for designing, evaluating, and iterating on protein candidates.",
    href: "https://github.com/",
  },
  {
    title: "Benchling Biotech R&D Platform",
    description:
      "A concept study for organizing biotech research workflows, data, and collaboration.",
    href: "https://github.com/",
  },
  {
    title: "Molecular Data Explorer",
    description:
      "A lightweight environment for navigating structures, datasets, and scientific references.",
    href: "https://github.com/",
  },
  {
    title: "Research Automation Toolkit",
    description:
      "A collection of small tools for reducing repetitive work in technical research.",
    href: "https://github.com/",
  },
] as const;

type BlogPost = (typeof blogPosts)[number];
type BlogPostGroup = { month: string; posts: BlogPost[] };
type CatalogId = (typeof workCategories)[number]["id"];

const footerMapMinScale = 1;
const footerMapMaxScale = 1.09;

function clampFooterMapScale(scale: number) {
  return Math.min(footerMapMaxScale, Math.max(footerMapMinScale, scale));
}

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase();
}

function FooterLocationMap() {
  const [mapScale, setMapScale] = useState(footerMapMinScale);
  const [markerJumpKey, setMarkerJumpKey] = useState(0);
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const touchPointersRef = useRef(
    new Map<number, { clientX: number; clientY: number }>(),
  );
  const previousPinchDistanceRef = useRef<number | null>(null);
  const suppressNextClickRef = useRef(false);

  useEffect(() => {
    const mapViewport = mapViewportRef.current;

    if (!mapViewport) return;

    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      const scaleDelta = Math.max(
        -0.018,
        Math.min(0.018, event.deltaY * -0.00035),
      );

      setMapScale((scale) => clampFooterMapScale(scale + scaleDelta));
    }

    mapViewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => mapViewport.removeEventListener("wheel", handleWheel);
  }, []);

  function retriggerMarkerJump() {
    setMarkerJumpKey((key) => key + 1);
  }

  function updateTouchPointer(
    pointerId: number,
    clientX: number,
    clientY: number,
  ) {
    touchPointersRef.current.set(pointerId, { clientX, clientY });
  }

  function measurePinchDistance() {
    const pointers = Array.from(touchPointersRef.current.values());

    if (pointers.length !== 2) return null;

    return Math.hypot(
      pointers[0].clientX - pointers[1].clientX,
      pointers[0].clientY - pointers[1].clientY,
    );
  }

  return (
    <aside className={styles.footerMap} aria-label="Location map">
      <div
        className={styles.mapViewport}
        id="footer-location-map"
        ref={mapViewportRef}
        role="button"
        tabIndex={0}
        aria-label="Vishvajith in the approximate Whitefield area, Bangalore 560066. Activate to animate the marker; use wheel or pinch to zoom."
        onClick={() => {
          if (suppressNextClickRef.current) return;
          retriggerMarkerJump();
        }}
        onDoubleClick={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (
            !event.repeat &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            retriggerMarkerJump();
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "touch") return;

          event.currentTarget.setPointerCapture(event.pointerId);
          updateTouchPointer(
            event.pointerId,
            event.clientX,
            event.clientY,
          );
          previousPinchDistanceRef.current = measurePinchDistance();
        }}
        onPointerMove={(event) => {
          if (
            event.pointerType !== "touch" ||
            !touchPointersRef.current.has(event.pointerId)
          ) {
            return;
          }

          updateTouchPointer(
            event.pointerId,
            event.clientX,
            event.clientY,
          );
          const pinchDistance = measurePinchDistance();
          const previousDistance = previousPinchDistanceRef.current;

          if (pinchDistance && previousDistance) {
            event.preventDefault();
            suppressNextClickRef.current = true;
            setMapScale((scale) =>
              clampFooterMapScale(scale * (pinchDistance / previousDistance)),
            );
          }

          previousPinchDistanceRef.current = pinchDistance;
        }}
        onPointerUp={(event) => {
          touchPointersRef.current.delete(event.pointerId);
          previousPinchDistanceRef.current = measurePinchDistance();
          window.setTimeout(() => {
            suppressNextClickRef.current = false;
          }, 0);
        }}
        onPointerCancel={(event) => {
          touchPointersRef.current.delete(event.pointerId);
          previousPinchDistanceRef.current = measurePinchDistance();
          suppressNextClickRef.current = false;
        }}
      >
        <svg
          className={styles.mapArtwork}
          style={{ transform: `scale(${mapScale})` }}
          viewBox="0 0 224 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={styles.mapGreenSpace}
            d="M-8 0h73l20 23-14 24-54 5L-8 35ZM174 88l58-12v72h-77l-5-31Z"
          />
          <path
            className={styles.mapWater}
            d="M-8 111c28-18 47-17 67-4 16 10 36 12 59 2 25-10 49-9 114 7v32H-8Z"
          />
          <g className={styles.mapMinorRoads}>
            <path d="M-9 29 231 96" />
            <path d="M21-7 81 148" />
            <path d="m-4 82 229-49" />
            <path d="M139-8 108 148" />
            <path d="m179-7 19 155" />
            <path d="M-8 125 232 55" />
          </g>
          <g className={styles.mapMajorRoads}>
            <path d="M-12 62c48 7 75 10 105 5 40-8 82-19 144-16" />
            <path d="M63-10c6 37 19 62 52 82 29 18 45 40 48 79" />
          </g>
          <g className={styles.mapBlocks}>
            <path d="m86 15 31-7 12 20-29 8Z" />
            <path d="m154 24 30-4 6 17-28 5Z" />
            <path d="m27 58 30 4-4 20-31-6Z" />
            <path d="m168 63 28-5 8 17-31 8Z" />
            <path d="m79 91 28-7 8 19-30 8Z" />
          </g>
        </svg>

        <div className={styles.mapMarker} aria-hidden="true">
          <span className={styles.mapMarkerPoint} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`${styles.mapMarkerAvatar} ${
              markerJumpKey > 0 ? styles.mapMarkerAvatarJumping : ""
            }`}
            key={markerJumpKey}
            src="/map-avatar-marker.png"
            alt=""
          />
        </div>
      </div>

      <div className={styles.mapCaption}>
        <strong>Whitefield</strong>
        <span>Bangalore · 560066</span>
      </div>
    </aside>
  );
}

export function WorkShowcase() {
  const [activeCatalog, setActiveCatalog] = useState<CatalogId | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const filteredPosts = useMemo<readonly BlogPost[]>(() => {
    const normalizedQuery = normalizeSearch(query);

    if (!normalizedQuery) return blogPosts;

    return blogPosts.filter((post) =>
      [post.title, post.description, post.displayDate, post.month, "Vishvajith BK"]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const groupedPosts = useMemo<BlogPostGroup[]>(() => {
    const groups: BlogPostGroup[] = [];

    for (const post of filteredPosts) {
      const currentGroup = groups[groups.length - 1];

      if (currentGroup?.month === post.month) {
        currentGroup.posts.push(post);
      } else {
        groups.push({ month: post.month, posts: [post] });
      }
    }

    return groups;
  }, [filteredPosts]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!activeCatalog || !dialog || dialog.open) return;

    dialog.showModal();

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [activeCatalog]);

  useEffect(() => {
    if (!activeCatalog) return;

    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    root.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [activeCatalog]);

  useEffect(() => {
    const dialog = dialogRef.current;

    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  const catalogTitle =
    workCategories.find((category) => category.id === activeCatalog)?.title ??
    "Work";

  function openCatalog(catalog: CatalogId, trigger: HTMLButtonElement) {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    triggerRef.current = trigger;
    setIsClosing(false);
    setActiveCatalog(catalog);
  }

  function closeCatalog() {
    if (!activeCatalog || isClosing) return;

    setIsClosing(true);

    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const closeDelay = shouldReduceMotion ? 0 : 220;

    closeTimerRef.current = window.setTimeout(() => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
      }

      setActiveCatalog(null);
      setIsClosing(false);
      closeTimerRef.current = null;

      window.requestAnimationFrame(() => {
        triggerRef.current?.focus({ preventScroll: true });
      });
    }, closeDelay);
  }

  return (
    <section className={styles.workPage} aria-label="Work page">
      <h2 className="sr-only">Work</h2>

      <section className={styles.workGrid} aria-label="Work categories">
        {workCategories.map((category) => (
          <article
            className={styles.workCard}
            id={category.id}
            key={category.id}
          >
            <div
              className={styles.cardMedia}
              data-image-slot={`${category.id}-image`}
              data-crop={category.crop}
              aria-hidden="true"
            >
              <span className={styles.iconTile}>
                {/* These small editorial SVGs should render at their native sharpness. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={category.icon} alt="" />
              </span>
            </div>

            <div className={styles.cardCopy}>
              <div className={styles.cardActions}>
                <button
                  className={`${styles.actionButton} ${styles.primaryButton}`}
                  type="button"
                  aria-controls="work-catalog-dialog"
                  aria-expanded={activeCatalog === category.id}
                  aria-haspopup="dialog"
                  aria-label={`Open ${category.title} index`}
                  onClick={(event) =>
                    openCatalog(category.id, event.currentTarget)
                  }
                >
                  <span>{category.title}</span>
                </button>

                <a
                  className={`${styles.actionButton} ${styles.secondaryButton}`}
                  href={category.siteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Go to ${category.siteName}, opens in a new tab`}
                >
                  <span>{category.siteName}</span>
                </a>
              </div>

              <p>{category.description}</p>
            </div>
          </article>
        ))}
      </section>

      <footer className={styles.siteFooter} aria-label="Contact">
        <div className={styles.footerDetails}>
          <p className={styles.footerLabel}>Contact</p>
          <p>hello@vishvous.com</p>
        </div>

        <form
          className={styles.askForm}
          aria-label="Ask me anything"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="text"
            aria-label="Your question"
            placeholder="Ask me anything"
            autoComplete="off"
            value={askQuestion}
            onChange={(event) => setAskQuestion(event.target.value)}
          />
          <button
            className={styles.askSubmit}
            type="submit"
            aria-label="Submit question (coming soon)"
            disabled={!askQuestion.trim()}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3.5 12h17M14.5 5.75 20.75 12l-6.25 6.25" />
            </svg>
          </button>
        </form>

        <FooterLocationMap />
      </footer>

      <dialog
        className={styles.catalogDialog}
        id="work-catalog-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-catalog-dialog-title"
        data-state={isClosing ? "closing" : "open"}
        onCancel={(event) => {
          event.preventDefault();
          closeCatalog();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeCatalog();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeCatalog();
        }}
      >
        <div className={styles.dialogShell}>
          <header className={styles.dialogHeader}>
            <h2 id="work-catalog-dialog-title">{catalogTitle}</h2>
            <button
              className={styles.dialogClose}
              type="button"
              ref={closeButtonRef}
              aria-label={`Close ${catalogTitle} catalog`}
              onClick={closeCatalog}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </header>

          <div className={styles.dialogBody}>
            <section
              className={`${styles.catalogPanel} ${styles.blogCatalog}`}
              id="blogs-catalog"
              aria-label="Blog posts"
              hidden={activeCatalog !== "blogs"}
              data-active={activeCatalog === "blogs"}
            >
            <div className={styles.catalogToolbar}>
              <label className={styles.searchField}>
                <span className="sr-only">Search blog posts</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <circle cx="11" cy="11" r="6.75" />
                  <path d="m16 16 4.25 4.25" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search posts"
                  autoComplete="off"
                  tabIndex={activeCatalog === "blogs" ? undefined : -1}
                />
              </label>
            </div>

            <p className="sr-only" aria-live="polite">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
              {query ? ` matching ${query}` : ""}
            </p>

            {groupedPosts.length > 0 ? (
              <div className={styles.postList}>
                {groupedPosts.map((group) => (
                  <div className={styles.postGroup} key={group.month}>
                    {group.posts.map((post) => (
                      <a
                        className={styles.postTile}
                        href={post.href}
                        key={post.href}
                        aria-label={`Read ${post.title} on Substack`}
                        tabIndex={activeCatalog === "blogs" ? undefined : -1}
                      >
                        <div className={styles.postImage} aria-hidden="true">
                          {/* These local Substack thumbnails do not need runtime optimization. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.image}
                            alt=""
                            width={1200}
                            height={675}
                            loading="lazy"
                          />
                        </div>

                        <div className={styles.postCopy}>
                          <h3>{post.title}</h3>
                          <p className={styles.postDescription}>
                            {post.description}
                          </p>
                          <p className={styles.postMeta}>
                            <time dateTime={post.date}>{post.displayDate}</time>
                            <span aria-hidden="true">·</span>
                            <span>Vishvajith BK</span>
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noResults} role="status">
                <p>No posts match “{query.trim()}”.</p>
                <button type="button" onClick={() => setQuery("")}>
                  Clear search
                </button>
              </div>
            )}
            </section>

            <section
              className={`${styles.catalogPanel} ${styles.projectCatalog}`}
              id="projects-catalog"
              aria-label="Projects"
              hidden={activeCatalog !== "projects"}
              data-active={activeCatalog === "projects"}
            >
              <div className={styles.projectList}>
                {projects.map((project) => (
                  <a
                    className={styles.projectTile}
                    href={project.href}
                    key={project.title}
                    aria-label={`View ${project.title} on GitHub`}
                    tabIndex={activeCatalog === "projects" ? undefined : -1}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </a>
                ))}
              </div>
            </section>

            <section
              className={`${styles.catalogPanel} ${styles.researchCatalog}`}
              id="research-catalog"
              aria-label="Research"
              hidden={activeCatalog !== "research"}
              data-active={activeCatalog === "research"}
            >
              <div className={styles.researchEmpty}>
                <h3>Research catalog coming soon</h3>
                <p>
                  Published investigations and technical explorations will appear
                  here once their Medium links are ready.
                </p>
              </div>
            </section>
          </div>
        </div>
      </dialog>
    </section>
  );
}
