export const workCategories = ["writing", "project", "research"] as const;

export type WorkCategory = (typeof workCategories)[number];
export type WorkStatus = "current" | "published" | "completed";

export type WorkArtifact = {
  platform: string;
  label: string;
  href: `https://${string}`;
};

export type WorkItem = {
  id: string;
  category: WorkCategory;
  title: string;
  summary: string;
  status: WorkStatus;
  date: string;
  currentOrder?: number;
  artifacts: WorkArtifact[];
};

export const categoryLabels: Record<WorkCategory, string> = {
  writing: "Writing",
  project: "Projects",
  research: "Research",
};

export const statusLabels: Record<WorkStatus, string> = {
  current: "Current",
  published: "Published",
  completed: "Completed",
};

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const parsedDate = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value;
}

export function validateWorkItems(items: readonly WorkItem[]): void {
  const ids = new Set<string>();
  const currentOrders = new Set<number>();
  let currentCount = 0;

  for (const item of items) {
    if (ids.has(item.id)) {
      throw new Error(`Duplicate work id: ${item.id}`);
    }
    ids.add(item.id);

    if (!isIsoDate(item.date)) {
      throw new Error(`Work item ${item.id} must use a valid ISO date`);
    }

    if (item.artifacts.length === 0) {
      throw new Error(`Work item ${item.id} needs at least one artifact`);
    }

    for (const artifact of item.artifacts) {
      if (!artifact.href.startsWith("https://")) {
        throw new Error(`Work item ${item.id} has an insecure artifact URL`);
      }
    }

    if (item.status === "current") {
      currentCount += 1;

      if (!Number.isInteger(item.currentOrder) || item.currentOrder! < 1) {
        throw new Error(
          `Current work item ${item.id} needs a positive currentOrder`,
        );
      }

      if (currentOrders.has(item.currentOrder!)) {
        throw new Error(`Duplicate currentOrder: ${item.currentOrder}`);
      }
      currentOrders.add(item.currentOrder!);
    } else if (item.currentOrder !== undefined) {
      throw new Error(
        `Non-current work item ${item.id} cannot have a currentOrder`,
      );
    }
  }

  if (currentCount > 3) {
    throw new Error("Work can contain no more than three current items");
  }
}

export function getCurrentWork(items: readonly WorkItem[]): WorkItem[] {
  return items
    .filter((item) => item.status === "current")
    .sort((first, second) => first.currentOrder! - second.currentOrder!);
}

export function getPreviousWork(
  items: readonly WorkItem[],
): Record<WorkCategory, WorkItem[]> {
  return Object.fromEntries(
    workCategories.map((category) => [
      category,
      items
        .filter(
          (item) => item.category === category && item.status !== "current",
        )
        .sort((first, second) => second.date.localeCompare(first.date)),
    ]),
  ) as Record<WorkCategory, WorkItem[]>;
}

export function formatWorkDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

// Publish externally first, then add only selected public work here. Related
// writing, repositories, demos, and recordings belong in one item's artifacts.
export const workItems: WorkItem[] = [];

validateWorkItems(workItems);
