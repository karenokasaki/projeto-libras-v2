import api from "@/api/api";
import AuthContext from "@/context/authContext";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";

function Login() {
  const initialValues: LoginForm = { email: "", password: "" };
  const router = useRouter();
  const { setUser, setToken } = useContext(AuthContext);
  async function onSubmit(values: LoginForm) {
    try {
      const response = await api.post("/user/login", values);
      console.log(response);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setUser(response.data.user);
      setToken(response.data.token);
      if (response.data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
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

export default Login;
