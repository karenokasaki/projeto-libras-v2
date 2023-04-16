import api from "@/api/api";
import { useEffect, useState } from "react";

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>();
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

  console.log(
    "question easy ",
    easyQuestions,
    "question medium",
    mediumQuestions,
    "question hard",
    hardQuestions
  );

  return <div>Questions</div>;
}
