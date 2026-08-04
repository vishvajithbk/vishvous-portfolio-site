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

function normalizeSearch(value: string) {
  return value.trim().toLocaleLowerCase();
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
          <p>Based everywhere</p>
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

        <div className={styles.footerSpacer} aria-hidden="true" />
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
