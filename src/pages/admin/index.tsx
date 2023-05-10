import api from "@/api/api";
import QuestionList from "@/components/admin/QuestionsList";
import { isAdmin } from "@/utils/isAdmin";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";

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
    <div className="flex flex-col pt-40 p-4 gap-4 align-middle items-center">
      <p className="text-3xl font-bold">Criar pergunta</p>
      <div className="flex flex-wrap gap-4 justify-around">
        {paths.map((path) => {
          let newName = path
            .replace(/(^|\s)[a-z]/g, (letra) => {
              return letra.toUpperCase();
            })
            .replace(/-/g, " ");
          return (
            <div key={path} className="text-xl border rounded-md p-4">
              <Link href={`/admin/${path}`}>
                <p>{newName}</p>
              </Link>
            </div>
          );
        })}
      </div>

      <QuestionList />
    </div>
  );
}

export default AdminPage;
