export type Thought = {
  id: string;
  author: string;
  initials: string;
  content: string;
  postedAt: string;
  postedLabel: string;
};

const thoughtEntries = [
  {
    id: "ten-year-compounding",
    content:
      "Most people underestimate what ten years of working on the same important problem can do. Consistency looks unimpressive in the short run because compounding is mostly invisible until it isn’t.",
  },
  {
    id: "focus-leaves-good-ideas-untouched",
    content:
      "Focus isn’t deciding what to work on. It’s deciding what you’re willing to leave untouched — including good ideas. A life with ten priorities probably has none.",
  },
  {
    id: "work-that-keeps-working",
    content:
      "The best kind of work keeps working after you stop. Code runs, media spreads, knowledge compounds, capital earns. Build things whose output isn’t permanently tied to your hours.",
  },
  {
    id: "physics-versus-convention",
    content:
      "When everyone says something is impossible, separate physics from convention. Some constraints are laws of nature. A surprising number are just things people stopped questioning.",
  },
  {
    id: "borrowed-understanding",
    content:
      "A dangerous form of ignorance is being able to repeat an explanation you don’t actually understand. If you can’t rebuild the idea from simpler pieces, you probably borrowed the understanding.",
  },
  {
    id: "upgrade-thinking-machinery",
    content:
      "Reality is under no obligation to be intuitive. Sometimes the right response to confusion isn’t simplifying the universe — it’s upgrading the machinery you use to think about it.",
  },
  {
    id: "inspect-incentive-structures",
    content:
      "Before judging someone’s behaviour, inspect the incentive structure around them. What looks irrational at the individual level can become perfectly rational once you understand what the system rewards.",
  },
  {
    id: "distant-payoffs",
    content:
      "A strange advantage appears when you’re willing to work on things whose payoff is years away. The further the reward is in the future, the fewer people you’re competing against.",
  },
  {
    id: "interesting-people-look-irrational",
    content:
      "Interesting people often look slightly irrational from the outside. If every decision you make is easily understood and approved by everyone around you, you may just be following a very well-travelled path.",
  },
  {
    id: "confidence-is-not-correctness",
    content:
      "Confidence is a feeling produced by your brain, not a certificate of correctness. A coherent story can feel true long before reality has agreed with it.",
  },
  {
    id: "survive-being-wrong",
    content:
      "Don’t build a life that requires your predictions to be correct. Build one that survives being wrong — and, ideally, occasionally benefits from it.",
  },
  {
    id: "curiosity-and-matter",
    content:
      "You are a temporary arrangement of matter that somehow became capable of wondering where matter came from. It’s difficult to think about that seriously and still believe curiosity is a waste of time.",
  },
  {
    id: "protect-reputation-and-trust",
    content:
      "Some things compound slowly and disappear instantly. Reputation is one of them. So is trust. Their asymmetry is probably a good reason to protect them irrationally well.",
  },
  {
    id: "systems-producing-problems",
    content:
      "When a problem keeps returning after every fix, stop asking how to solve the event. Ask what system keeps producing it. Repeated problems are often the visible output of invisible structure.",
  },
  {
    id: "adaptability-and-survival",
    content:
      "Survival doesn’t necessarily reward the strongest or the smartest. It rewards whatever can keep updating itself as the environment changes. Intelligence without adaptability can become another form of rigidity.",
  },
  {
    id: "constructed-reality",
    content:
      "You don't have direct access to reality, no one does - your brain constructs reality from bits of incoming information. What you perceive is a simulation crafted by your mind.",
  },
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

export const thoughts: Thought[] = thoughtEntries.map((thought, index) => {
  const postedDate = new Date(Date.UTC(2026, 6, 20 - index));
  const date = postedDate.toISOString().slice(0, 10);

  return {
    ...thought,
    author: "Vishvajith BK",
    initials: "VB",
    postedAt: `${date}T08:00:00+05:30`,
    postedLabel: `${postedDate.getUTCDate()} ${monthLabels[postedDate.getUTCMonth()]} ${postedDate.getUTCFullYear()}`,
  };
});
