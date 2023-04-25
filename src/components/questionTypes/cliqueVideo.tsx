import ReactPlayer from "react-player";
import { useState } from "react";
import api from "@/api/api";

export default function CliqueVideo({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [message, setMessage] = useState("");
  const checkAnswer = async (i: number, id: string | undefined) => {
    //checa se errou
    console.log("hi?");
    if (i.toString() !== question.answer) {
      await api.get(`/user/remove-points/${id}`);
      setMessage("resposta errada");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setMessage("resposta certa! parabéns");
      setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="heading">
        <img src={question.heading} alt="cabeçalho" />
      </div>
      <div id="question">
        <h1> {question.questions}</h1>
      </div>
      <div id="options" className="flex flex-col">
        {question.options.map((option, i) => {
          if (option.length)
            return (
              <div key={i} className="flex h-[40vh] w-[40vw] z-[2147483647]">
                <input
                  type="radio"
                  name={`option ${i}`}
                  value={`${i}`}
                  onClick={() => checkAnswer(i, question._id)}
                />
                <ReactPlayer
                  url={option}
                  playing={true}
                  loop={true}
                  muted={true}
                  height={"40vh"}
                  width={"40vw"}
                  className={"z-0"}
                />
              </div>
            );
        })}
      </div>
      {message && <h2>{message}</h2>}
    </>
  );
}
