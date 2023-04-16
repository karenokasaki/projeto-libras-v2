import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Question({ question }: { question: Question }) {
  const [questionType, setQuestionType] = useState<string>();
  useEffect(() => {
    setQuestionType(question.type);
  }, [question]);

  return (
    <div>
      {questionType === "escreva a palavra" && (
        <>
          <div id="heading">
            <img src={question.heading} alt="test" width={50} height={50} />
          </div>
          <div id="question">
            <h2>{question.questions}</h2>
          </div>
          <div id="options">
            <ReactPlayer url={question.options[0]} />
          </div>
          <div>
            <label htmlFor="answer"></label>
            <input type="text" name="answer" />
          </div>
        </>
      )}
    </div>
  );
}
