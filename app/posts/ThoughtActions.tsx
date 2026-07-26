"use client";

import { useState } from "react";
import styles from "./posts.module.css";

type Vote = "like" | "dislike" | null;

type ThoughtActionsProps = {
  content: string;
  postedAt: string;
  postedLabel: string;
};

export function ThoughtActions({
  content,
  postedAt,
  postedLabel,
}: ThoughtActionsProps) {
  const [vote, setVote] = useState<Vote>(null);
  const [copied, setCopied] = useState(false);

  async function copyThought() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function toggleVote(nextVote: Exclude<Vote, null>) {
    setVote((currentVote) => (currentVote === nextVote ? null : nextVote));
  }

  return (
    <footer className={styles.thoughtActions} aria-label="Thought actions">
      <button
        className={styles.actionButton}
        type="button"
        aria-label={copied ? "Thought copied" : "Copy thought"}
        data-active={copied}
        onClick={copyThought}
      >
        <span className={`${styles.actionIcon} ${styles.copyIcon}`} />
      </button>

      <button
        className={styles.actionButton}
        type="button"
        aria-label="Like thought"
        aria-pressed={vote === "like"}
        onClick={() => toggleVote("like")}
      >
        <span className={`${styles.actionIcon} ${styles.voteIcon}`} />
      </button>

      <button
        className={styles.actionButton}
        type="button"
        aria-label="Dislike thought"
        aria-pressed={vote === "dislike"}
        onClick={() => toggleVote("dislike")}
      >
        <span
          className={`${styles.actionIcon} ${styles.voteIcon} ${styles.downVoteIcon}`}
        />
      </button>

      <span className={styles.thoughtDate}>
        <span className={`${styles.actionIcon} ${styles.globeIcon}`} />
        <time dateTime={postedAt}>{postedLabel}</time>
      </span>
    </footer>
  );
}
