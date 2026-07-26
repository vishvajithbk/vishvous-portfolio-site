import assert from "node:assert/strict";
import test from "node:test";
import {
  getCurrentWork,
  getPreviousWork,
  validateWorkItems,
} from "../app/work/work.ts";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Vishvous shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Vishvous<\/title>/i);
  assert.match(
    html,
    /property="og:image" content="http:\/\/localhost(?::3000)?\/og\.png"/i,
  );
  assert.match(html, /name="twitter:card" content="summary_large_image"/i);
  assert.match(html, />vishvous<\/a>/i);
  assert.match(html, /Primary navigation/i);
  assert.match(html, /href="\/posts"/i);
  assert.match(html, /href="\/people"/i);
  assert.match(html, /href="\/signals"/i);
  assert.match(html, /href="\/work"/i);
  assert.doesNotMatch(html, /href="\/research"/i);
  assert.match(html, /aria-label="Light appearance"/i);
  assert.match(html, /aria-label="Dark appearance"/i);
  assert.doesNotMatch(html, /aria-label="Darker appearance"/i);
  assert.match(html, /aria-label="Home page"/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("serves every dedicated content route with the shared shell", async () => {
  for (const [pathname, pageName] of [
    ["/posts", "Posts"],
    ["/people", "People"],
    ["/signals", "Signals"],
    ["/work", "Work"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);

    const html = await response.text();
    assert.match(html, />vishvous<\/a>/i, pathname);
    assert.match(html, new RegExp(`aria-label="${pageName} page"`, "i"), pathname);
  }
});

test("permanently redirects the former Research route to Work", async () => {
  const response = await render("/research");
  assert.equal(response.status, 308);
  assert.equal(
    new URL(response.headers.get("location") ?? "", "http://localhost").pathname,
    "/work",
  );
});

test("renders the Work introduction and honest empty state", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<h1[^>]*>Work<\/h1>/i);
  assert.match(
    html,
    /Selected writing, projects, and research(?:—|&#x2014;)published where each belongs\./i,
  );
  assert.match(html, /Publishing here soon\./i);
  assert.doesNotMatch(html, /href="#"/i);
  assert.doesNotMatch(html, /SoundCloud/i);
});

test("orders current and previous work deterministically", () => {
  const items = [
    {
      id: "research-current",
      category: "research",
      title: "Research current",
      summary: "A current research thread.",
      status: "current",
      date: "2026-07-20",
      currentOrder: 2,
      artifacts: [
        {
          platform: "Substack",
          label: "Read on Substack",
          href: "https://example.com/research",
        },
      ],
    },
    {
      id: "project-current",
      category: "project",
      title: "Project current",
      summary: "A current project.",
      status: "current",
      date: "2026-07-21",
      currentOrder: 1,
      artifacts: [
        {
          platform: "GitHub",
          label: "View on GitHub",
          href: "https://example.com/project",
        },
        {
          platform: "SoundCloud",
          label: "Listen on SoundCloud",
          href: "https://example.com/audio",
        },
      ],
    },
    {
      id: "writing-older",
      category: "writing",
      title: "Older writing",
      summary: "An older article.",
      status: "published",
      date: "2026-05-01",
      artifacts: [
        {
          platform: "Work blog",
          label: "Read article",
          href: "https://example.com/older",
        },
      ],
    },
    {
      id: "writing-newer",
      category: "writing",
      title: "Newer writing",
      summary: "A newer article.",
      status: "published",
      date: "2026-06-01",
      artifacts: [
        {
          platform: "Substack",
          label: "Read on Substack",
          href: "https://example.com/newer",
        },
      ],
    },
  ];

  assert.doesNotThrow(() => validateWorkItems(items));
  assert.deepEqual(
    getCurrentWork(items).map((item) => item.id),
    ["project-current", "research-current"],
  );

  const previousWork = getPreviousWork(items);
  assert.deepEqual(
    previousWork.writing.map((item) => item.id),
    ["writing-newer", "writing-older"],
  );
  assert.deepEqual(previousWork.project, []);
  assert.deepEqual(previousWork.research, []);
});

test("rejects invalid Work registry records", () => {
  const baseItem = {
    id: "valid-item",
    category: "project",
    title: "Valid item",
    summary: "A valid item.",
    status: "completed",
    date: "2026-07-20",
    artifacts: [
      {
        platform: "GitHub",
        label: "View on GitHub",
        href: "https://example.com/project",
      },
    ],
  };

  assert.throws(
    () => validateWorkItems([baseItem, { ...baseItem }]),
    /Duplicate work id/,
  );
  assert.throws(
    () => validateWorkItems([{ ...baseItem, date: "2026-02-30" }]),
    /valid ISO date/,
  );
  assert.throws(
    () => validateWorkItems([{ ...baseItem, artifacts: [] }]),
    /at least one artifact/,
  );
  assert.throws(
    () =>
      validateWorkItems([
        {
          ...baseItem,
          artifacts: [
            {
              ...baseItem.artifacts[0],
              href: "http://example.com/project",
            },
          ],
        },
      ]),
    /insecure artifact URL/,
  );
});

test("renders thirty thought cards on Posts", async () => {
  const response = await render("/posts");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.equal((html.match(/aria-label="Thought posted /g) ?? []).length, 30);
  assert.equal((html.match(/aria-label="Copy thought"/g) ?? []).length, 30);
  assert.equal((html.match(/aria-label="Like thought"/g) ?? []).length, 30);
  assert.equal((html.match(/aria-label="Dislike thought"/g) ?? []).length, 30);
  assert.equal((html.match(/<time /g) ?? []).length, 30);
  assert.match(html, /aria-label="Posts profile"/i);
  assert.match(html, /data-profile-takeover/i);
  assert.match(html, /chasing questions that bend reality/i);
  assert.match(html, /Joined January 2026/i);
  assert.doesNotMatch(html, />30 thoughts</i);
  assert.ok(
    html.indexOf('aria-label="Posts profile"') <
      html.indexOf('aria-label="Thoughts in chronological order"'),
    "the Posts profile should appear before the thought cards",
  );
  assert.match(html, /Believe you can and you(?:&#x27;|')re halfway there\./i);
  assert.match(html, /Stars can(?:&#x27;|')t shine without darkness\./i);
});

test("renders the initial three-column People feed with names only", async () => {
  const response = await render("/people");
  assert.equal(response.status, 200);

  const html = await response.text();
  for (const name of [
    "Sam Altman",
    "Elon Musk",
    "Ilya Sutskever",
    "Geoffrey Hinton",
    "A. P. J. Abdul Kalam",
    "Satish Dhawan",
    "Jai Shankar",
    "abcd",
    "efgh",
  ]) {
    assert.match(html, new RegExp(name.replaceAll(".", "\\.")), name);
  }

  assert.match(html, /Showing 15 of 40 people\. More load while scrolling\./i);
  assert.equal((html.match(/data-influence-line/g) ?? []).length, 3);
  assert.match(html, /These are the people who shaped how I see the world\./i);
  assert.ok(
    html.indexOf("These are the people who shaped") <
      html.indexOf('aria-label="People gallery"'),
    "the influence hero should appear before the profile cards",
  );
  assert.doesNotMatch(html, /Add Member|Connecting|@user|23m ago/i);
});
