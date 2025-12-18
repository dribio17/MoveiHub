import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import MoveiBot from "@/components/MoveiBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DRIBIO - Stream Your Favorite Movies & TV Shows",
  description: "Discover and stream the latest movies and TV shows. Watch trailers, read reviews, and find your next favorite entertainment on dribio.",
  keywords: "movies, tv shows, streaming, entertainment, trailers, reviews",
  authors: [{ name: "dribio" }],
  openGraph: {
    title: "DRIBIO - Stream Your Favorite Movies & TV Shows",
    description: "Discover and stream the latest movies and TV shows on dribio.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white min-h-screen`}
      >
        <Navbar />
        <main className="pt-16">
          {children}
          {/* root per i modali / player */}
        <div id="modal-root" />
        </main>
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),
                  s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/64b30db0cc26a871b028a303/default';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
