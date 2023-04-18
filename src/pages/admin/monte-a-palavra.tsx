import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import api from "@/api/api";

function MonteAPalavra() {
  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);

  const [picture, setImage] = useState<any>();

  const initialValues: Question = {
    type: "monte a palavra",
    heading: "",
    questions: "",
    options: [],
    answer: "",
    level: "fácil",
    attach: "",
  };

  async function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    let uploadData = new FormData();
    uploadData.append("picture", event.target.files[0]);
    uploadData.append("upload_preset", "monte-a-palavra");

    const response = await api.post("/cloudinary", uploadData);

    console.log(response);
  }

  async function handleUpload(picture: string) {
    try {
      //const response = await api.post("/cloudinary", uploadData);

      //return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit(values: Question, actions: FormikHelpers<Question>) {
    try {
      const url = await handleUpload(picture);

      values.attach = url;
      values.options = values.answer.split("");

      const response = await api.post("/question/create", values);
      console.log(response);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Monte a palavra</h1>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="flex flex-col gap-3 items-center">
          <label htmlFor="heading">Heading - Vídeo</label>
          <Field id="heading" name="heading" placeholder="heading" />

          <label htmlFor="questions">Pergunta</label>
          <Field id="questions" name="questions" placeholder="questions" />

          <label htmlFor="answer">Resposta</label>
          <Field id="answer" name="answer" placeholder="answer" />

          <label htmlFor="level">Level de Dificuldade</label>
          <Field as="select" id="level" name="level" placeholder="level">
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
          </Field>

          <label htmlFor="picture">Imagem</label>
          <input
            id="picture"
            name="picture"
            type="file"
            onChange={handleImage}
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default MonteAPalavra;
