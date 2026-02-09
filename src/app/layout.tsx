import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prefactor",
  description: "Production Scheduling Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
