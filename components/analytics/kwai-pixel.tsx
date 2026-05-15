import Script from "next/script";
import { buildKwaiInitScript, KWAI_PIXEL_ID } from "@/lib/kwai";
import { KWAI_SDK_INSTALL_SCRIPT } from "@/lib/kwai-sdk-install";

type KwaiPixelProps = {
  /** Sobrescreve KWAI_PIXEL_ID / NEXT_PUBLIC_KWAI_PIXEL_ID (opcional). */
  pixelId?: string;
};

/**
 * Kwai Ads Pixel — carregado uma vez no layout raiz.
 * Usa next/script (afterInteractive) para compatibilidade com App Router e SSR.
 */
export function KwaiPixel({ pixelId = KWAI_PIXEL_ID }: KwaiPixelProps) {
  if (!pixelId) return null;

  return (
    <>
      <Script id="kwai-pixel-sdk" strategy="afterInteractive">
        {KWAI_SDK_INSTALL_SCRIPT}
      </Script>
      <Script id="kwai-pixel-init" strategy="afterInteractive">
        {buildKwaiInitScript(pixelId)}
      </Script>
    </>
  );
}
