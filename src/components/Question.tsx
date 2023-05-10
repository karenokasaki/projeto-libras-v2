import { Suspense, useEffect, useState } from "react";

import EscrevaPalavra from "./questionTypes/escrevaPalavra";
import CliqueImagem from "./questionTypes/cliqueImagem";
import CompletePalavra from "./questionTypes/completePalavra";
import EscolhaFrase from "./questionTypes/escolhaFrase";
import CompleteFrase from "./questionTypes/completeFrase";
import CliqueVideo from "./questionTypes/cliqueVideo";
import MontePalavra from "./questionTypes/montePalavra";

export default function Question({
  question,
  setIndex,
}: {
  question: Question;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [questionType, setQuestionType] = useState<string>();

  const randomizer = (options: Array<string>) => {
    let randomized = options.sort((a, b) => 0.5 - Math.random());
    console.log(randomized);
    if (randomized.join("") === question.answer) {
      randomizer(options);
    }
  };
  useEffect(() => {
    console.log("trocou a question");
    setQuestionType(question.type);
    if (question.type === "monte a palavra") randomizer(question.options);

    console.log(question);
  }, [question]);

  return (
    <div className="flex flex-col justify-center items-center pt-40 bg-[#44B3E3] ">
      <h1>{questionType}</h1>
      {questionType === "escreva a palavra" && (
        <EscrevaPalavra question={question} setIndex={setIndex} />
      )}
      {questionType === "complete a palavra" && (
        <CompletePalavra question={question} setIndex={setIndex} />
      )}
      {questionType === "clique na imagem" && (
        <CliqueImagem question={question} setIndex={setIndex} />
      )}
      {questionType === "escolha a frase" && (
        <EscolhaFrase question={question} setIndex={setIndex} />
      )}
      {questionType === "complete a frase" && (
        <CompleteFrase question={question} setIndex={setIndex} />
      )}
      {questionType === "clique no video" && (
        <CliqueVideo question={question} setIndex={setIndex} />
      )}
      {questionType === "monte a palavra" && (
        <MontePalavra question={question} setIndex={setIndex} />
      )}
    </div>
  );
}
