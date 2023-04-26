import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import api from "@/api/api";

function MonteAPalavra() {
  const router = useRouter();
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState<any>();

  //check if admin
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);
  // preview image
  useEffect(() => {
    if (!image) return setPreview(undefined);
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const initialValues: Question = {
    type: "monte a palavra",
    heading: "",
    questions: "",
    options: [],
    answer: "",
    level: "fácil",
    attach: "",
    category: "",
  };

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    setImage(event.target.files[0]);
  }

  async function handleUpload(image: string) {
    let uploadData = new FormData();
    uploadData.append("picture", image);
    try {
      const response = await api.post("/cloudinary", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(values: Question, actions: FormikHelpers<Question>) {
    try {
      const url = await handleUpload(image);

      values.attach = url;
      values.answer.toUpperCase();
      values.options = values.answer.split("");

      await api.post("/question/create", values);
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 xl:overflow-y-auto">
      <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Monte a palavra
        </h1>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          className="divide-y-slate-200 mt-6 space-y-8 divide-y"
        >
          <Form className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <p className="mt-1 text-sm text-slate-500">
                Explicação de como fazer a pergunta corretamente.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="heading"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Heading - Vídeo
              </label>
              <Field
                id="heading"
                name="heading"
                placeholder="Link do vídeo"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="questions"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Pergunta
              </label>
              <Field
                id="questions"
                name="questions"
                placeholder="Qual será a pergunta?"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="answer"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Resposta
              </label>
              <Field
                id="answer"
                name="answer"
                placeholder="Qual é a resposta?"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="level"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Level de Dificuldade
              </label>
              <Field
                as="select"
                id="level"
                name="level"
                className="mt-2 block w-full rounded-md border-0 p-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              >
                <option value="fácil">Fácil</option>
                <option value="médio">Médio</option>
                <option value="difícil">Difícil</option>
              </Field>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="file"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Imagem
              </label>
              <div className="flex items-center justify-evenly">
                <div className="relative ml-4">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleImage}
                    accept=".jpg, .png"
                    className="peer absolute inset-0 h-full w-full rounded-md opacity-0"
                  />
                  <label
                    htmlFor="user-photo"
                    className="pointer-events-none block rounded-md bg-slate-200 py-2 px-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 peer-hover:bg-slate-50 peer-focus:ring-2 peer-focus:ring-blue-600"
                  >
                    <span>Adiconar imagem</span>
                    <span className="sr-only">user photo</span>
                  </label>
                </div>
                <button
                  type="button"
                  className="ml-6 text-sm font-medium leading-6 text-slate-900"
                  onClick={() => setImage(null)}
                >
                  Remover
                </button>
                <div className="mt-2 flex items-center">
                  {image && (
                    <img
                      className="inline-block h-32 w-32"
                      alt="imagem da pergunta"
                      src={preview}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-x-3 pt-8">
              <button
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Salvar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default MonteAPalavra;
