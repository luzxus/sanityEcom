import { Footer, Navbar } from "@/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
/* className={inter.className} */
export const metadata: Metadata = {
  title: "Pokemon Store",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <header>
            <Navbar />
          </header>
          <main className="main-container">{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}
