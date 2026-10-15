import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "VeloLab · Mauro Training",
  description: "Dashboard locale per analisi FIT e allenamenti Garmin",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <div className="appShell">
          <Sidebar />
          <main className="mainShell">{children}</main>
        </div>
      </body>
    </html>
  );
}
