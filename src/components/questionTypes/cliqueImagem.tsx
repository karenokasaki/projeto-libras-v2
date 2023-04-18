import api from "@/api/api";
import { useState } from "react";
import ReactPlayer from "react-player";
export default function CliqueImagem({ question }: { question: Question }) {
  const [message, setMessage] = useState("");

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center items-center flex-col mt-8">
      <div id="heading" className="mb-6 w-[80vw] h-[40vh]">
        <ReactPlayer
          url={question.heading}
          playing={true}
          loop={true}
          muted={true}
          height={"40vh"}
          width={"80vw"}
        />
      </div>
      <div id="question" className="mb-6">
        <h2>{question.questions}</h2>
      </div>
      <div className="flex flex-row  h-[30vh] gap-10">
        {question.options.map((option, i) => {
          return (
            <img
              key={i}
              src={option}
              alt={`opção ${i}`}
              className="w-[25vw] h-[20vh] object-contain"
              onClick={(e) => {
                checkAnswer(i, question._id);
              }}
            />
          );
        })}
      </div>

      {message && <p>{message}</p>}
    </main>
  );
}
