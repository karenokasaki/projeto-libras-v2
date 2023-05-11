export default function NextQuestion({
  setIndex,
  setAnswered,
}: {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <h1>Você acertou!!!</h1>

      <button
        onClick={() => {
          setIndex((prev) => prev + 1);
          setAnswered(false);
        }}
      >
        Próxima pergunta
      </button>
    </div>
  );
}
