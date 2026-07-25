import { PostsProfile } from "./PostsProfile";
import { ThoughtTimeline } from "./ThoughtTimeline";
import styles from "./posts.module.css";
import { thoughts } from "./thoughts";

export default function Posts() {
  return (
    <main className={styles.postsPage} aria-label="Posts page">
      <h1 className="sr-only">Posts</h1>
      <PostsProfile thoughtCount={thoughts.length} />
      <ThoughtTimeline />
    </main>
  );
}
