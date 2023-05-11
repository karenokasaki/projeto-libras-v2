import ReactPlayer from "react-player";

export default function NextQuestion({
  setIndex,
  setAnswered,
}: {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="mb-4">
        <ReactPlayer
          url={"https://youtu.be/VPR7L6cdtoM"}
          playing={true}
          loop={true}
          controls={true}
          muted={true}
          height={"auto"}
          width={"auto"}
        />
      </div>
      <div className="bg-yellowg rounded-2xl p-10 text-2xl text-slate-200 shadow-lg text-center">
        <h1>RESPOSTA CORRETA</h1>

        <button
          className="mt-10 bg-[#4c96d3] hover:text-white shadow-md transition-all  rounded-xl p-6"
          onClick={() => {
            setIndex((prev) => prev + 1);
            setAnswered(false);
          }}
        >
          Próxima pergunta
        </button>
      </div>
    </>
  );
}
