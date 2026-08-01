"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
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
  const headerRef = useRef<HTMLElement>(null);
  const headerRuleRef = useRef<HTMLDivElement>(null);
  const appearance = useSyncExternalStore(
    subscribeToAppearance,
    getAppearanceSnapshot,
    getServerAppearanceSnapshot,
  );

  function selectAppearance(nextAppearance: Appearance) {
    setAppearancePreference(nextAppearance);
  }

  useEffect(() => {
    const header = headerRef.current;
    const headerRule = headerRuleRef.current;

    if (!header || !headerRule) {
      return;
    }

    let frameId = 0;
    const observedLayoutRoots = new Set<Element>();
    const resizeObserver = new ResizeObserver(scheduleUpdate);

    function isTransparent(color: string) {
      return (
        color === "transparent" ||
        color === "rgba(0, 0, 0, 0)" ||
        /rgba\([^)]*,\s*0(?:\.0+)?\)$/.test(color)
      );
    }

    function hasVisibleBorder(style: CSSStyleDeclaration) {
      return (["Top", "Right", "Bottom", "Left"] as const).some((side) => {
        const width = Number.parseFloat(style[`border${side}Width`]);
        const borderStyle = style[`border${side}Style`];
        const color = style[`border${side}Color`];

        return width > 0 && borderStyle !== "none" && !isTransparent(color);
      });
    }

    function isEffectivelyVisible(element: Element) {
      let current: Element | null = element;

      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);

        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number.parseFloat(style.opacity) === 0
        ) {
          return false;
        }

        current = current.parentElement;
      }

      return true;
    }

    function isVisibleContent(element: Element) {
      if (
        element === document.body ||
        element === document.documentElement ||
        !isEffectivelyVisible(element)
      ) {
        return false;
      }

      const style = window.getComputedStyle(element);

      if (
        element.matches(
          "a, img, picture, video, canvas, svg, iframe, button, input, textarea, select, hr, dialog, [role='separator']",
        )
      ) {
        return true;
      }

      const hasDirectText = Array.from(element.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );

      if (hasDirectText) {
        return true;
      }

      if (style.backgroundImage !== "none" || style.boxShadow !== "none") {
        return true;
      }

      if (hasVisibleBorder(style)) {
        return true;
      }

      const backgroundColor = style.backgroundColor;
      const canvasColor = window.getComputedStyle(document.documentElement).backgroundColor;
      const bodyColor = window.getComputedStyle(document.body).backgroundColor;

      return (
        !isTransparent(backgroundColor) &&
        backgroundColor !== canvasColor &&
        backgroundColor !== bodyColor
      );
    }

    function lineOverlapsContent() {
      const lineRect = headerRule.getBoundingClientRect();

      if (
        lineRect.width <= 0 ||
        lineRect.bottom < 0 ||
        lineRect.top > window.innerHeight
      ) {
        return false;
      }

      const y = Math.min(
        window.innerHeight - 1,
        Math.max(0, lineRect.top + lineRect.height / 2),
      );
      const startX = Math.max(0, Math.floor(lineRect.left));
      const endX = Math.min(window.innerWidth - 1, Math.ceil(lineRect.right));
      const samplePoints = new Set<number>([startX, endX]);

      for (let x = startX; x <= endX; x += 8) {
        samplePoints.add(x);
      }

      for (const x of samplePoints) {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
          if (element === headerRule || header.contains(element)) {
            continue;
          }

          if (isVisibleContent(element)) {
            return true;
          }
        }
      }

      return false;
    }

    function updateHeaderRule() {
      const nextValue = lineOverlapsContent() ? "true" : "false";

      if (headerRule.dataset.overContent !== nextValue) {
        headerRule.dataset.overContent = nextValue;
      }

      frameId = 0;
    }

    function scheduleUpdate() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateHeaderRule);
      }
    }

    function observeLayoutRoots() {
      for (const child of document.body.children) {
        if (child !== header && !observedLayoutRoots.has(child)) {
          observedLayoutRoots.add(child);
          resizeObserver.observe(child);
        }
      }
    }

    const mutationObserver = new MutationObserver(() => {
      observeLayoutRoots();
      scheduleUpdate();
    });

    observeLayoutRoots();
    mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-expanded", "class", "hidden", "open", "style"],
      childList: true,
      subtree: true,
    });

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);
    document.fonts?.ready.then(scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      mutationObserver.disconnect();
      resizeObserver.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
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

      <div className="header-rule" aria-hidden="true" ref={headerRuleRef} />
    </header>
  );
}
