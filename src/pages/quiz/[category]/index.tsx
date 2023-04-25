import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Question from "@/components/Question";
import useSWR from "swr";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { data: questions, error } = useSWR<Question[]>(
    `/question/get-by-category/${category}`
  );
  console.log(questions);
  const [index, setIndex] = useState<number>(0);
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState<Question>();
  useEffect(() => {
    questions && setQuestion(questions[index]);
  }, [index]);

  return (
    <>
      {!start && (
        <div>
          <h1>Bem vindo à categoria: {category}</h1>
          <p>Vamos começar?</p>

          <button onClick={() => setStart(true)}>vamos!</button>
        </div>
      )}

      {question ? (
        start &&
        question &&
        setIndex && <Question question={question} setIndex={setIndex} />
      ) : (
        <h1>terminou</h1>
      )}
    </>
  );
}
