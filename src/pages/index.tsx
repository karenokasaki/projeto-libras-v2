import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div className="bg-[#E4CFB4] min-h-screen flex flex-col items-center justify-center">
      <div className="text-slate-700 hover:text-slate-300 bg-[#FFD966] text-center w-full p-16 lg:pt-18 tracking-widest text-3xl lg:text-5xl mb-5 shadow-xl">
        <p>PORTLIBRAS</p>
      </div>

      <div className="flex flex-wrap mb-4 justify-center items-center text-slate-800 lg:flex-row lg:flex-nowrap">
        <div className="mb-4 lg:w-4/5 lg:px-5">
          <p>Apresentação</p>
          {hasWindow && (
            <ReactPlayer
              url={"https://youtu.be/H8AQ-GIy94k"}
              playing={true}
              loop={true}
              controls={true}
              muted={true}
              height={"auto"}
              width={"auto"}
            />
          )}
        </div>

        <div className="p-2 px-4">
          <p className="font-bold text-lg">Objetivos</p>
          <p className="tracking-wide text-sm">
            Proporcionar uma aproximação entre a comunidade surda e o ensino de
            Português como L2 para surdos e minimizar os desafios que os surdos
            encontram para aprender essa língua. Sempre valorizando a trajetória
            da comunidade surda e a Libras como língua materna.
          </p>
          <a
            className="italic text-sm font-bold hover:text-[#4c96d3]"
            href="https://www.linkedin.com/in/ang%C3%A9lica-rodrigues-gon%C3%A7alves-774b5646/"
          >
            Angélica Rodrigues Gonçalves
          </a>
          <p className="italic text-xs ">
            Tradutora e Intérprete de Libras Mestre e pesquisadora em Estudos
            Linguísticos
          </p>
        </div>
      </div>
    </div>
  );
}
