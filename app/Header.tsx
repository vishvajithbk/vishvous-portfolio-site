"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  appearanceOptions,
  getAppearanceSnapshot,
  getServerAppearanceSnapshot,
  setAppearancePreference,
  siteConfig,
  subscribeToAppearance,
  type Appearance,
} from "./site-config";

export function Header() {
  const appearance = useSyncExternalStore(
    subscribeToAppearance,
    getAppearanceSnapshot,
    getServerAppearanceSnapshot,
  );

  function selectAppearance(nextAppearance: Appearance) {
    setAppearancePreference(nextAppearance);
  }

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link
          className="wordmark"
          href="/"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.wordmark}
        </Link>

        <div className="site-header__center">
          <nav aria-label="Primary navigation">
            <ul className="navigation">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <span className="appearance-separator" aria-hidden="true" />

          <div className="appearance-selector" aria-label="Appearance">
            {appearanceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className="appearance-dot"
                data-appearance-option={option.value}
                aria-label={option.label}
                aria-pressed={appearance === option.value}
                title={option.label}
                onClick={() => selectAppearance(option.value)}
              >
                <span aria-hidden="true">•</span>
              </button>
            ))}
          </div>
        </div>

        <div className="site-header__empty" aria-hidden="true" />
      </div>

      <div className="header-rule" aria-hidden="true" />
    </header>
  );
}
