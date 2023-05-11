import ReactPlayer from "react-player";
import { useState } from "react";
import api from "@/api/api";
import NextQuestion from "../NextQuestion";

export default function CliqueVideo({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);
  const checkAnswer = async (i: number, id: string | undefined) => {
    //checa se errou

    if (i.toString() !== question.answer) {
      await api.get(`/user/remove-points/${id}`);
      setMessage(" Resposta errada 😖");
      setTimeout(() => {
        setMessage("");
      }, 1000);
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setMessage("");
      setAnswered(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-full">
      {!answered ? (
        <div className="flex flex-col items-center">
          <div id="heading">
            <img
              src={question.heading}
              alt="cabeçalho"
              className="h-32 lg:h-44 "
            />
          </div>
          <div
            id="question"
            className="my-4 px-2 text-2xl text-center flex flex-col self-center justify-center font-bold "
          >
            <h1> {question.questions}</h1>{" "}
            {message && (
              <>
                <ReactPlayer
                  url={"https://youtu.be/PyX23XF2CT4"}
                  playing={true}
                  loop={true}
                  controls={true}
                  muted={true}
                  height={"auto"}
                  width={"auto"}
                />
                <p className="bg-[#FFD966] p-4 mb-4 mt-2 rounded-xl text-slate-700 font-semibold text-xl shadow-lg tracking-wide">
                  {message}
                </p>
              </>
            )}
          </div>
          <div
            id="options"
            className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-center pb-4 lg:gap-0  "
          >
            {question.options.map((option, i) => {
              if (option.length)
                return (
                  <div
                    key={i}
                    className="flex px-2  flex-row-reverse items-center gap-4 lg:gap-2 lg:h-40 lg:w-[45vw] justify-center "
                  >
                    <ReactPlayer
                      url={option}
                      playing={true}
                      loop={true}
                      muted={true}
                      height={"auto"}
                      width={"auto"}
                    />
                    <input
                      type="radio"
                      name="option"
                      value={`${i}`}
                      className="h-10 w-10 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onClick={() => checkAnswer(i, question._id)}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </div>
  );
}
