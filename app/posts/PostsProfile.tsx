"use client";

import { useEffect } from "react";
import styles from "./posts.module.css";

const profile = {
  name: "Vishvajith BK",
  handle: "@vishvajith_bk",
  bio: "chasing questions that bend reality",
  joined: "Joined January 2026",
} as const;

function DummyAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`${styles.avatarSilhouette} ${
        compact ? styles.compactAvatar : styles.profileAvatar
      }`}
      role={compact ? undefined : "img"}
      aria-label={compact ? undefined : "Profile image placeholder"}
    >
      <span className={styles.avatarHead} aria-hidden="true" />
      <span className={styles.avatarBody} aria-hidden="true" />
    </span>
  );
}

export function PostsProfile() {
  useEffect(() => {
    const root = document.documentElement;
    let previousScrollY = window.scrollY;
    let frameId = 0;

    root.dataset.postsNav = "visible";

    function updateNavigation() {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;

      if (currentScrollY <= 2 || scrollDelta < 0) {
        root.dataset.postsNav = "visible";
      } else if (scrollDelta > 0) {
        root.dataset.postsNav = "hidden";
      }

      previousScrollY = currentScrollY;
      frameId = 0;
    }

    function handleScroll() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateNavigation);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      delete root.dataset.postsNav;
    };
  }, []);

  return (
    <>
      <div
        className={styles.profileTakeover}
        data-profile-takeover
        aria-hidden="true"
      >
        <DummyAvatar compact />
        <span className={styles.takeoverIdentity}>
          <strong>{profile.name}</strong>
          <span>{profile.bio}</span>
        </span>
        <span className={styles.takeoverJoined}>{profile.joined}</span>
      </div>

      <section className={styles.profileHeader} aria-label="Posts profile">
        <div className={styles.profileBanner} aria-hidden="true" />

        <div className={styles.profileDetails}>
          <DummyAvatar />
          <h2 className={styles.profileName}>{profile.name}</h2>
          <p className={styles.profileHandle}>{profile.handle}</p>
          <p className={styles.profileBio}>{profile.bio}</p>
          <p className={styles.profileJoined}>
            <span className={styles.calendarIcon} aria-hidden="true" />
            {profile.joined}
          </p>
        </div>
      </section>
    </>
  );
}
