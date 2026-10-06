import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShortDrama Downloader",
  description: "Analyze public short-drama pages and download media when the source explicitly permits it."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="id"><body>{children}</body></html>;
}