import { HomeIntroduction } from "./HomeIntroduction";
import { WorkShowcase } from "./research/WorkShowcase";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.homePage} aria-label="Home page">
      <HomeIntroduction />

      <section className={styles.workIntroduction} aria-labelledby="work-title">
        <div className={styles.workTopline}>
          <p>Selected work</p>
          <p>Writing · Building · Research</p>
        </div>

        <div className={styles.workStatement}>
          <h2 id="work-title">Ideas, made tangible.</h2>
          <p>
            A deliberately small view of what I&apos;m writing, building, and
            investigating—each category opens into a living index of the work.
          </p>
        </div>
      </section>

      <WorkShowcase />
    </main>
  );
}
