import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CliqueNaImagem() {

  

  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);

  return (
    <div>
      <h1>Clique na imagem</h1>
    </div>
  );
}

export default CliqueNaImagem;
