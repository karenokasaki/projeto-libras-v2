import { useState, useEffect } from "react";
import NextQuestion from "../NextQuestion";
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
    if (
      userAnswer
        .toLowerCase()
        .replace(/[ÀÁÂÃÄÅ]/gi, "a")
        .replace(/[ÈÉÊË]/gi, "e")
        .replace(/[ÌÍÎÏ]/gi, "i")
        .replace(/[ÒÓÔÕÖØ]/gi, "o")
        .replace(/[ÙÚÛÜ]/gi, "u")
        .replace(/[Ç]/gi, "c")
        .replace(/[´^~]/gi, "") !==
      question.answer
        .toLowerCase()
        .replace(/[ÀÁÂÃÄÅ]/gi, "a")
        .replace(/[ÈÉÊË]/gi, "e")
        .replace(/[ÌÍÎÏ]/gi, "i")
        .replace(/[ÒÓÔÕÖØ]/gi, "o")
        .replace(/[ÙÚÛÜ]/gi, "u")
        .replace(/[Ç]/gi, "c")
        .replace(/[´^~]/gi, "")
    ) {
      await api.get(`/user/remove-points/${id}`);
      setMessage("Resposta errada 😖");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setAnswered(true);
      setMessage("");
      setUserAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!answered ? (
        <>
          <div id="heading" className="mb-12">
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
            className="  text-center my-4 px-2 text-2xl flex self-center justify-center font-bold"
          >
            <h2>{question.questions}</h2>
          </div>
          <div
            id="options"
            className="flex flex-col items-center text-2xl gap-4"
          >
            <label htmlFor="answer">Escreva a resposta</label>
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
              className="mt-10 bg-[#4c96d3] hover:text-white shadow-md transition-all  rounded-xl p-6"
            >
              {" "}
              Acertei?{" "}
            </button>

            {message && (
              <p className="bg-[#FFD966] p-4 rounded-xl text-slate-700 font-semibold text-xl shadow-lg tracking-wide mt-4">
                {message}
              </p>
            )}
          </div>
        </>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </>
  );
}
