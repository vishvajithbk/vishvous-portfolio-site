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
