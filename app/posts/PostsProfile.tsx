"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./posts.module.css";
import { thoughts } from "./thoughts";

const PHOTO_TRANSITION_MS = 260;

const profile = {
  name: "Vishvajith BK",
  handle: "@vishvajith_bk",
  bio: "chasing questions that bend reality",
  joined: "Joined January 2026",
} as const;

function ProfileAvatar({
  compact = false,
  onOpen,
}: {
  compact?: boolean;
  onOpen?: () => void;
}) {
  const className = `${styles.avatarSilhouette} ${
    compact ? styles.compactAvatar : styles.profileAvatar
  }`;

  if (compact) {
    return <span className={className} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={`Open original profile photo of ${profile.name}`}
      onClick={onOpen}
    />
  );
}

export function PostsProfile() {
  const profileHeaderRef = useRef<HTMLElement>(null);
  const photoDialogRef = useRef<HTMLDialogElement>(null);
  const photoCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const profileHeader = profileHeaderRef.current;
    let previousScrollY = window.scrollY;
    let frameId = 0;

    if (!profileHeader) {
      return;
    }

    root.dataset.postsNav = "visible";

    function updateHeaderRule() {
      const siteHeaderHeight = Number.parseFloat(
        window
          .getComputedStyle(root)
          .getPropertyValue("--site-header-height"),
      );

      root.dataset.postsProfile =
        profileHeader.getBoundingClientRect().bottom > siteHeaderHeight
          ? "visible"
          : "gone";
    }

    function updateNavigation() {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;

      if (currentScrollY <= 2 || scrollDelta < 0) {
        root.dataset.postsNav = "visible";
      } else if (scrollDelta > 0) {
        root.dataset.postsNav = "hidden";
      }

      updateHeaderRule();
      previousScrollY = currentScrollY;
      frameId = 0;
    }

    function handleScroll() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateNavigation);
      }
    }

    updateHeaderRule();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeaderRule);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderRule);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (photoCloseTimeoutRef.current) {
        window.clearTimeout(photoCloseTimeoutRef.current);
      }
      delete root.dataset.postsNav;
      delete root.dataset.postsProfile;
    };
  }, []);

  function openProfilePhoto() {
    const dialog = photoDialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    if (photoCloseTimeoutRef.current) {
      window.clearTimeout(photoCloseTimeoutRef.current);
      photoCloseTimeoutRef.current = null;
    }

    dialog.showModal();
    window.requestAnimationFrame(() => {
      dialog.dataset.open = "true";
    });
  }

  function closeProfilePhoto() {
    const dialog = photoDialogRef.current;

    if (!dialog?.open) {
      return;
    }

    delete dialog.dataset.open;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }

    photoCloseTimeoutRef.current = window.setTimeout(() => {
      dialog.close();
      photoCloseTimeoutRef.current = null;
    }, PHOTO_TRANSITION_MS);
  }

  return (
    <>
      <div
        className={styles.profileTakeover}
        data-profile-takeover
        aria-hidden="true"
      >
        <ProfileAvatar compact />
        <span className={styles.takeoverIdentity}>
          <strong>{profile.name}</strong>
          <span>{profile.bio}</span>
        </span>
        <span className={styles.takeoverJoined}>{profile.joined}</span>
      </div>

      <section
        ref={profileHeaderRef}
        className={styles.profileHeader}
        aria-label="Posts profile"
      >
        <div className={styles.profileBanner} aria-hidden="true" />

        <div className={styles.profileCard}>
          <ProfileAvatar onOpen={openProfilePhoto} />

          <p className={styles.profileContext}>
            <span className={styles.contextMark} aria-hidden="true" />
            Original notes
          </p>

          <div className={styles.profileIdentity}>
            <h2 className={styles.profileName}>{profile.name}</h2>
            <p className={styles.profileHandle}>{profile.handle}</p>
          </div>

          <p className={styles.profileBio}>{profile.bio}</p>

          <dl className={styles.profileFacts}>
            <div className={styles.profileFact}>
              <dt>Posts</dt>
              <dd>{thoughts.length}</dd>
            </div>
            <div className={styles.profileFact}>
              <dt>Joined</dt>
              <dd>Jan 2026</dd>
            </div>
            <div className={styles.profileFact}>
              <dt>Order</dt>
              <dd>Newest first</dd>
            </div>
          </dl>
        </div>
      </section>

      <dialog
        ref={photoDialogRef}
        className={styles.profilePhotoDialog}
        aria-label={`Original profile photo of ${profile.name}`}
        onCancel={(event) => {
          event.preventDefault();
          closeProfilePhoto();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeProfilePhoto();
          }
        }}
      >
        <div className={styles.profilePhotoFrame}>
          <div className={styles.profilePhotoStage}>
            <Image
              className={styles.profilePhotoOriginal}
              src="/vishvajith-profile.jpeg"
              alt={profile.name}
              width={2316}
              height={3088}
              sizes="90vw"
              unoptimized
              draggable="false"
            />
            <button
              type="button"
              className={styles.profilePhotoClose}
              aria-label="Close profile photo"
              onClick={closeProfilePhoto}
            >
              <span
                className={styles.profilePhotoCloseIcon}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
