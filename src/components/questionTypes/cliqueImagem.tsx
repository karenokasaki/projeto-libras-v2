import ReactPlayer from "react-player";
export default function CliqueImagem({ question }: { question: Question }) {
  return (
    <>
      <div id="heading">
        <ReactPlayer url={question.heading} />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
      </div>
      <div id="options">
        {question.options.map((option, i) => (
          <img key={i} src={`${option}`} alt={`option ${i}`} />
        ))}
      </div>
    </>
  );
}
