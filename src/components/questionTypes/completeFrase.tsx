import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import api from "@/api/api";

export default function CompleteFrase({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);

  const checkAnswer = async (id: string | undefined) => {
    //checa se errou
    if (userAnswer !== question.answer) {
      await api.get(`/user/remove-points/${id}`);
      setMessage("resposta errada");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setAnswered(true);
      setMessage("resposta certa! parabéns");
      setUserAnswer("");
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setAnswered(false);
        setMessage("");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (!answered) checkAnswer(question._id);
  //   console.log(userAnswer);
  // }, [userAnswer]);
  return (
    <>
      <div id="heading">
        <ReactPlayer
          url={question.heading}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
        />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
      </div>
      <div id="options">
        <label htmlFor="answer">Escreva a resposta</label>
        <input
          type="text"
          name="answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={() => checkAnswer(question._id)}> Acertei? </button>
      </div>
    </>
  );
}
