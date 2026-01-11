import type { Metadata } from "next";
import "./globals.css";

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
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
