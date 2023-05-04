import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import LoadingQuestion from "@/components/loading/loadingQuestion";
import Question from "@/components/Question";
import useSWR from "swr";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data: questions, error } = useSWR<Question[]>(
    `/question/get-by-category/${category}`
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
        <div className="flex justify-center items-center flex-col">
          <h1>Bem vindo à categoria: {category}</h1>
          <p>Vamos começar?</p>

          <button onClick={() => setStart(true)}>vamos!</button>
        </div>
      )}

      {question ? (
        start &&
        setIndex && <Question question={question} setIndex={setIndex} />
      ) : (
        <h1>terminou</h1>
      )}
    </>
  );
}
