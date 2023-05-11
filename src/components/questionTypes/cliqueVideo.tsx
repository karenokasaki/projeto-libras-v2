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
      setMessage("resposta errada");
      return;
    }

    try {
      await api.get(`/user/add-points/${id}`);
      setMessage("resposta certa! parabéns");
      setAnswered(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-full">
      {!answered ? (
        <div className="">
          <div id="heading">
            <img src={question.heading} alt="cabeçalho" className="h-20" />
          </div>
          <div id="question">
            <h1> {question.questions}</h1>
          </div>
          <div id="options" className="flex ">
            {question.options.map((option, i) => {
              if (option.length)
                return (
                  <div key={i} className="flex flex-col items-center  ">
                    <ReactPlayer
                      url={option}
                      playing={true}
                      loop={true}
                      muted={true}
                      height={"20vh"}
                      width={"30vw"}
                    />
                    <input
                      type="radio"
                      name="option"
                      value={`${i}`}
                      onClick={() => checkAnswer(i, question._id)}
                    />
                  </div>
                );
            })}
          </div>
          {message && <h2>{message}</h2>}
        </div>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </div>
  );
}
