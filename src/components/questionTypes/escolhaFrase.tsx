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
  const [userAnswer, setUserAnswer] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);
  const checkAnswer = async (i: number | undefined, id: string | undefined) => {
    //checa se errou
    if (userAnswer !== +question.answer) {
      await api.get(`/user/remove-points/${id}`);
      setMessage("resposta errada");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setUserAnswer(undefined);
      setAnswered(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof userAnswer === "number") checkAnswer(userAnswer, question._id);
  }, [userAnswer]);

  return !answered ? (
    <div className=" flex flex-col items-center gap-4">
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
          height={"auto"}
          width={"auto"}
        />
      </div>
      <div
        id="options"
        className="flex flex-col gap-7 py-4 lg:flex-row lg:gap-16 lg:py-10"
      >
        {question.options.map((option, i) => (
          <div
            key={i}
            onClick={() => {
              setUserAnswer(i);
            }}
            className=" bg-[#4c96d3] hover:text-white shadow-md transition-all font-semibold rounded-xl p-6 text-slate-200 text-center text-3xl tracking-[0.2em] "
          >
            {option}
          </div>
        ))}
      </div>
      {message && (
        <p className="bg-[#FFD966] p-4 rounded-xl text-slate-700 font-semibold text-xl shadow-lg tracking-wide mt-4">
          {message}
        </p>
      )}
    </div>
  ) : (
    <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
  );
}
