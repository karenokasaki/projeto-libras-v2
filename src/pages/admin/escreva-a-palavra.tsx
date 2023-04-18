import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function EscrevaAPalavra() {
  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);
  return (
    <div>
      <h1>Escreva a Palavra</h1>
    </div>
  );
}

export default EscrevaAPalavra;
