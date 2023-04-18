import ReactPlayer from "react-player";

export default function CompletePalavra({ question }: { question: Question }) {
  return (
    <>
      <div id="heading">
        <ReactPlayer
          url={question.heading}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
        />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
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
