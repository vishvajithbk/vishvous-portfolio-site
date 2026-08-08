export type LifeMedia = {
  id: string;
  kind: "image" | "video";
  src: string;
  alt: string;
  title: string;
  note: string;
  creator: string;
  sourceName: "Unsplash" | "Mixkit";
  sourceUrl: string;
  date: string;
};

export type LifeMonth = {
  id: string;
  label: string;
  year: string;
  slots: string[];
  items: LifeMedia[];
};

export const lifeMonths: LifeMonth[] = [
  {
    id: "august-2026",
    label: "August",
    year: "2026",
    slots: ["heroLeft", "portraitFloat", "motionTall", "smallTilt", "wideLower"],
    items: [
      {
        id: "california-coast",
        kind: "image",
        src: "/life/california-coast.jpg",
        alt: "A quiet California coastline seen from above",
        title: "Somewhere after the fog",
        note: "A coast that looks like memory before it becomes a place.",
        creator: "Shelby White",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/aerial-photography-of-ocean-during-daytime-C8c1uRQnYUU",
        date: "06 Aug 2026",
      },
      {
        id: "airplane-window",
        kind: "image",
        src: "/life/airplane-window.jpg",
        alt: "Clouds seen through an airplane window",
        title: "Between places",
        note: "The world becomes wonderfully abstract at cruising altitude.",
        creator: "Khanh Do",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/view-of-clouds-from-an-airplane-window-uovcY2G02kU",
        date: "05 Aug 2026",
      },
      {
        id: "hypnotic-gray",
        kind: "video",
        src: "/life/hypnotic-gray.mp4",
        alt: "Monochrome folds of light moving like fabric",
        title: "A soft machine",
        note: "Light behaving like fabric, smoke, and machinery all at once.",
        creator: "Mixkit",
        sourceName: "Mixkit",
        sourceUrl:
          "https://mixkit.co/free-stock-video/hypnotic-atmospheric-background-101022/",
        date: "03 Aug 2026",
      },
      {
        id: "neon-city",
        kind: "image",
        src: "/life/neon-city.jpg",
        alt: "A futuristic city glowing with neon light at night",
        title: "Cities that only exist at night",
        note: "A little too cinematic to be real, which is exactly the point.",
        creator: "Nat",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/a-futuristic-city-at-night-with-neon-lights-dA0-qxdbyyY",
        date: "01 Aug 2026",
      },
      {
        id: "aerial-waves",
        kind: "image",
        src: "/life/aerial-waves.jpg",
        alt: "Ocean waves photographed vertically from the air",
        title: "No edge, only rhythm",
        note: "Water drawing and erasing the same line forever.",
        creator: "Luke Stackpoole",
        sourceName: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/aerial-ocean-waves-NEsS80iDVdw",
        date: "30 Jul 2026",
      },
    ],
  },
  {
    id: "july-2026",
    label: "July",
    year: "2026",
    slots: ["portraitLeft", "wideRight", "smallCenter", "panorama"],
    items: [
      {
        id: "fog-lake",
        kind: "image",
        src: "/life/fog-lake.jpg",
        alt: "A misty mountain reflected in a quiet lake",
        title: "Silence has a shape",
        note: "A landscape reduced to water, stone, and a small amount of light.",
        creator: "Simon Buchou",
        sourceName: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/foggy-mountain-_cxR2y8TsXQ",
        date: "24 Jul 2026",
      },
      {
        id: "city-night",
        kind: "video",
        src: "/life/city-night.mp4",
        alt: "A fast journey through city streets at night",
        title: "Six seconds of elsewhere",
        note: "Traffic, reflections, and the strange optimism of moving through a city late.",
        creator: "Mixkit",
        sourceName: "Mixkit",
        sourceUrl:
          "https://mixkit.co/free-stock-video/touring-a-city-at-night-42031/",
        date: "20 Jul 2026",
      },
      {
        id: "chrome-forms",
        kind: "image",
        src: "/life/chrome-forms.jpg",
        alt: "Abstract chrome shapes catching sharp light and shadow",
        title: "Useful unknown object",
        note: "A machine part from a future that forgot to label anything.",
        creator: "Logan Voss",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/abstract-geometric-shapes-with-shadows-and-light-3yMfKkNUcjU",
        date: "16 Jul 2026",
      },
      {
        id: "deep-water",
        kind: "image",
        src: "/life/deep-water.jpg",
        alt: "Deep blue ocean water photographed from above",
        title: "Blue, without context",
        note: "The scale disappears and the surface turns into a texture.",
        creator: "John Lockwood",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/wavy-ocean-in-aerial-photography-LUiw-54S7Ek",
        date: "09 Jul 2026",
      },
    ],
  },
  {
    id: "june-2026",
    label: "June",
    year: "2026",
    slots: ["wideLeft", "portraitRight", "squareDrift", "closingWide"],
    items: [
      {
        id: "desert-night",
        kind: "image",
        src: "/life/desert-night.jpg",
        alt: "Dark desert dunes under a muted night sky",
        title: "After the heat leaves",
        note: "A horizon with almost nothing to prove.",
        creator: "Garrett Patz",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/desert-during-nighttime-Ilu1Vv6EYds",
        date: "27 Jun 2026",
      },
      {
        id: "northern-lights",
        kind: "video",
        src: "/life/northern-lights.mp4",
        alt: "Blue and green northern lights moving across the night sky",
        title: "The sky misbehaving",
        note: "Seven seconds of colour refusing to stay still.",
        creator: "Mixkit",
        sourceName: "Mixkit",
        sourceUrl:
          "https://mixkit.co/free-stock-video/northern-lights-of-blue-and-green-colors-in-the-night-4038/",
        date: "21 Jun 2026",
      },
      {
        id: "milky-way-desert",
        kind: "image",
        src: "/life/milky-way-desert.jpg",
        alt: "The Milky Way above sculpted desert dunes",
        title: "The long exposure version of time",
        note: "Proof that waiting can reveal more than looking.",
        creator: "Jimmy Larry",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/desert-under-milky-way-7uvixXrQkfw",
        date: "14 Jun 2026",
      },
      {
        id: "alpine-fog",
        kind: "image",
        src: "/life/alpine-fog.jpg",
        alt: "A forested alpine mountain disappearing into fog",
        title: "Not everything needs resolving",
        note: "The mountain is still there; the image is better because we cannot see all of it.",
        creator: "Paul Pastourmatzis",
        sourceName: "Unsplash",
        sourceUrl:
          "https://unsplash.com/photos/fog-over-mountain-0Kwi3hx7YzQ",
        date: "02 Jun 2026",
      },
    ],
  },
];
