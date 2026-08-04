"use client";

import { useState } from "react";
import styles from "./home.module.css";

type IntroPanelId = "seconds" | "minutes";

const introPanels = [
  {
    id: "seconds",
    title: "Me in 10 seconds",
    content: (
      <p>
        I&apos;m Vishvajith—a world citizen, entrepreneur, and lifelong student. I
        follow ambitious questions across technology and science, then turn
        what I learn into products, experiments, and clearer ways of thinking.
      </p>
    ),
  },
  {
    id: "minutes",
    title: "Me in 10 minutes",
    content: (
      <>
        <p>
          I&apos;m Vishvajith, a world citizen, entrepreneur, and student of life.
          I&apos;m drawn to difficult questions at the edges of technology,
          science, and human progress—and to the practical work of turning
          those questions into products, experiments, and clearer ways of
          thinking.
        </p>
        <p>
          My time moves between building, writing, researching, and learning
          from people across different disciplines. This is where I keep a
          deliberately small index of the work, people, and discoveries that
          continue to shape that path.
        </p>
        <p>
          I care about curiosity, independent thought, patient iteration, and
          work that remains useful after the moment has passed. Vishvous is not
          a complete archive; it is a map of what feels worth carrying forward.
        </p>
      </>
    ),
  },
] as const;

export function HomeIntroduction() {
  const [selectedPanelId, setSelectedPanelId] =
    useState<IntroPanelId>("seconds");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const selectedPanel = introPanels.find(
    (panel) => panel.id === selectedPanelId,
  );

  const togglePanel = (panelId: IntroPanelId) => {
    if (panelId === selectedPanelId) {
      setIsPanelOpen((isOpen) => !isOpen);
      return;
    }

    setSelectedPanelId(panelId);
    setIsPanelOpen(true);
  };

  return (
    <section
      className={styles.homeIntroduction}
      aria-labelledby="home-introduction-title"
    >
      <header className={styles.heroHeader}>
        <div className={styles.heroTopline}>
          <p>A public index in motion</p>
          <div className={styles.heroToplineEndpoint}>
            <nav
              className={styles.heroIdentityLinks}
              aria-label="Social and publishing links"
            >
              <span>X</span>
              <span aria-hidden="true">·</span>
              <span>LinkedIn</span>
              <span aria-hidden="true">·</span>
              <span>GitHub</span>
              <span aria-hidden="true">·</span>
              <a
                href="https://vishvajithbk.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Substack, opens in a new tab"
              >
                Substack
              </a>
            </nav>
            <div className={styles.heroToplinePortrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.heroToplinePortraitImage}
                src="/home-introduction-portrait.png"
                alt="Portrait of Vishvajith BK"
                width="1254"
                height="1254"
              />
            </div>
          </div>
        </div>

        <div className={styles.heroStatement}>
          <h1 id="home-introduction-title">
            <span>World citizen.</span>
            <span>Entrepreneur.</span>
            <span>Student of life.</span>
          </h1>
          <div className={styles.heroCopy}>
            <p>
              I&apos;m Vishvajith. I build, write, and learn across technology,
              science, and the wider world—following useful questions and
              sharing what they become.
            </p>
            <p>
              Vishvous is a living index of the work, ideas, people, and
              discoveries shaping that path.
            </p>
          </div>
        </div>

      </header>

      <div className={styles.introductionRail}>
        <div className={styles.introductionRailCopy}>
          <p className={styles.introductionKicker}>Begin here</p>
          <p>Take the short introduction, or stay for the longer version.</p>
        </div>

        <div className={styles.introductionControls}>
          <div
            className={styles.introductionActions}
            aria-label="Introduction options"
          >
            {introPanels.map((panel) => (
              <div className={styles.introductionActionItem} key={panel.id}>
                <button
                  className={styles.introductionButton}
                  type="button"
                  aria-controls="home-introduction-panel"
                  aria-expanded={isPanelOpen && selectedPanelId === panel.id}
                  onClick={() => togglePanel(panel.id)}
                >
                  <span className={styles.introductionButtonLabel}>
                    {panel.title}
                  </span>
                  <span
                    className={styles.introductionButtonArrow}
                    aria-hidden="true"
                  >
                    {isPanelOpen && selectedPanelId === panel.id ? "−" : "+"}
                  </span>
                </button>
              </div>
            ))}
          </div>

          <section
            className={`${styles.introductionPanel} ${
              isPanelOpen ? styles.introductionPanelOpen : ""
            }`}
            id="home-introduction-panel"
            aria-hidden={!isPanelOpen}
            aria-live="polite"
          >
            <div className={styles.introductionPanelReveal}>
              <article
                className={styles.introductionPanelContent}
                key={selectedPanel?.id}
              >
                <header className={styles.introductionPanelHeader}>
                  <p>About</p>
                  <h2 id="home-introduction-panel-title">
                    {selectedPanel?.title}
                  </h2>
                  <button
                    className={styles.introductionPanelClose}
                    type="button"
                    aria-label="Close introduction"
                    tabIndex={isPanelOpen ? undefined : -1}
                    onClick={() => setIsPanelOpen(false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </header>
                <div className={styles.introductionPanelBody}>
                  {selectedPanel?.content}
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
