import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <main className="">
      <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>Home</h2>
    </main>
  );
}
