// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiracleFooter from "../components/MiracleFooter";
import { ErrorBoundary } from "../components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Miracle Health Providers App",
  description: "Find the right health care advocate for your needs",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-800 antialiased">
        <ErrorBoundary>
          {children}
          <MiracleFooter className="mt-20" />
        </ErrorBoundary>
      </body>
    </html>
  );
}
