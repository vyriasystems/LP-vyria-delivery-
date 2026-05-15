/**
 * Kwai Ads — pixel ID e eventos de conversão.
 *
 * KWAI_PIXEL_ID:
 * - Defina NEXT_PUBLIC_KWAI_PIXEL_ID no .env / Vercel, ou
 * - Altere o fallback abaixo com o ID do painel Kwai Ads.
 *
 * Eventos de conversão (onde disparar na LP):
 * - PageView: automático no mount global (KwaiPixel → kwaiq.page).
 * - ViewContent: seções de planos, demo, vídeo — use trackKwaiViewContent().
 * - Lead: envio bem-sucedido do formulário de contato — use trackKwaiLead().
 * - CompleteRegistration: cadastro/onboarding concluído — use trackKwaiCompleteRegistration().
 */

/** ID do pixel Kwai (Kwai Ads → Pixel / SDK). */
export const KWAI_PIXEL_ID =
  process.env.NEXT_PUBLIC_KWAI_PIXEL_ID ?? "310765761660307";

export const KWAI_CONVERSION_EVENTS = {
  PageView: "PageView",
  ViewContent: "ViewContent",
  Lead: "Lead",
  CompleteRegistration: "CompleteRegistration"
} as const;

export type KwaiConversionEvent =
  (typeof KWAI_CONVERSION_EVENTS)[keyof typeof KWAI_CONVERSION_EVENTS];

export type KwaiEventParams = Record<
  string,
  string | number | boolean | undefined
>;

export type Kwaiq = {
  (...args: unknown[]): void;
  push: (item: unknown[]) => void;
  load: (pixelId: string, options?: Record<string, unknown>) => void;
  page: (...args: unknown[]) => void;
  track: (event: string, params?: KwaiEventParams) => void;
  methods: string[];
};

declare global {
  interface Window {
    kwaiq?: Kwaiq;
    /** Evita kwaiq.load/page duplicados entre navegações/hidratação. */
    __kwaiPixelInitialized?: boolean;
  }
}

function getKwaiq(): Kwaiq | undefined {
  if (typeof window === "undefined") return undefined;
  return window.kwaiq;
}

/** Script de init injetado pelo KwaiPixel (ordem: SDK → init). */
export function buildKwaiInitScript(pixelId: string = KWAI_PIXEL_ID): string {
  const safeId = pixelId.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  return `
(function () {
  if (window.__kwaiPixelInitialized) return;
  if (typeof kwaiq === "undefined") return;
  window.__kwaiPixelInitialized = true;
  kwaiq.load("${safeId}");
  kwaiq.page();
})();
`.trim();
}

export function isKwaiReady(): boolean {
  return typeof window !== "undefined" && Boolean(window.kwaiq);
}

/**
 * Dispara evento Kwai. PageView usa kwaiq.page(); demais usam kwaiq.track().
 * Seguro no cliente (no-op no SSR).
 */
export function trackKwaiEvent(
  event: KwaiConversionEvent,
  params?: KwaiEventParams
): void {
  const kwaiq = getKwaiq();
  if (!kwaiq) return;

  if (event === KWAI_CONVERSION_EVENTS.PageView) {
    kwaiq.page();
    return;
  }

  kwaiq.track(event, params);
}

export function trackKwaiPageView(): void {
  trackKwaiEvent(KWAI_CONVERSION_EVENTS.PageView);
}

/** Ex.: usuário abriu seção de planos ou assistiu demo. */
export function trackKwaiViewContent(params?: KwaiEventParams): void {
  trackKwaiEvent(KWAI_CONVERSION_EVENTS.ViewContent, params);
}

/** Ex.: após POST /api/contact com sucesso (formulário da LP). */
export function trackKwaiLead(params?: KwaiEventParams): void {
  trackKwaiEvent(KWAI_CONVERSION_EVENTS.Lead, params);
}

/** Ex.: cadastro finalizado no produto Vyria. */
export function trackKwaiCompleteRegistration(params?: KwaiEventParams): void {
  trackKwaiEvent(KWAI_CONVERSION_EVENTS.CompleteRegistration, params);
}
