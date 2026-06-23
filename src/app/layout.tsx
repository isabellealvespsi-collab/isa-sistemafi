import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prosperidade — Nosso Financeiro",
  description: "Gestão financeira do casal Isa e Fe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full bg-surface text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}
