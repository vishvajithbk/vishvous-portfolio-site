export type Person = {
  id: string;
  name: string;
  image?: {
    src: string;
    alt: string;
  };
};

const featuredPeople: Person[] = [
  { id: "sam-altman", name: "Sam Altman" },
  { id: "elon-musk", name: "Elon Musk" },
  { id: "ilya-sutskever", name: "Ilya Sutskever" },
  { id: "geoffrey-hinton", name: "Geoffrey Hinton" },
  { id: "apj-abdul-kalam", name: "A. P. J. Abdul Kalam" },
  { id: "satish-dhawan", name: "Satish Dhawan" },
  { id: "jai-shankar", name: "Jai Shankar" },
];

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const temporaryPeople: Person[] = Array.from({ length: 33 }, (_, index) => {
  const name = Array.from(
    { length: 4 },
    (_, letterIndex) => alphabet[(index * 4 + letterIndex) % alphabet.length],
  ).join("");
  const nameCycle = Math.floor(index / 13) + 1;

  return {
    id: `temporary-person-${index + 1}`,
    name: nameCycle === 1 ? name : `${name} ${nameCycle}`,
  };
});

export const people: Person[] = [...featuredPeople, ...temporaryPeople];

export const peopleInfluencePassage =
  "The people gathered here have each shaped a part of the way I see the world. Through their ideas, work, courage, and contradictions, they have challenged my assumptions and expanded my sense of what is possible. I may not agree with every choice they have made, but their influence has stayed with me—quietly informing how I think, what I value, and the person I am still becoming.";
