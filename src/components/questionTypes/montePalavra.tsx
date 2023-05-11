import ReactPlayer from "react-player";
import { useEffect, useState, Suspense, useRef } from "react";
import api from "@/api/api";

import NextQuestion from "../NextQuestion";

export default function MontePalavra({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [message, setMessage] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [reload, setReload] = useState(false);
  const [answered, setAnswered] = useState(false);
  const checkboxRefs = useRef<NodeListOf<HTMLInputElement> | null[]>([]);

  const checkAnswer = async () => {
    if (
      userAnswer.length === question.answer.length &&
      userAnswer !== question.answer
    ) {
      await api.get(`/user/remove-points/${question._id}`);
      setMessage("resposta errada");
      return;
    }

    if (
      userAnswer.length === question.answer.length &&
      userAnswer === question.answer
    )
      try {
        await api.get(`/user/add-points/${question._id}`);
        setMessage("resposta certa! parabéns");
        checkboxRefs.current.forEach((curr) => {
          if (curr) curr.checked = false;
        });
        setUserAnswer("");
        setAnswered(true);
        // setTimeout(() => {
        //   setReload(!reload);
        // }, 1010);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    checkAnswer();
  }, [userAnswer]);

  return (
    <>
      {!answered ? (
        <>
          <div id="heading">
            <ReactPlayer
              playing={true}
              loop={true}
              controls={true}
              muted={true}
              height={"40vh"}
              width={"80vw"}
              url={question.heading}
            />
          </div>
          <div id="question text-2xl text-center">
            <h2>{question.questions}</h2>
          </div>
          <div id="options">
            {question.options.map((option, i) => (
              <label key={i}>
                {option}
                <input
                  type="checkbox"
                  value={`${option}`}
                  ref={(el) => (checkboxRefs.current[i] = el)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserAnswer((prev) => (prev += option));
                    } else {
                      setUserAnswer((prev) => prev.replace(option, ""));
                    }
                  }}
                />
              </label>
            ))}
          </div>
          <h1>{userAnswer}</h1>
          {message && <h2>{message}</h2>}
        </>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </>
  );
}
