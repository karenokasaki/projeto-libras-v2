import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Question from "@/components/Question";
import useSWR from "swr";
import Link from "next/link";
export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data: questions, error } = useSWR<Question[]>(
    `/question/get-by-category/${category}`,
    { suspense: true }
  );

  const [index, setIndex] = useState<number>(0);
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    questions && setQuestion(questions[index]);
  }, [index, questions]);

  return (
    <>
      {!start && question && (
        <div className="flex justify-center items-center flex-col font-poppins h-[100vh] bg-[#44B3E3]">
          <h1>Bem vindo à categoria: {category}</h1>
          <p>Vamos começar?</p>

          <button onClick={() => setStart(true)}>vamos!</button>
        </div>
      )}

      {question ? (
        start &&
        setIndex && <Question question={question} setIndex={setIndex} />
      ) : (
        <div className="pt-58">
          <h1>terminou</h1>
          <Link href="/quiz">Voltar para as perguntas</Link>
        </div>
      )}
    </>
  );
}
