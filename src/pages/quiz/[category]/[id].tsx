import { useRouter } from "next/router";

import { useState } from "react";
export default function SpecificQuestion() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const { id } = router.query;
  // const { data: question, error } = useSWR<Question>(`/question/${id}`);
  return <h1>opa tudo certo</h1>;
}
