import { parse, type HTMLElement } from "node-html-parser";

function normalizeText(s: string): string {
  return s.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

/** Headings used by Elementor / ElementsKit for the reusable “focus” strip. */
function isFocusSectionHeading(t: string): boolean {
  if (t.length > 120) return false;
  const lower = t.toLowerCase();
  if (/^where\s+we\s+focus/.test(lower)) return true;
  if (/^our\s+focus\s+areas?/.test(lower)) return true;
  if (/^focus\s+areas?$/.test(lower)) return true;
  return false;
}

const FOCUS_PHRASE = /where\s+we\s+focus|our\s+focus\s+areas?/i;

/** Prefer removing an Elementor container/section; avoid nuking the whole post. */
function removeElementorFocusBlock(from: HTMLElement): boolean {
  let cur: HTMLElement | null = from;
  const candidates: HTMLElement[] = [];

  for (let depth = 0; depth < 45 && cur; depth++) {
    const cls = cur.getAttribute("class") || "";
    if (cls.includes("elementor-element")) {
      candidates.push(cur);
    }
    cur = cur.parentNode as HTMLElement | null;
  }

  if (candidates.length === 0) {
    return false;
  }

  const outer = candidates[candidates.length - 1];
  const outerLen = (outer.textContent || "").length;
  if (outerLen < 14000) {
    outer.remove();
    return true;
  }

  for (const el of candidates) {
    const cls = el.getAttribute("class") || "";
    const elType = el.getAttribute("data-element_type");
    const len = (el.textContent || "").length;
    if (len > 9000) continue;
    if (
      elType === "container" ||
      cls.includes("e-con") ||
      cls.includes("e-flex") ||
      cls.includes("elementor-top-section") ||
      (cls.includes("elementor-section") && cls.includes("elementor-element"))
    ) {
      el.remove();
      return true;
    }
  }

  const inner = candidates[0];
  if ((inner.textContent || "").length < 9000) {
    inner.remove();
    return true;
  }

  return false;
}

/** Strip by heading / widget title nodes (Elementor + ElementsKit class names). */
function stripByHeadingNodes(html: string): string {
  if (!html || !FOCUS_PHRASE.test(html)) return html;

  const root = parse(html);
  const selectors = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    ".elementor-heading-title",
    "[class*='elementskit-section-title']",
    "[class*='ekit-heading--title']",
  ].join(",");

  for (const node of root.querySelectorAll(selectors)) {
    const t = normalizeText(node.textContent || "");
    if (!isFocusSectionHeading(t)) continue;
    if (removeElementorFocusBlock(node as HTMLElement)) continue;
    (node as HTMLElement).remove();
  }

  /* Plain <p> used as a faux heading in some templates */
  for (const p of root.querySelectorAll("p")) {
    const t = normalizeText(p.textContent || "");
    if (t.length > 90) continue;
    if (!isFocusSectionHeading(t)) continue;
    if (removeElementorFocusBlock(p as HTMLElement)) continue;
    (p as HTMLElement).remove();
  }

  return root.toString();
}

/** Strip Elementor heading widgets whose text matches (nested spans). */
function stripWidgetHeadingWidgets(html: string): string {
  if (!html || !FOCUS_PHRASE.test(html)) return html;

  const root = parse(html);
  for (const el of root.querySelectorAll(".elementor-widget-heading")) {
    const t = normalizeText(el.textContent || "");
    if (!isFocusSectionHeading(t)) continue;
    if (removeElementorFocusBlock(el as HTMLElement)) continue;
    (el as HTMLElement).remove();
  }
  return root.toString();
}

/**
 * Last resort: remove the largest elementor subtree that contains the focus phrase but is
 * unlikely to be the full article (phrase early enough, size cap).
 */
function stripLargestElementorBlockWithPhrase(html: string): string {
  if (!html || !FOCUS_PHRASE.test(html)) return html;

  const root = parse(html);
  let best: HTMLElement | null = null;
  let bestLen = 0;

  for (const el of root.querySelectorAll("[class*='elementor-element']")) {
    const text = el.textContent || "";
    if (!FOCUS_PHRASE.test(text)) continue;
    const len = text.length;
    if (len > 16000) continue;
    const idx = text.search(FOCUS_PHRASE);
    if (idx === -1) continue;
    if (len > 8000 && idx > 700) continue;
    if (len <= 8000 && idx > 2500) continue;
    if (len > bestLen) {
      bestLen = len;
      best = el as HTMLElement;
    }
  }

  if (best && bestLen > 150) {
    best.remove();
  }

  return root.toString();
}

/**
 * Removes WordPress/Elementor “Where we focus” (and variants) from `post.content.rendered`.
 * Run server-side before injecting HTML into the article body.
 * If stripping would remove more than 35% of the HTML, returns the original string (the
 * phrase can appear inside the article body, not only in chrome).
 */
const MAX_STRIP_FRACTION = 0.35;

/**
 * Remove executable/non-article tags that should never be rendered inside post body HTML.
 * This keeps React client rendering safe and avoids script-tag runtime warnings.
 */
function stripUnsafeBodyTags(html: string): string {
  if (!html) return html;
  const root = parse(html);
  for (const node of root.querySelectorAll("script, noscript, iframe, object, embed")) {
    (node as HTMLElement).remove();
  }
  return root.toString();
}

export function stripBlogWordPressHtml(html: string): string {
  if (!html) return html;
  const safeInput = stripUnsafeBodyTags(html);
  const inLen = safeInput.length;
  let out = safeInput;
  out = stripByHeadingNodes(out);
  out = stripByHeadingNodes(out);
  out = stripWidgetHeadingWidgets(out);
  out = stripLargestElementorBlockWithPhrase(out);
  out = stripLargestElementorBlockWithPhrase(out);

  const removedFraction = inLen > 0 ? (inLen - out.length) / inLen : 0;
  if (removedFraction > MAX_STRIP_FRACTION) {
    return safeInput;
  }

  return stripUnsafeBodyTags(out);
}

/** @deprecated Use {@link stripBlogWordPressHtml} */
export function stripWhereWeFocusSection(html: string): string {
  return stripBlogWordPressHtml(html);
}
