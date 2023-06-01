import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Human After All",
  description: "The Surreal Matrix of AI, Art, and the Motion Picture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
