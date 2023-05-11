import Navbar from "@/components/Navbar";
import ProtectRouteUser from "@/components/ProtectRouteUser";
import { AuthProvider } from "@/context/authContext";
import { SWRConfig } from "swr/_internal";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import api from "@/api/api";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{ fetcher: (url: string) => api(url).then((res) => res.data) }}
    >
      <ProtectRouteUser>
        <AuthProvider>
          <Navbar />

          <Component {...pageProps} className="" />
        </AuthProvider>
      </ProtectRouteUser>
    </SWRConfig>
  );
}
