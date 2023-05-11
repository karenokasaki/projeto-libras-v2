import api from "@/api/api";
import { useState } from "react";
import ReactPlayer from "react-player";
import NextQuestion from "../NextQuestion";

export default function CliqueImagem({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);

  const checkAnswer = async (i: number, id: string | undefined) => {
    if (i.toString() !== question.answer) {
      await api.get(`/user/remove-points/${id}`);
      setMessage("Resposta errada 😖");
      return;
    }
    try {
      setAnswered(true);
      await api.get(`/user/add-points/${id}`);
      setMessage("");
      // setTimeout(() => {
      //   setIndex((prev) => prev + 1);
      //   setAnswered(!answered);
      //   setMessage("");
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center items-center flex-col ">
      {!answered ? (
        <>
          <div id="heading" className="mb-6 w-[100vw] h-[40vh]">
            <ReactPlayer
              url={question.heading}
              playing={true}
              loop={true}
              muted={true}
              height={"40vh"}
              width={"100vw"}
            />
          </div>
          <div id="question" className="mb-6 text-2xl text-center font-bold">
            <h2>{question.questions}</h2>
          </div>
          <div className="flex flex-row gap-10 flex-wrap justify-center pb-10 ">
            {question.options.map((option, i) => {
              return (
                <img
                  key={i}
                  src={option}
                  alt={`opção ${i}`}
                  className="w-[35vw]  sm:h-52 sm:w-52 object-contain bg-[#81B2D9] shadow-md rounded-2xl p-3"
                  onClick={(e) => {
                    checkAnswer(i, question._id);
                  }}
                />
              );
            })}
          </div>
          {message && (
            <p className="bg-[#FFD966] p-4 rounded-xl text-slate-700 font-semibold text-xl shadow-lg tracking-wide">
              {message}
            </p>
          )}
        </>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </main>
  );
}
