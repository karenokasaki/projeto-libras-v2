import api from "@/api/api";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useRouter } from "next/router";

function SignUpPage() {
  const initialValues: SignupForm = {
    name: "",
    password: "",
    email: "",
    surdo: false,
    age: "",
    city: "",
  };
  const router = useRouter();
  const onSubmit = async (
    values: SignupForm,
    actions: FormikHelpers<SignupForm>
  ) => {
    try {
      console.log(values);
      await api.post("/user/signup", values);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center py-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Cadastre-se
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors: Partial<SignupForm> = {};
              if (!values.name) {
                errors.name = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              }
              if (!values.age) {
                errors.age = "Required";
              }
              if (!values.city) {
                errors.city = "Required";
              }
              return errors;
            }}
            onSubmit={onSubmit}
          >
            <Form>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome Completo
                </label>
                <div className="mt-2">
                  <Field
                    id="name"
                    type="name"
                    name="name"
                    placeholder="Nome completo"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Idade
                </label>
                <div className="mt-2">
                  <Field
                    id="age"
                    type="number"
                    name="age"
                    placeholder="Idade"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cidade
                </label>
                <div className="mt-2">
                  <Field
                    id="city"
                    type="city"
                    name="city"
                    placeholder="Cidade"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor="surdo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Você é:
                </label>
                <div className="mt-2">
                  <Field
                    id="surdo"
                    type="surdo"
                    name="surdo"
                    as="select"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  >
                    <option value="true">Surdo</option>
                    <option value="false">Ouvinte</option>
                  </Field>
                </div>
              </div>

              <div className="my-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="mt-2">
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Senha"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
