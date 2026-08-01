import type { Metadata } from "next";
import { ArchivePage } from "./ArchivePage";

export const metadata: Metadata = {
  title: "Archive — Vishvous",
  description:
    "A curated archive of videos, essays, and articles worth returning to.",
};

export default function Archive() {
  return <ArchivePage />;
}
