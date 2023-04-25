import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import EscrevaPalavra from "./questionTypes/escrevaPalavra";
import CliqueImagem from "./questionTypes/cliqueImagem";
import CompletePalavra from "./questionTypes/completePalavra";
import EscolhaFrase from "./questionTypes/escolhaFrase";
import CompleteFrase from "./questionTypes/completeFrase";
import CliqueVideo from "./questionTypes/cliqueVideo";
import MontePalavra from "./questionTypes/montePalavra";

export default function Question({
  question,
}: {
  question: Question;
  index: number;
  setIndex: (index: number) => void;
}) {
  const [questionType, setQuestionType] = useState<string>();
  useEffect(() => {
    setQuestionType(question.type);
  }, [question]);

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>{questionType}</h1>
      {questionType === "escreva a palavra" && (
        <EscrevaPalavra question={question} />
      )}
      {questionType === "complete a palavra" && (
        <CompletePalavra question={question} />
      )}
      {questionType === "clique na imagem" && (
        <CliqueImagem question={question} />
      )}
      {questionType === "escolha a frase" && (
        <EscolhaFrase question={question} />
      )}
      {questionType === "complete a frase" && (
        <CompleteFrase question={question} />
      )}
      {questionType === "clique no video" && (
        <CliqueVideo question={question} />
      )}
      {questionType === "monte a palavra" && (
        <MontePalavra question={question} />
      )}
    </div>
  );
}
