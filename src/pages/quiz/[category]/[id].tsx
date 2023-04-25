import { useRouter } from "next/router";
import useSWR from "swr";
import Question from "@/components/Question";
export default function SpecificQuestion() {
  const router = useRouter();
  const { id } = router.query;
  // const { data: question, error } = useSWR<Question>(`/question/${id}`);
  return <h1>opa tudo certo</h1>;
}
