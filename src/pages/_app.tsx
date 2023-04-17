import Navbar from "@/components/Navbar";
import ProtectRouteUser from "@/components/ProtectRouteUser";
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import api from "@/api/api";
import { SWRConfig } from "swr/_internal";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => api(url).then((res) => res.data) }}
    >
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  );
}
