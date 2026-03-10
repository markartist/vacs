import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VACS",
  description: "Venterra AI Content Suite",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
