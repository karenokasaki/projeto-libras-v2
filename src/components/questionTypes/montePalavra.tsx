import ReactPlayer from "react-player";
import { useEffect, useState, Suspense, useRef } from "react";
import api from "@/api/api";

import NextQuestion from "../NextQuestion";

export default function MontePalavra({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [message, setMessage] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [reload, setReload] = useState(false);
  const [answered, setAnswered] = useState(false);
  const checkboxRefs = useRef<NodeListOf<HTMLInputElement> | null[]>([]);

  const checkAnswer = async () => {
    if (
      userAnswer.length === question.answer.length &&
      userAnswer !== question.answer
    ) {
      await api.get(`/user/remove-points/${question._id}`);
      setMessage("Resposta errada 😖");
      return;
    }

    if (
      userAnswer.length === question.answer.length &&
      userAnswer === question.answer
    )
      try {
        await api.get(`/user/add-points/${question._id}`);

        checkboxRefs.current.forEach((curr) => {
          if (curr) curr.checked = false;
        });
        setUserAnswer("");
        setMessage("");
        setAnswered(true);
      } catch (error) {
        console.log(error);
      }
  };
  useEffect(() => {
    if (userAnswer.length === question.answer.length) checkAnswer();
  }, [userAnswer]);

  return (
    <>
      {!answered ? (
        <>
          <div id="heading">
            <ReactPlayer
              playing={true}
              loop={true}
              controls={true}
              muted={true}
              height={"40vh"}
              width={"100vw"}
              url={question.heading}
            />
          </div>
          <div
            id="question text-2xl text-center"
            className="text-center my-4 px-2 text-2xl flex self-center justify-center font-bold "
          >
            <p>{question.questions}</p>
          </div>
          <img src={question.attach} alt="" className="h-24" />
          <p className="font-semibold text-2xl tracking-widest ">
            {userAnswer}
          </p>
          <div id="options" className="flex gap-6 mb-4">
            {question.options.map((option, i) => (
              <div
                key={i}
                className="flex flex-col items-center font-semibold text-2xl"
              >
                <label>{option.toUpperCase()}</label>
                <input
                  type="checkbox"
                  className="h-6 w-6 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  value={`${option}`}
                  ref={(el) => (checkboxRefs.current[i] = el)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setUserAnswer((prev) => (prev += option));
                    } else {
                      setUserAnswer((prev) => prev.replace(option, ""));
                    }
                  }}
                />
              </div>
            ))}
          </div>
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
        </>
      ) : (
        <NextQuestion setIndex={setIndex} setAnswered={setAnswered} />
      )}
    </>
  );
}
