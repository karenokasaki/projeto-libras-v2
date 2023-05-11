import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import api from "@/api/api";
import NextQuestion from "../NextQuestion";

export default function EscolhaFrase({
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
      console.log("oi");
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

  useEffect(() => {
    checkAnswer(question._id);
  }, [userAnswer]);

  return !answered ? (
    <div className="min-h-full flex flex-col items-center gap-16">
      <div id="heading">
        <img src={question.heading} alt="cabeçalho" className="h-20" />
      </div>
      <div id="question">
        <ReactPlayer
          url={question.questions}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
        />
      </div>
      <div id="options">
        <select onChange={(e) => setUserAnswer(e.target.value)}>
          {question.options.map((option, i) => (
            <option value={i} key={i}>
              {option}{" "}
            </option>
          ))}
        </select>
      </div>
    </div>
  ) : (
    <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
  );
}
