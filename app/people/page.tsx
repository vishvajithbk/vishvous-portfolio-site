import { PeopleGallery } from "./PeopleGallery";
import styles from "./people.module.css";

export default function People() {
  return (
    <main
      className={styles.peoplePage}
      id="people-top"
      aria-label="People page"
    >
      <PeopleGallery />

      <footer className={styles.peopleFooter} aria-label="People page footer">
        <p>A living index. Revisited often.</p>
        <a href="#people-top" aria-label="Return to the top of People">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}
