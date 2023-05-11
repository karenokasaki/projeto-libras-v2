import api from "@/api/api";
import { isAdmin } from "@/utils/isAdmin";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";

function QuestionList() {
  const { data: questions, error } = useSWR<Question[]>("/question/get-all", {
    revalidateOnFocus: true,
    //refreshInterval: 10000 // 10 seconds / é assim que faz o refresh automatico
  });

  async function handleDelete(id: string | undefined) {
    if (!id) return;
    try {
      await api.delete(`/question/${id}`);
      mutate("/question/get-all");
    } catch (error) {
      console.log(error);
    }
  }

  if (error) return <h1>Error</h1>;
  console.log(questions);
  return (
    <>
      <p className="text-2xl font-bold">Todas as perguntas</p>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Perguntas
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Lista de todas as perguntas
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Tipo
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Pergunta
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Categoria
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Criação
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {questions?.map((question) => {
                      console.log(question);
                      let data = new Date(question.createdAt);
                      let dataFormatada = data.toLocaleDateString("pt-BR");
                      return (
                        <tr key={question._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {question.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {question.questions}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {question.category}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {dataFormatada}
                          </td>
                          <td className=" whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            {question._id && (
                              <button
                                onClick={() => handleDelete(question._id)}
                                className="block rounded-md bg-indigo-600 px-2 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Deletar<span className="sr-only"> Deletar</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionList;
