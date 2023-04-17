import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Questions() {
  const { data: questions, error } = useSWR<Question[]>("/question/get-all");
  const [easyQuestions, setEasyQuestions] = useState<Question[]>();
  const [mediumQuestions, setMediumQuestions] = useState<Question[]>();
  const [hardQuestions, setHardQuestions] = useState<Question[]>();

  useEffect(() => {
    setEasyQuestions(
      questions?.filter((question: Question) => {
        if ("level" in question && question.level === "fácil") {
          return question;
        }
      })
    );
    setMediumQuestions(
      questions?.filter((question: Question) => {
        if ("level" in question && question.level === "médio") {
          return question;
        }
      })
    );
    setHardQuestions(
      questions?.filter((question: Question) => {
        if ("level" in question && question.level === "difícil") {
          return question;
        }
      })
    );
  }, [questions]);
  if (!questions) {
    return <h1>loading...</h1>;
  }

  const content = (
    <div>
      <Head>
        <title>Suas perguntas! 📖</title>
      </Head>
      <section id="easy-questions" className="grid grid-cols-2 gap-1 mb-12">
        {easyQuestions?.map((question, i) => {
          return (
            <div
              key={i}
              className="border border-cyan-300 rounded-xl flex justify-center items-center gap-1 w-52"
            >
              <Link href={`/questions/${question._id}`}>
                <h2>{question.level + " "}</h2>

                <h3>{i}</h3>
              </Link>
            </div>
          );
        })}
      </section>
      <section id="medium-questions" className="grid grid-cols-2 gap-1 mb-12">
        {mediumQuestions?.map((question, i) => {
          return (
            <div
              key={i}
              className="border border-cyan-300 rounded-xl flex justify-center items-center gap-1 w-52"
            >
              <Link href={`/questions/${question._id}`}>
                <h2>{question.level + " "}</h2>

                <h3>{i}</h3>
              </Link>
            </div>
          );
        })}
      </section>
      <section id="hard-questions" className="grid grid-cols-2 gap-1 mb-12">
        {hardQuestions?.map((question, i) => {
          return (
            <div
              key={i}
              className="border border-cyan-300 rounded-xl flex justify-center items-center gap-1 w-52"
            >
              <Link href={`/questions/${question._id}`}>
                <h2>{question.level + " "}</h2>

                <h3>{i}</h3>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
  return content;
}
