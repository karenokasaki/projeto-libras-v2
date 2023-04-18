import ReactPlayer from "react-player";

export default function CompleteFrase({ question }: { question: Question }) {
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
        <label htmlFor="answer">Escreva a resposta</label>
        <input type="text" name="answer" />
      </div>
    </>
  );
}
