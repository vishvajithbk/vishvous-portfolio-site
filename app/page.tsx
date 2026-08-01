import { HomeIntroduction } from "./HomeIntroduction";
import { WorkShowcase } from "./research/WorkShowcase";
import workStyles from "./research/research.module.css";

export default function Home() {
  return (
    <>
      <HomeIntroduction />

      <div className={workStyles.globeDivider} aria-hidden="true">
        <span />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/work-globe.svg" alt="" width="28" height="28" />
        <span />
      </div>

      <WorkShowcase />
    </>
  );
}
