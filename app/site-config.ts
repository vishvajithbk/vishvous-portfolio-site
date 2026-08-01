export const siteConfig = {
  name: "Vishvous",
  wordmark: "vishvous",
  description:
    "A living index of what Vishvajith is building, writing, thinking about, discovering, and learning from.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Posts", href: "/posts" },
    { label: "Gallery", href: "/gallery" },
    { label: "People", href: "/people" },
    { label: "Archive", href: "/signals" },
  ],
} as const;

export const appearanceStorageKey = "vishvous-appearance";
const appearanceChangeEvent = "vishvous:appearance-change";

export const appearanceOptions = [
  { value: "light", label: "Light appearance" },
  { value: "dark", label: "Dark appearance" },
] as const;

export type Appearance = (typeof appearanceOptions)[number]["value"];

export function isAppearance(value: string | undefined): value is Appearance {
  return appearanceOptions.some((option) => option.value === value);
}

export function getAppearanceSnapshot(): Appearance {
  const appearance = document.documentElement.dataset.appearance;
  return isAppearance(appearance) ? appearance : "light";
}

export function getServerAppearanceSnapshot(): Appearance {
  return "light";
}

export function subscribeToAppearance(onChange: () => void): () => void {
  function handleStorage(event: StorageEvent) {
    if (event.key === appearanceStorageKey) onChange();
  }

  window.addEventListener(appearanceChangeEvent, onChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(appearanceChangeEvent, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setAppearancePreference(appearance: Appearance) {
  document.documentElement.dataset.appearance = appearance;
  window.localStorage.setItem(appearanceStorageKey, appearance);
  window.dispatchEvent(new Event(appearanceChangeEvent));
}
