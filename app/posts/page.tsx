"use client";

import { useEffect, useState } from "react";
import { PostsInvitation } from "../PostsInvitation";
import { PostsProfile } from "./PostsProfile";
import {
  ThoughtTimeline,
  type ThoughtOrder,
} from "./ThoughtTimeline";
import styles from "./posts.module.css";

export default function Posts() {
  const [order, setOrder] = useState<ThoughtOrder>("newest");

  useEffect(() => {
    const root = document.documentElement;
    const archive = document.querySelector<HTMLElement>(
      '[aria-labelledby="thought-archive-title"]',
    );
    let frameId = 0;

    function updateArchiveThreshold() {
      if (!archive) {
        return;
      }

      const headerHeight = Number.parseFloat(
        window
          .getComputedStyle(root)
          .getPropertyValue("--site-header-height"),
      );

      root.dataset.postsArchiveCrossed =
        archive.getBoundingClientRect().top <= headerHeight ? "true" : "false";
      frameId = 0;
    }

    function scheduleArchiveThresholdUpdate() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateArchiveThreshold);
      }
    }

    updateArchiveThreshold();
    window.addEventListener("scroll", scheduleArchiveThresholdUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleArchiveThresholdUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleArchiveThresholdUpdate);
      window.removeEventListener("resize", scheduleArchiveThresholdUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      delete root.dataset.postsArchiveCrossed;
    };
  }, []);

  return (
    <main className={`${styles.postsPage} posts-route`} aria-label="Posts page">
      <PostsProfile
        order={order}
        onToggleOrder={() =>
          setOrder((currentOrder) =>
            currentOrder === "newest" ? "oldest" : "newest",
          )
        }
      />
      <ThoughtTimeline order={order} />

      <div className={styles.postsInvitationFooter}>
        <div className={styles.postsInvitationDivider} aria-hidden="true" />

        <PostsInvitation />
      </div>
    </main>
  );
}
