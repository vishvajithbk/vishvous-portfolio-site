import assert from "node:assert/strict";
import test from "node:test";

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
  assert.match(html, />vishvous<\/a>/i);
  assert.match(html, /Primary navigation/i);
  assert.match(html, /href="\/posts"/i);
  assert.match(html, /href="\/people"/i);
  assert.match(html, /href="\/signals"/i);
  assert.match(html, /href="\/gallery"[^>]*>Gallery<\/a>/i);
  assert.doesNotMatch(html, /href="\/work"/i);
  const navigation = html.match(
    /<nav[^>]*aria-label="Primary navigation"[^>]*>[\s\S]*?<\/nav>/i,
  )?.[0];
  assert.ok(navigation, "primary navigation should render");
  const navigationItems = [
    'href="/">Home</a>',
    'href="/posts">Posts</a>',
    'href="/gallery">Gallery</a>',
    'href="/people">People</a>',
    'href="/signals">Archive</a>',
  ];
  for (let index = 1; index < navigationItems.length; index += 1) {
    assert.ok(
      navigation.indexOf(navigationItems[index - 1]) <
        navigation.indexOf(navigationItems[index]),
      `${navigationItems[index - 1]} should precede ${navigationItems[index]}`,
    );
  }
  assert.match(html, /aria-label="Light appearance"/i);
  assert.match(html, /aria-label="Dark appearance"/i);
  assert.doesNotMatch(html, /aria-label="Darker appearance"/i);
  assert.match(html, /aria-label="Work page"/i);
  assert.match(html, /src="\/home-hero-observatory-cropped\.png"/i);
  assert.match(html, /src="\/home-introduction-portrait\.png"/i);
  assert.match(html, /World citizen\./i);
  assert.match(html, /Entrepreneur\./i);
  assert.match(html, /Student of life\./i);
  assert.doesNotMatch(html, /Unleash your creativity with Marble/i);
  assert.doesNotMatch(html, /Create with Marble/i);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("serves every dedicated content route with the shared shell", async () => {
  for (const [pathname, pageName] of [
    ["/posts", "Posts"],
    ["/people", "People"],
    ["/signals", "Archive"],
    ["/gallery", "Gallery"],
    ["/research", "Work"],
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);

    const html = await response.text();
    assert.match(html, />vishvous<\/a>/i, pathname);
    assert.match(html, new RegExp(`aria-label="${pageName} page"`, "i"), pathname);
  }
});

test("renders the curated Archive playlist and reading index", async () => {
  const response = await render("/signals");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Archive — Vishvous<\/title>/i);
  assert.match(html, /aria-label="Archive page"/i);
  assert.match(html, /Worth returning to\./i);
  assert.doesNotMatch(html, /A—001|heroIndex|sectionNumber/i);
  assert.match(html, />The playlist<\/h2>/i);
  assert.doesNotMatch(html, /public collections|The playlists/i);
  assert.match(html, /Finance and Modelling/i);
  assert.doesNotMatch(html, /Proteins and Alphafold|Jobs and Career/i);
  assert.equal(
    (html.match(/aria-label="Preview [^"]+"/g) ?? []).length,
    8,
  );
  assert.equal((html.match(/aria-current="true"/g) ?? []).length, 1);
  assert.match(html, /aria-label="Finance and Modelling videos"/i);
  assert.match(html, /Dr\. David Henderson \| Free Market Economics/i);
  assert.match(html, /What an AI Learns to Optimise For/i);
  assert.match(
    html,
    /src="https:\/\/www\.youtube-nocookie\.com\/embed\/intotDzjFN4\?rel=0(?:&amp;|&)list=PLAVWgRxryYXI"/i,
  );
  assert.match(html, /loading="lazy"/i);
  assert.match(
    html,
    /href="https:\/\/www\.youtube\.com\/playlist\?list=PLAVWgRxryYXI"/i,
  );
  assert.match(html, /aria-labelledby="watch-heading"/i);
  assert.match(html, /aria-labelledby="read-heading"/i);
  assert.equal((html.match(/class="[^\"]*readingLink[^\"]*"/g) ?? []).length, 5);

  for (const title of [
    "The Future Worth Building Is Human",
    "Project Think: Building the Next Generation of AI Agents on Cloudflare",
    "When To Do What You Love",
    "Machines of Loving Grace",
    "How to Fix Your Entire Life in 1 Day",
  ]) {
    assert.match(html, new RegExp(title), title);
  }

  assert.equal(
    (html.match(/href="https:\/\/www\.paulgraham\.com\/when\.html"/g) ?? [])
      .length,
    1,
  );
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 6);
  assert.equal((html.match(/rel="noopener noreferrer"/g) ?? []).length, 6);
});

test("keeps Gallery empty and removes the former Work route", async () => {
  const galleryResponse = await render("/gallery");
  assert.equal(galleryResponse.status, 200);

  const galleryHtml = await galleryResponse.text();
  assert.match(galleryHtml, /aria-label="Gallery page"/i);
  assert.doesNotMatch(galleryHtml, /aria-label="Work categories"/i);

  const workResponse = await render("/work");
  assert.equal(workResponse.status, 404);
});

test("renders the image-ready Work showcase on Home", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /aria-label="Introduction options"/i);
  for (const label of ["Me in 10 seconds", "Me in 10 minutes"]) {
    assert.match(
      html,
      new RegExp(
        `<button[^>]*aria-controls="home-introduction-panel"[^>]*aria-expanded="false"[^>]*>[\\s\\S]*?${label}[\\s\\S]*?<\\/button>`,
        "i",
      ),
      label,
    );
  }
  assert.match(
    html,
    /<section[^>]*id="home-introduction-panel"[^>]*aria-hidden="true"/i,
  );
  assert.doesNotMatch(html, /<dialog[^>]*id="home-introduction-dialog"/i);
  assert.equal((html.match(/src="\/work-globe\.svg"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /src="\/filter-circle\.svg"/i);
  assert.doesNotMatch(html, /aria-label="Posts invitation"/i);
  assert.match(html, /<footer[^>]*aria-label="Contact and links"/i);
  assert.match(html, /aria-label="Ask me anything"/i);
  assert.ok(
    html.indexOf('src="/home-hero-observatory-cropped.png"') <
      html.indexOf('aria-label="Introduction options"'),
    "the hero should appear before the introduction controls",
  );
  assert.ok(
    html.indexOf('aria-label="Introduction options"') <
      html.indexOf('aria-label="Work categories"'),
    "the introduction controls should appear before the Work section",
  );
  assert.match(html, /aria-label="Work page"/i);
  assert.doesNotMatch(html, /data-image-slot="work-hero"/i);
  assert.equal((html.match(/data-image-slot=/g) ?? []).length, 3);
  assert.equal((html.match(/data-crop=/g) ?? []).length, 3);
  assert.match(html, /data-crop="left"/i);
  assert.match(html, /data-crop="center"/i);
  assert.match(html, /data-crop="right"/i);
  assert.match(html, /src="\/work-blogs\.svg\?v=2"/i);
  assert.match(html, /src="\/work-projects\.svg\?v=1"/i);
  assert.match(html, /src="\/work-research\.svg\?v=1"/i);
  assert.match(html, /src="\/work-globe\.svg"/i);
  for (const category of ["Blogs", "Projects", "Research"]) {
    assert.match(
      html,
      new RegExp(
        `<button[^>]*aria-controls="work-catalog-dialog"[^>]*aria-expanded="false"[^>]*aria-haspopup="dialog"[^>]*>\\s*${category}\\s*<\\/button>`,
        "i",
      ),
      category,
    );
  }
  assert.match(html, /<dialog[^>]*id="work-catalog-dialog"/i);
  assert.match(html, /role="dialog"/i);
  assert.match(html, /aria-modal="true"/i);
  assert.match(html, /aria-labelledby="work-catalog-dialog-title"/i);
  assert.match(html, /aria-label="Close Work catalog"/i);
  assert.match(html, /href="https:\/\/vishvajithbk\.substack\.com\/"/i);
  assert.match(html, /href="https:\/\/github\.com\/"/i);
  assert.match(html, /href="https:\/\/medium\.com\/"/i);
  assert.equal((html.match(/>Go to site<\/a>/g) ?? []).length, 3);
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 4);
  assert.equal((html.match(/rel="noopener noreferrer"/g) ?? []).length, 4);
  assert.match(html, /aria-label="Work categories"/i);
  assert.ok(
    html.indexOf('aria-label="Work categories"') <
      html.indexOf('aria-label="Contact and links"'),
    "the footer should appear below the Work cards",
  );
  assert.match(html, /aria-label="Blog posts"/i);
  assert.match(html, /aria-label="Projects"/i);
  assert.match(html, /aria-label="Research"/i);
  assert.match(html, /Research catalog coming soon/i);
  assert.match(html, /placeholder="Search posts"/i);
  assert.doesNotMatch(html, />\s*(?:Latest|Top|Discussions)\s*</i);
  assert.match(html, /href="https:\/\/vishvajithbk\.substack\.com\/p\/luck-maximization"/i);
  assert.match(html, /href="https:\/\/vishvajithbk\.substack\.com\/p\/8-independent-thoughts"/i);
  assert.match(html, /href="https:\/\/vishvajithbk\.substack\.com\/p\/victims-of-modernity"/i);
  assert.match(html, /href="https:\/\/vishvajithbk\.substack\.com\/p\/20s-unfolded"/i);
  assert.match(html, /work-blog-luck\.jpg/i);
  assert.match(html, /work-blog-independent-thoughts\.jpg/i);
  assert.match(html, /work-blog-victims-modernity\.jpg/i);
  assert.match(html, /work-blog-20s-unfolded\.jpg/i);
  assert.equal((html.match(/aria-label="View [^"]+ on GitHub"/g) ?? []).length, 5);

  for (const projectTitle of [
    "SequenceStudio",
    "Protein Engineering AI IDE",
    "Benchling Biotech R&amp;D Platform",
    "Molecular Data Explorer",
    "Research Automation Toolkit",
  ]) {
    assert.match(html, new RegExp(projectTitle), projectTitle);
  }

  const postTitles = [
    "Luck Maximization",
    "8 Independent Thoughts",
    "Victims of Modernity",
    "20s, Unfolded",
  ];
  for (let index = 1; index < postTitles.length; index += 1) {
    assert.ok(
      html.indexOf(postTitles[index - 1]) < html.indexOf(postTitles[index]),
      `${postTitles[index - 1]} should render before ${postTitles[index]}`,
    );
  }
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
  assert.match(html, />Original notes</i);
  assert.match(html, />30</i);
  assert.match(html, />Newest first</i);
  assert.equal((html.match(/src="\/filter-circle\.svg"/g) ?? []).length, 1);
  assert.match(html, /aria-label="Posts invitation"/i);
  assert.match(html, /Read my[\s\S]*Thoughts/i);
  assert.match(html, /placeholder="Enter email"/i);
  assert.match(html, />Subscribe<\/button>/i);
  assert.match(html, /Opt in to receive updates\. Unsubscribe anytime\./i);
  assert.ok(
    html.indexOf('aria-label="Posts profile"') <
      html.indexOf('aria-label="Thoughts in chronological order"'),
    "the Posts profile should appear before the thought cards",
  );
  assert.ok(
    html.indexOf('aria-label="Thoughts in chronological order"') <
      html.indexOf('aria-label="Posts invitation"'),
    "the Posts invitation should appear after the thought cards",
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
  assert.match(html, /These are people whose work, choices, and ways of thinking/i);
  assert.doesNotMatch(html, /src="\/image-portrait\.svg"/i);
  assert.ok(
    html.indexOf("These are people whose work") <
      html.indexOf('aria-label="People gallery"'),
    "the introduction should appear before the profile cards",
  );
  assert.doesNotMatch(html, /data-influence-line/i);
  assert.doesNotMatch(html, /These are the people who shaped/i);
  assert.doesNotMatch(html, /Add Member|Connecting|@user|23m ago/i);
});
