import posthog from 'posthog-js';

/**
 * PostHog Cloud integration for StackDesk.
 *
 * Reads config from PUBLIC_POSTHOG_KEY / PUBLIC_POSTHOG_HOST (see .env.example).
 * When the key is missing (local dev without a PostHog project, or CI), everything
 * here is a silent no-op so the rest of the app never needs to check "is analytics on?".
 *
 * Usage from a React island (Compare/Finder/AI Advisor) later:
 *   import { trackEvent } from '~/utils/analytics';
 *   trackEvent('compare_product_added', { productId, category });
 */

const POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let initialized = false;

export function initAnalytics(): void {
  if (initialized || !POSTHOG_KEY || typeof window === 'undefined') return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  });

  initialized = true;
}

/**
 * Fire a custom event. Naming convention (snake_case, object_verb): e.g.
 * compare_product_added, finder_filter_applied, advisor_prompt_submitted,
 * outbound_link_clicked (for /go/... redirects).
 */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(name, properties);
}
