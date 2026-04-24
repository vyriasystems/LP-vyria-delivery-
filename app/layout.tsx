import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vyria.delivery"),
  title: "Vyria Delivery — Cardápio digital com IA para delivery",
  description:
    "Crie sua loja de delivery com cardápio digital, pedidos em tempo real e IA integrada para vender mais.",
  openGraph: {
    title: "Vyria Delivery — Cardápio digital com IA para delivery",
    description:
      "Crie sua loja de delivery com cardápio digital, pedidos em tempo real e IA integrada para vender mais.",
    images: ["/hero-fixa.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
