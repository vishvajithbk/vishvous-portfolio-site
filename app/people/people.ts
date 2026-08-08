export type Person = {
  id: string;
  name: string;
  image: {
    src: string;
    alt: string;
    position: string;
    scale?: number;
    offsetX?: number;
  };
};

export const people: Person[] = [
  {
    id: "sam-altman",
    name: "Sam Altman",
    image: {
      src: "/people/sam-altman.jpg",
      alt: "Portrait of Sam Altman",
      position: "22% 50%",
    },
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    image: {
      src: "/people/elon-musk.jpg",
      alt: "Portrait of Elon Musk",
      position: "50% 20%",
    },
  },
  {
    id: "ilya-sutskever",
    name: "Ilya Sutskever",
    image: {
      src: "/people/ilya-sutskever.avif",
      alt: "Portrait of Ilya Sutskever",
      position: "50% 28%",
    },
  },
  {
    id: "apj-abdul-kalam",
    name: "A. P. J. Abdul Kalam",
    image: {
      src: "/people/apj-abdul-kalam.jpg",
      alt: "Portrait of A. P. J. Abdul Kalam",
      position: "50% 34%",
    },
  },
  {
    id: "richard-feynman",
    name: "Richard Feynman",
    image: {
      src: "/people/richard-feynman.webp",
      alt: "Portrait of Richard Feynman",
      position: "80% 44%",
    },
  },
  {
    id: "fei-fei-li",
    name: "Fei-Fei Li",
    image: {
      src: "/people/fei-fei-li.avif",
      alt: "Portrait of Fei-Fei Li",
      position: "50% 28%",
    },
  },
  {
    id: "geoffrey-hinton",
    name: "Geoffrey Hinton",
    image: {
      src: "/people/geoffrey-hinton.jpg",
      alt: "Portrait of Geoffrey Hinton",
      position: "50% 30%",
    },
  },
  {
    id: "j-jayalalithaa",
    name: "J. Jayalalithaa",
    image: {
      src: "/people/j-jayalalithaa.jpg",
      alt: "Portrait of J. Jayalalithaa",
      position: "12% 30%",
    },
  },
  {
    id: "david-deutsch",
    name: "David Deutsch",
    image: {
      src: "/people/david-deutsch.jpg",
      alt: "Portrait of David Deutsch",
      position: "100% 42%",
    },
  },
  {
    id: "satish-dhawan",
    name: "Satish Dhawan",
    image: {
      src: "/people/satish-dhawan.jpg",
      alt: "Portrait of Satish Dhawan",
      position: "50% 28%",
    },
  },
  {
    id: "s-jaishankar",
    name: "S. Jaishankar",
    image: {
      src: "/people/s-jaishankar.jpg",
      alt: "Portrait of S. Jaishankar",
      position: "50% 26%",
    },
  },
  {
    id: "vandana-shiva",
    name: "Vandana Shiva",
    image: {
      src: "/people/vandana-shiva.jpg",
      alt: "Portrait of Vandana Shiva",
      position: "50% 28%",
    },
  },
  {
    id: "shamika-ravi",
    name: "Shamika Ravi",
    image: {
      src: "/people/shamika-ravi.jpeg",
      alt: "Portrait of Shamika Ravi",
      position: "50% 10%",
      scale: 1.05,
      offsetX: 2.5,
    },
  },
  {
    id: "k-annamalai",
    name: "K. Annamalai",
    image: {
      src: "/people/k-annamalai.jpg",
      alt: "Portrait of K. Annamalai",
      position: "100% 34%",
      scale: 1.14,
      offsetX: 2,
    },
  },
];
