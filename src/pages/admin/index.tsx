import { isAdmin } from "@/utils/isAdmin";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);

  const paths = [
    "clique-na-imagem",
    "clique-no-video",
    "complete-a-frase",
    "complete-a-palavra",
    "escolha-a-frase",
    "escreva-a-palavra",
    "monte-a-palavra",
  ];

  return (
    <div className="flex flex-col p-4 gap-4 align-middle items-center">
      <p>Criar pergunta</p>
      <div className="flex flex-col gap-5">
        {paths.map((path) => (
          <div key={path}>
            <Link href={`/admin/${path}`}>
              <p>{path}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
