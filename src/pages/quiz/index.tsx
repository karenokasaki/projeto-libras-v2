import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Questions() {
  // const { data: questions, error } = useSWR<Question[]>("/question/get-all");
  // const [easyQuestions, setEasyQuestions] = useState<Question[]>();
  // const [mediumQuestions, setMediumQuestions] = useState<Question[]>();
  // const [hardQuestions, setHardQuestions] = useState<Question[]>();

  const content = (
    <div className="flex items-center flex-col justify-center">
      <div>
        <Link href={`/quiz/terrestre`}>
          <h2>Transportes terrestres</h2>
        </Link>
      </div>
      <div>
        <Link href={`/quiz/aereo-e-maritimo`}>
          <h2>Transportes marítimos e aéreos</h2>
        </Link>
      </div>
    </div>
  );

  // const content = (
  //   <div className="grid grid-flow-row items-center">
  //     <Head>
  //       <title>Selecione a categoria! 📖</title>
  //     </Head>
  //     <section id="easy-questions" className="">
  //       {easyQuestions?.map((question, i) => {
  //         return (
  //           <div key={i} className={`border border-cyan-300 rounded-xl  `}>
  //             <Link href={`/questions/${question._id}`}>
  //               <h2>{question.level + " "}</h2>

  //               <h3>{i + 1}</h3>
  //             </Link>
  //           </div>
  //         );
  //       })}
  //     </section>
  //     <section id="medium-questions" className="grid grid-cols-2 gap-1 mb-12">
  //       {mediumQuestions?.map((question, i) => {
  //         return (
  //           <div
  //             key={i}
  //             className="border border-cyan-300 rounded-xl flex justify-center items-center gap-1 w-52"
  //           >
  //             <Link href={`/questions/${question._id}`}>
  //               <h2>{question.level + " "}</h2>

  //               <h3>{i}</h3>
  //             </Link>
  //           </div>
  //         );
  //       })}
  //     </section>
  //     <section id="hard-questions" className="grid grid-cols-2 gap-1 mb-12">
  //       {hardQuestions?.map((question, i) => {
  //         return (
  //           <div
  //             key={i}
  //             className="border border-cyan-300 rounded-xl flex justify-center items-center gap-1 w-52"
  //           >
  //             <Link href={`/questions/${question._id}`}>
  //               <h2>{question.level + " "}</h2>

  //               <h3>{i}</h3>
  //             </Link>
  //           </div>
  //         );
  //       })}
  //     </section>
  //   </div>
  // );
  return content;
}
