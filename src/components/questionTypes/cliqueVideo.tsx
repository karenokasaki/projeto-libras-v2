import ReactPlayer from "react-player";
export default function CliqueVideo({ question }: { question: Question }) {
  return (
    <>
      <div id="heading">
        <img src={question.heading} alt="cabeçalho" />
      </div>
      <div id="question">
        <h1> {question.questions}</h1>
      </div>
      <div id="options">
        {question.options.map((option, i) => (
          <ReactPlayer
            key={i}
            url={option}
            playing={true}
            loop={true}
            muted={true}
          />
        ))}
      </div>
    </>
  );
}
