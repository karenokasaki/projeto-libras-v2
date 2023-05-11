import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import api from "@/api/api";
import NextQuestion from "../NextQuestion";

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
    console.log(userAnswer);
  }, [userAnswer]);

  return (
    <>
      {!answered ? (
        <div className="flex gap-4 lg:gap-2 flex-col items-center">
          <div id="heading">
            <img src={question.heading} alt="test" className="h-20" />
          </div>
          <div
            id="question text-2xl text-center"
            className="text-center my-4 px-2 text-2xl flex self-center justify-center font-bold "
          >
            <h2>{question.questions}</h2>
          </div>
          <div id="options">
            <ReactPlayer
              url={question.attach}
              playing={true}
              loop={true}
              controls={true}
              muted={true}
              height={"40vh"}
              width={"100vw"}
            />
          </div>
          <div className="flex flex-col items-center ">
            <input
              autoComplete="off"
              type="text"
              name="answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="block w-full rounded-xl border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 lg:w-[30vw]"
            />
            <button
              onClick={() => checkAnswer(question._id)}
              className="mt-5 bg-[#4c96d3] hover:text-white shadow-lg transition-all  rounded-xl p-4 text-slate-700 font-semibold text-xl  "
            >
              {" "}
              Acertei?{" "}
            </button>
          </div>
          {message && (
            <p className="bg-[#FFD966] p-4 rounded-xl text-slate-700 font-semibold text-xl shadow-lg tracking-wide mb-4">
              {message}
            </p>
          )}
        </div>
      ) : (
        <NextQuestion setAnswered={setAnswered} setIndex={setIndex} />
      )}
    </>
  );
}
