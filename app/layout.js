import {
  Inter,
} from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { UserProvider } from "./_contexts/userContext";
// Define all the fonts
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Smart & Secure Harvesting",
  description: "Smart & Secure Harvesting webapp created by Karim Atef",
  author: "Karim Atef",
  charset: "UTF-8",
  keywords: "smart harvesting, smart agriculture, secure harvesting, IoT farming, Karim Atef",
  openGraph: {
    type: "website",
    url: "https://your-website-url.com",
    title: "Smart & Secure Harvesting",
    description: "A smart and secure harvesting system for efficient and safe agricultural practices.",
    images: [
      {
        url: "https://your-website-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart & Secure Harvesting webapp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "Smart & Secure Harvesting",
    description: "Smart & Secure Harvesting system built by Karim Atef using modern IoT and web technologies.",
    image: "https://your-website-url.com/twitter-image.jpg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.className}  grid grid-rows-[auto,1fr,auto] min-h-screen overflow-x-hidden bg-base-100 text-base-content`}
      >
        <Toaster richColors />
        <UserProvider>
          <Navbar />
          <main>{children}</main>
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
