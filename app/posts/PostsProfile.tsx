"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./posts.module.css";
import { thoughts } from "./thoughts";
import type { ThoughtOrder } from "./ThoughtTimeline";

const PHOTO_TRANSITION_MS = 260;

const profile = {
  name: "Vishvajith BK",
  handle: "@vishvajith_bk",
  bio: "chasing questions that bend reality",
} as const;

function ProfileAvatar({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      className={`${styles.avatarSilhouette} ${styles.profileAvatar}`}
      aria-label={`Open original profile photo of ${profile.name}`}
      onClick={onOpen}
    />
  );
}

export function PostsProfile({
  order,
  onToggleOrder,
}: {
  order: ThoughtOrder;
  onToggleOrder: () => void;
}) {
  const photoDialogRef = useRef<HTMLDialogElement>(null);
  const photoCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (photoCloseTimeoutRef.current) {
        window.clearTimeout(photoCloseTimeoutRef.current);
      }
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
      <section className={styles.profileHeader} aria-label="Posts profile">
        <div className={styles.profileBanner}>
          <div className={styles.profileBannerTopline}>
            <p>Original notes</p>
            <p>2026 — ongoing</p>
          </div>

          <div className={styles.profileBannerStatement}>
            <h1>Thoughts, kept in motion.</h1>
            <p>
              Brief observations, unfinished questions, and ideas I want to
              return to.
            </p>
          </div>
        </div>

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
              <dd>
                <button
                  className={styles.orderButton}
                  type="button"
                  aria-label={`Show ${order === "newest" ? "oldest" : "newest"} thoughts first`}
                  onClick={onToggleOrder}
                >
                  <span className={styles.orderButtonLabel} key={order}>
                    {order === "newest" ? "Newest first" : "Oldest first"}
                  </span>
                </button>
              </dd>
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
