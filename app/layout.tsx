import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingYouTubeWidget from "@/components/FloatingYouTubeWidget";

export const metadata: Metadata = {
  title: "Learn Javascript in Tamil | Practical Tutorials",
  description:
    "A comprehensive resource to learn JavaScript in Tamil with practical tutorials and examples.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-slate-900 text-slate-100 min-h-screen`}>
        <Navbar />
        <FloatingYouTubeWidget />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
