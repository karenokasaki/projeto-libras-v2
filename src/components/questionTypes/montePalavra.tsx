import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import api from "@/api/api";

export default function MontePalavra({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [message, setMessage] = useState("");
  const [userAnswer, setUserAnswer] = useState("");

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
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          setUserAnswer("");
          setMessage("");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    checkAnswer();
  }, [userAnswer]);
  return (
    <>
      <div id="heading">
        <ReactPlayer
          playing={true}
          loop={true}
          controls={true}
          muted={true}
          url={question.heading}
        />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
      </div>
      <div id="options">
        {question.options.map((option, i) => (
          <label key={i}>
            {option}
            <input
              type="checkbox"
              value={`${option}`}
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
  );
}
