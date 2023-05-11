import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Question from "@/components/Question";
import useSWR, { preload } from "swr";
import Link from "next/link";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data: questions, error } = useSWR<Question[]>(
    `/question/get-by-category/${category}`
  );
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState<number>(0);
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    questions && setQuestion(questions[index]);
    setLoading(false);
  }, [index, questions]);

  return (
    !loading && (
      <div className="flex bg-[#E4CFB4] justify-center items-center flex-col font-poppins h-[100vh] ">
        {!start && question && (
          <div className="flex flex-col items-center bg-[#81B2D9] rounded-2xl shadow-md text-xl text-center  text-slate-200 p-4 lg:p-20 lg:text-3xl">
            <h1>Bem vindo à categoria: {category}</h1>
            <p>Vamos começar?</p>

            <button
              onClick={() => setStart(true)}
              className="mt-10 bg-[#4c96d3] hover:text-white shadow-md transition-all  rounded-xl p-6"
            >
              VAMOS!
            </button>
          </div>
        )}

        {question ? (
          start &&
          setIndex && <Question question={question} setIndex={setIndex} />
        ) : (
          <div className="">
            <h1>terminou</h1>
            <Link href="/quiz">Voltar para as perguntas</Link>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    )
  );
}
