import "@/styles/globals.css";
import { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/home.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mango app",
  description: "This is a nextjs template without nextjs boilerplate for mango technical test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  );
}
