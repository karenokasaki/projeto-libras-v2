import ReactPlayer from "react-player";
export default function MontePalavra({ question }: { question: Question }) {
  return (
    <>
      <div id="heading">
        <ReactPlayer
          playing={true}
          loop={true}
          controls={true}
          muted={true}
          url={question.heading}
        />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
      </div>
      <div id="options">
        {question.options.map((option, i) => (
          <label key={i}>
            {option}
            <input type="checkbox" />
          </label>
        ))}
      </div>
    </>
  );
}
