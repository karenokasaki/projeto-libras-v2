import Footer from "@/components/Footer";
import { Html, Head, Main, NextScript } from "next/document";
import { Inter } from "next/font/google";

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-gray-50">
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
