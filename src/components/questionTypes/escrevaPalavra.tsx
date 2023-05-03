import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import api from "@/api/api";

export default function EscrevaPalavra({
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
  useEffect(() => {
    console.log(userAnswer);
  }, [userAnswer]);

  return (
    <>
      <div id="heading">
        <img src={question.heading} alt="test" width={50} height={50} />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
      </div>
      <div id="options">
        <ReactPlayer
          url={question.attach}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
        />
      </div>
      <div>
        <label htmlFor="answer"></label>
        <input
          type="text"
          name="answer"
          onChange={(e) => {
            setUserAnswer(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (!answered) checkAnswer(question._id);
          }}
        >
          {" "}
          Acertei?{" "}
        </button>
      </div>

      {message && <h2>{message}</h2>}
    </>
  );
}
