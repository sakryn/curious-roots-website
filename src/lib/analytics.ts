/**
 * Analytics hook point. Every <Action> calls track() with its event name.
 * Wire this to Vercel Analytics, Plausible, GA4, etc. when ready.
 * Never send form contents or anything health-related here.
 */
export function track(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  // Example later: window.plausible?.(event, { props });
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[track]", event, props ?? "");
  }
}
