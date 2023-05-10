import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import api from "@/api/api";
import NextQuestion from "../NextQuestion";
export default function CompletePalavra({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [message, setMessage] = useState("");
  const checkAnswer = async (id: string | undefined) => {
    //checa se errou
    if (question.options.indexOf(userAnswer).toString() !== question.answer) {
      await api.get(`/user/remove-points/${id}`);
      setMessage("resposta errada");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setMessage("resposta certa! parabéns");
      setTimeout(() => {
        setMessage("");
        setIndex((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userAnswer !== "") checkAnswer(question._id);
    console.log("message", typeof message);
    console.log("answer", typeof userAnswer);
  }, [userAnswer]);
  return (
    <>
      {!answered ? (
        <>
          <div id="heading">
            <ReactPlayer
              url={question.heading}
              playing={true}
              loop={true}
              controls={true}
              muted={true}
              height={"40vh"}
              width={"100vw"}
            />
          </div>
          <div id="question">
            <h2>{question.questions}</h2>
          </div>
          <div id="options">
            {question.options.map((option, i) => (
              <h1
                key={i}
                onClick={() => {
                  setUserAnswer(option);
                }}
              >
                {option}
              </h1>
            ))}

            {message && <h2>{message}</h2>}
          </div>
        </>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </>
  );
}
