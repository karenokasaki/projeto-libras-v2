import ReactPlayer from "react-player";

export default function EscolhaFrase({ question }: { question: Question }) {
  return (
    <>
      <div id="heading">
        <img src={question.heading} alt="cabeçalho" />
      </div>
      <div id="question">
        <ReactPlayer url={question.questions} />
      </div>
      <div id="options">
        <select>
          {question.options.map((option, i) => (
            <option key={i}>{option} </option>
          ))}
        </select>
      </div>
    </>
  );
}
