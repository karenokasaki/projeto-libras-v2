import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import api from "@/api/api";
export default function CompletePalavra({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [userAnswer, setUserAnswer] = useState("");
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
        setIndex((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkAnswer(question._id);
    console.log(userAnswer);
  }, [userAnswer]);
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
        <select
          onChange={(e) => {
            setUserAnswer(e.target.value);
          }}
        >
          <option selected hidden>
            {" "}
          </option>
          {question.options.map((option, i) => (
            <option key={i}>{option} </option>
          ))}
        </select>
        {message && <h2>{message}</h2>}
      </div>
    </>
  );
}
