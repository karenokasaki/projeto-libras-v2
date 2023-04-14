import api from "@/api/api";
import { Formik, FormikHelpers, Form, Field } from "formik";

function SignUpPage() {

  const initialValues: SignupForm = { name: "", password: "", email: "" };

  const onSubmit = async (
    values: SignupForm,
    actions: FormikHelpers<SignupForm>
  ) => {
    try {
      const response = await api.post("/user/signup", values);
      console.log(response);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
          return errors;
        }}
        onSubmit={onSubmit}
      >
        <Form>
          <label htmlFor="name">Nome completo</label>
          <Field id="name" name="name" placeholder="Nome completo" />
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="Email" />
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpPage;
