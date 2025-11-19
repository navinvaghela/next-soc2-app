
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers/Providers"; // <- only this
import "./globals.css";

export const metadata: Metadata = {
  title: "SOC2 Dashboard App",
  description: "To Manage SOC2",
};

export default function RootLayout({ children }: {children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
