import { Inter } from "next/font/google";
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
  keywords:
    "smart harvesting, smart agriculture, secure harvesting, IoT farming, Karim Atef",
  openGraph: {
    type: "website",
    url: "https://smart-harvesting-app.vercel.app/",
    title: "Smart & Secure Harvesting",
    description:
      "A smart and secure harvesting system for efficient and safe agricultural practices.",
    images: [
      {
        url: "https://smart-harvesting-aast-bucket-2025.s3.eu-central-1.amazonaws.com/images/og.jpg",
        alt: "Smart & Secure Harvesting app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "Smart & Secure Harvesting",
    description:
      "Smart & Secure Harvesting system built by Karim Atef using modern IoT and web technologies.",
    image:
      "https://smart-harvesting-aast-bucket-2025.s3.eu-central-1.amazonaws.com/images/og.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.className} bg-base-100 text-base-content`}
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
