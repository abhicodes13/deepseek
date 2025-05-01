import { Inter } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deepseek - Search Engine",
  description: "FullStack Web App using Next.js and Deepseek API",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={`${inter.variable} ${inter.variable} antialiased`}>
            <Toaster
              toastOptions={{
                success: {
                  style: {
                    backgroundColor: "black",
                    color: "white",
                  },
                },
                error: {
                  style: {
                    backgroundColor: "black",
                    color: "white",
                  },
                },
              }}
            />
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
