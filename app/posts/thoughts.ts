export type Thought = {
  id: string;
  author: string;
  initials: string;
  content: string;
  postedAt: string;
  postedLabel: string;
};

export const thoughts: Thought[] = [
  {
    id: "answers-and-questions",
    author: "Vishvajith BK",
    initials: "VB",
    content:
      "Increasingly becoming true that the answers are not for the questions people ask, its for the people who asked.",
    postedAt: "2026-07-20T08:00:00+05:30",
    postedLabel: "20 Jul 2026",
  },
  {
    id: "good-missions",
    author: "Vishvajith BK",
    initials: "VB",
    content:
      "Good missions, generally fit in a sentence and are easy to understand.",
    postedAt: "2026-07-19T08:00:00+05:30",
    postedLabel: "19 Jul 2026",
  },
  {
    id: "cautious-optimism",
    author: "Vishvajith BK",
    initials: "VB",
    content:
      "When there is a large degree of uncertainty and the stakes are this high, proceeding with cautious optimism is the sensible and correct strategy.",
    postedAt: "2026-07-18T08:00:00+05:30",
    postedLabel: "18 Jul 2026",
  },
];
