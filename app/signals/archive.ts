export type ArchivePlaylist = {
  title: string;
  description: string;
  videoCount: number;
  url: string;
  videos: ArchiveVideo[];
};

export type ArchiveVideo = {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnailUrl: string;
};

export type ArchiveReading = {
  title: string;
  author: string;
  publication: string;
  date: string;
  description: string;
  url: string;
};

export type ArchiveBook = {
  id: string;
  title: string;
  author: string;
  summary: string;
};

export const playlist: ArchivePlaylist = {
  title: "Finance and Modelling",
  description:
    "Eight videos across economics, markets, business, computer science, and AI.",
  videoCount: 8,
  url: "https://www.youtube.com/playlist?list=PLAVWgRxryYXI",
  videos: [
    {
      id: "intotDzjFN4",
      title: "Dr. David Henderson | Free Market Economics",
      channel: "Peterson Academy",
      duration: "47:00",
      thumbnailUrl: "https://i.ytimg.com/vi/intotDzjFN4/hqdefault.jpg",
    },
    {
      id: "1kFV1Td2BQs",
      title:
        "If You Don't Understand the Petrodollar, You Don't Understand Geopolitics",
      channel: "Lock Stock Finance",
      duration: "8:03",
      thumbnailUrl: "https://i.ytimg.com/vi/1kFV1Td2BQs/hqdefault.jpg",
    },
    {
      id: "zxVoCw3P1Gc",
      title: "Once You Learn Economics, You Can't Be Manipulated Anymore",
      channel: "Little Bit Better",
      duration: "19:00",
      thumbnailUrl: "https://i.ytimg.com/vi/zxVoCw3P1Gc/hqdefault.jpg",
    },
    {
      id: "Gvr7jYbqYRg",
      title: "How Private Equity Is Reshaping the Pentagon",
      channel: "Bloomberg Originals",
      duration: "5:17",
      thumbnailUrl: "https://i.ytimg.com/vi/Gvr7jYbqYRg/hqdefault.jpg",
    },
    {
      id: "mRdXyRYX1aM",
      title: "The Art of Boring Startups That Raise Millions",
      channel: "Rho",
      duration: "9:48",
      thumbnailUrl: "https://i.ytimg.com/vi/mRdXyRYX1aM/hqdefault.jpg",
    },
    {
      id: "nOVvEbH2GC0",
      title: "To Scale: TIME",
      channel: "To Scale",
      duration: "10:20",
      thumbnailUrl: "https://i.ytimg.com/vi/nOVvEbH2GC0/hqdefault.jpg",
    },
    {
      id: "Nu8wLR4QqSE",
      title: "Crazy Computer Science Concepts (#1)",
      channel: "Lattice",
      duration: "7:49",
      thumbnailUrl: "https://i.ytimg.com/vi/Nu8wLR4QqSE/hqdefault.jpg",
    },
    {
      id: "n1Qk8xbqF-M",
      title:
        "What an AI Learns to Optimise For as You Train It Harder — Apollo Research",
      channel: "Machine Learning Street Talk",
      duration: "1:19:00",
      thumbnailUrl: "https://i.ytimg.com/vi/n1Qk8xbqF-M/hqdefault.jpg",
    },
  ],
};

export const readings: ArchiveReading[] = [
  {
    title: "The Future Worth Building Is Human",
    author: "Thinking Machines",
    publication: "Thinking Machines Lab",
    date: "10 Jul 2026",
    description:
      "A case for AI that strengthens human knowledge, will, and judgment instead of displacing them.",
    url: "https://thinkingmachines.ai/blog/the-future-worth-building-is-human/",
  },
  {
    title: "Project Think: Building the Next Generation of AI Agents on Cloudflare",
    author: "Sunil Pai & Kate Reznykova",
    publication: "Cloudflare Blog",
    date: "15 Apr 2026",
    description:
      "An introduction to Cloudflare's primitives for durable, long-running AI agents.",
    url: "https://blog.cloudflare.com/project-think/",
  },
  {
    title: "When To Do What You Love",
    author: "Paul Graham",
    publication: "paulgraham.com",
    date: "Sep 2024",
    description:
      "A careful answer to when following your interests is practical—and when it becomes necessary for great work.",
    url: "https://www.paulgraham.com/when.html",
  },
  {
    title: "Machines of Loving Grace",
    author: "Dario Amodei",
    publication: "darioamodei.com",
    date: "Oct 2024",
    description:
      "How powerful AI could transform biology, mental health, economic development, peace, and meaning.",
    url: "https://darioamodei.com/essay/machines-of-loving-grace",
  },
  {
    title: "How to Fix Your Entire Life in 1 Day",
    author: "Dan Koe",
    publication: "X",
    date: "12 Jan 2026",
    description:
      "A framework for lasting personal change built around identity, vision, and internal goals.",
    url: "https://x.com/thedankoe/status/2010751592346030461",
  },
];

export const books: ArchiveBook[] = [
  {
    id: "almanack-of-naval-ravikant",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    summary:
      "Placeholder summary: this note will capture the ideas about wealth, judgment, happiness, and long-term thinking that I want to revisit from the book.",
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    summary:
      "Placeholder summary: this space will hold my reflections on how behavior, patience, incentives, and personal history shape financial decisions.",
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    summary:
      "Placeholder summary: I will use this note to revisit the book's broad account of human history, shared stories, institutions, and social coordination.",
  },
  {
    id: "thinking-in-systems",
    title: "Thinking in Systems",
    author: "Donella H. Meadows",
    summary:
      "Placeholder summary: this note will collect the systems concepts, feedback loops, leverage points, and practical lessons I found most useful.",
  },
  {
    id: "fooled-by-randomness",
    title: "Fooled by Randomness",
    author: "Nassim Nicholas Taleb",
    summary:
      "Placeholder summary: this space will contain my takeaways on luck, uncertainty, survivorship bias, and the stories we invent after outcomes occur.",
  },
  {
    id: "rational-optimist",
    title: "The Rational Optimist",
    author: "Matt Ridley",
    summary:
      "Placeholder summary: this note will hold my reflections on exchange, specialization, innovation, and the case for long-term optimism about human progress.",
  },
  {
    id: "fabric-of-reality",
    title: "The Fabric of Reality",
    author: "David Deutsch",
    summary:
      "Placeholder summary: I will use this space to revisit the book's connections between knowledge, computation, quantum theory, and explanations of reality.",
  },
  {
    id: "homo-deus",
    title: "Homo Deus",
    author: "Yuval Noah Harari",
    summary:
      "Placeholder summary: this note will collect my thoughts on the possible futures of humanity, technology, intelligence, and the stories that organize society.",
  },
  {
    id: "poor-charlies-almanack",
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    summary:
      "Placeholder summary: this space will capture the mental models, multidisciplinary thinking, judgment, and practical wisdom I want to carry forward.",
  },
  {
    id: "selfish-gene",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    summary:
      "Placeholder summary: I will return here to the book's gene-centered view of evolution and its ideas about cooperation, selection, and cultural transmission.",
  },
];
