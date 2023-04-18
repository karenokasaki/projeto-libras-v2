import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function EscolhaAFrase() {
  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);
  return (
    <div>
      <h1>Escolha a Frase</h1>
    </div>
  );
}

export default EscolhaAFrase;
