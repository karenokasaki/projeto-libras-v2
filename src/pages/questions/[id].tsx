import { useRouter } from "next/router";
import useSWR from "swr";
import Question from "@/components/Question";
import { useState } from "react";
export default function SpecificQuestion() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const { id } = router.query;
  const { data: question, error } = useSWR<Question>(`/question/${id}`);
  return question ? (
    <Question question={question} index={index} setIndex={setIndex} />
  ) : (
    <h1>loading...</h1>
  );
}
