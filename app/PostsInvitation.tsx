"use client";

import styles from "./posts-invitation.module.css";

export function PostsInvitation() {
  return (
    <section className={styles.postsInvitation} aria-label="Posts invitation">
      <div className={styles.invitationInner}>
        <a className={styles.invitationHeading} href="/posts">
          <span>Read my</span> <span>Thoughts</span>
        </a>

        <form
          className={styles.subscribeForm}
          aria-label="Subscribe to posts"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className={styles.subscribeRow}>
            <input
              type="email"
              aria-label="Email address"
              placeholder="Enter email"
              autoComplete="email"
            />
            <button type="submit">Get notified</button>
          </div>
          <p>Opt in to receive updates. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  );
}
