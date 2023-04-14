import Navbar from "@/components/Navbar";
import ProtectRouteUser from "@/components/ProtectRouteUser";
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectRouteUser>
        <Navbar />
        <Component {...pageProps} />
      </ProtectRouteUser>
    </AuthProvider>
  );
}
