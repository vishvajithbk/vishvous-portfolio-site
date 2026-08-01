import { PeopleGallery } from "./PeopleGallery";
import styles from "./people.module.css";

export default function People() {
  return (
    <main className={styles.peoplePage} aria-label="People page">
      <PeopleGallery />
    </main>
  );
}
