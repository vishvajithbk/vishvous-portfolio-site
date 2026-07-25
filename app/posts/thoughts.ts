export type Thought = {
  id: string;
  author: string;
  initials: string;
  content: string;
  postedAt: string;
  postedLabel: string;
};

const originalThoughts: Thought[] = [
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

const temporaryThoughtContents = [
  "Believe you can and you're halfway there.",
  "Every journey begins with a single step.",
  "Dream big, work hard, stay humble.",
  "The best is yet to come.",
  "Success is a journey, not a destination.",
  "Good things take time.",
  "Progress, not perfection.",
  "Everything happens for a reason.",
  "Be the change you wish to see.",
  "What doesn't challenge you doesn't change you.",
  "Stay positive, work hard, make it happen.",
  "The only limit is the one you set yourself.",
  "Small steps every day lead to big results.",
  "Choose happiness.",
  "Trust the process.",
  "Never stop learning.",
  "Make today count.",
  "Difficult roads often lead to beautiful destinations.",
  "Your vibe attracts your tribe.",
  "Collect moments, not things.",
  "If you can dream it, you can do it.",
  "Great things never come from comfort zones.",
  "Fall seven times, stand up eight.",
  "Do more of what makes you happy.",
  "Life is short. Make it sweet.",
  "Keep going. You're closer than you think.",
  "Stars can't shine without darkness.",
] as const;

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const temporaryThoughts: Thought[] = temporaryThoughtContents.map(
  (content, index) => {
    const postedDate = new Date(Date.UTC(2026, 6, 17 - index));

    return {
      id: `temporary-thought-${index + 1}`,
      author: "Vishvajith BK",
      initials: "VB",
      content,
      postedAt: postedDate.toISOString(),
      postedLabel: `${postedDate.getUTCDate()} ${monthLabels[postedDate.getUTCMonth()]} ${postedDate.getUTCFullYear()}`,
    };
  },
);

export const thoughts: Thought[] = [
  ...originalThoughts,
  ...temporaryThoughts,
];
