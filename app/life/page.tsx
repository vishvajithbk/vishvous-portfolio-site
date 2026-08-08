import type { Metadata } from "next";
import styles from "./life.module.css";

export const metadata: Metadata = {
  title: "Life — Vishvous",
  description: "Nothing to see here yet. Go touch some grass.",
};

export default function LifePage() {
  return (
    <main className={styles.lifePage} aria-label="Life page">
      <figure className={styles.message}>
        {/* The supplied artwork is the complete empty-state message. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.messageImage}
          src="/life/nothing-to-see-here-yet.png"
          alt="Nothing to see here yet. Go touch some grass."
          width="1672"
          height="941"
        />
      </figure>
    </main>
  );
}
