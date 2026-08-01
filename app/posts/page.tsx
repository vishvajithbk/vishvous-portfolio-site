import { PostsInvitation } from "../PostsInvitation";
import workStyles from "../research/research.module.css";
import { PostsProfile } from "./PostsProfile";
import { ThoughtTimeline } from "./ThoughtTimeline";
import styles from "./posts.module.css";

export default function Posts() {
  return (
    <main className={styles.postsPage} aria-label="Posts page">
      <h1 className="sr-only">Posts</h1>
      <PostsProfile />
      <ThoughtTimeline />

      <div className={styles.postsInvitationFooter}>
        <div className={workStyles.globeDivider} aria-hidden="true">
          <span />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/filter-circle.svg" alt="" width="28" height="28" />
          <span />
        </div>

        <PostsInvitation />
      </div>
    </main>
  );
}
