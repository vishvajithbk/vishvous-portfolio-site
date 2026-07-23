import { PeopleGallery } from "./PeopleGallery";
import styles from "./people.module.css";

export default function People() {
  return (
    <main className={styles.peoplePage} aria-label="People page">
      <h1 className="sr-only">People</h1>
      <PeopleGallery />
    </main>
  );
}
