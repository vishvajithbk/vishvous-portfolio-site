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
        I&apos;m Vishvajith—a curious builder and lifelong learner exploring
        technology, science, and the systems that connect ambitious ideas to
        useful work.
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
          My time is split between building, writing, researching, and learning
          from people across different disciplines. I care about curiosity,
          independent thought, patient iteration, and creating work that stays
          useful beyond the moment it was made.
        </p>
        <p>
          This is temporary draft copy. It will eventually become a fuller
          account of the experiences, principles, interests, and relationships
          that continue to shape my path.
        </p>
      </>
    ),
  },
] as const;

export function HomeIntroduction() {
  const [activePanelId, setActivePanelId] = useState<IntroPanelId | null>(null);
  const activePanel = introPanels.find((panel) => panel.id === activePanelId);

  return (
    <div className={styles.homeIntroduction}>
      <section
        className={`${styles.hero} ${activePanel ? styles.heroExpanded : ""}`}
        aria-labelledby="home-introduction-title"
      >
        {/* This supplied photograph is intentionally presented without added branding. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.heroImage}
          src="/home-hero-observatory-cropped.png"
          alt="A radio telescope beneath a star-filled night sky"
          width="1717"
          height="916"
        />

        <div className={styles.introductionCard}>
          <div className={styles.introductionCopy}>
            <h1 id="home-introduction-title">
              <span>World citizen.</span>
              <span>Entrepreneur.</span>
              <span>Student of life.</span>
            </h1>
            <p>
              I build, learn, and explore across technology, science, and the
              wider world—following questions wherever they lead.
            </p>
          </div>

          <div className={styles.portraitFrame}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home-introduction-portrait.png"
              alt="Portrait of Vishvajith BK"
              width="1254"
              height="1254"
            />
          </div>
        </div>

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
                aria-expanded={activePanelId === panel.id}
                onClick={() =>
                  setActivePanelId((currentPanelId) =>
                    currentPanelId === panel.id ? null : panel.id,
                  )
                }
              >
                <span className={styles.introductionButtonLabel}>
                  {panel.title}
                </span>
              </button>
            </div>
          ))}
        </div>

        <section
          className={`${styles.introductionPanel} ${
            activePanel ? styles.introductionPanelOpen : ""
          }`}
          id="home-introduction-panel"
          aria-hidden={!activePanel}
          aria-live="polite"
        >
          {activePanel ? (
            <article
              className={styles.introductionPanelContent}
              key={activePanel.id}
            >
              <header className={styles.introductionPanelHeader}>
                <h2 id="home-introduction-panel-title">{activePanel.title}</h2>
                <button
                  className={styles.introductionPanelClose}
                  type="button"
                  aria-label="Close introduction"
                  onClick={() => setActivePanelId(null)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </header>
              <div className={styles.introductionPanelBody}>
                {activePanel.content}
              </div>
            </article>
          ) : null}
        </section>
      </section>
    </div>
  );
}
