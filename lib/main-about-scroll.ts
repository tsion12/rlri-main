/** Smooth-scroll to an About Us in-page section (`#who-we-are`, etc.). */
export function scrollToAboutAnchor(anchorId: string): void {
  const id = anchorId.replace(/^#/, "");
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToCurrentAboutHash(): void {
  if (typeof window === "undefined") return;
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;
  // Wait for About Us sections to paint after client navigation.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToAboutAnchor(id));
  });
}
