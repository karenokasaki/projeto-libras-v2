import api from "@/api/api";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Questions() {
  const [easyQuestions, setEasyQuestions] = useState<Question[]>();
  const [mediumQuestions, setMediumQuestions] = useState<Question[]>();
  const [hardQuestions, setHardQuestions] = useState<Question[]>();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get("/question/get-all");

        setEasyQuestions(
          response.data.filter((question: Question) => {
            if ("level" in question && question.level === "fácil") {
              return question;
            }
          })
        );
        setMediumQuestions(
          response.data.filter((question: Question) => {
            if ("level" in question && question.level === "médio") {
              return question;
            }
          })
        );
        setHardQuestions(
          response.data.filter((question: Question) => {
            if ("level" in question && question.level === "difícil") {
              return question;
            }
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  const content = (
    <div>
      <Head>
        <title>Suas perguntas! 📖</title>
      </Head>
      <section id="easy-questions" className="grid grid-cols-2 gap-1">
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
      <section id="easy-questions"></section>
      <section id="easy-questions"></section>
    </div>
  );
  return content;
}
