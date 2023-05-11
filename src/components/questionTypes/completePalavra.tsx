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
      setMessage("Resposta errada 😖");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setMessage("");
      setUserAnswer("");
      setAnswered(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userAnswer !== "") checkAnswer(question._id);
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
          <div
            id="question"
            className="text-center my-4 px-2 text-2xl flex self-center justify-center font-bold "
          >
            <p>{question.questions}</p>
          </div>
          <div
            id="options"
            className="flex flex-col gap-7 py-4 lg:flex-row lg:gap-16 lg:py-10"
          >
            {question.options.map((option, i) => (
              <div
                key={i}
                onClick={() => {
                  setUserAnswer(option);
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
        </>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </>
  );
}
