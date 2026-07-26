import type { Metadata } from "next";
import { WorkIndex } from "./WorkIndex";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work — Vishvous",
  description:
    "Selected writing, projects, and research by Vishvajith, linked to where each work is published.",
};

export default function Work() {
  return (
    <main className={styles.workPage} aria-label="Work page">
      <WorkIndex />
    </main>
  );
}
