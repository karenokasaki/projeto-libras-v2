import ReactPlayer from "react-player";

export default function EscrevaPalavra({ question }: { question: Question }) {
  return (
    <>
      <div id="heading">
        <img src={question.heading} alt="test" width={50} height={50} />
      </div>
      <div id="question">
        <h2>{question.questions}</h2>
      </div>
      <div id="options">
        <ReactPlayer
          url={question.options[0]}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
        />
      </div>
      <div>
        <label htmlFor="answer"></label>
        <input type="text" name="answer" />
      </div>
    </>
  );
}
