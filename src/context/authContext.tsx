import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType>({
  token: "",
  user: undefined,
  setUser: () => {},
  setToken: () => {},
});

export function AuthProvider(props: AuthProviderProps) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const json = localStorage.getItem("loggedInUser");
    const loggedInUser = JSON.parse(json || '""');
    if (loggedInUser) {
      setToken(loggedInUser.token);
      setUser(loggedInUser.user);
    } else {
      setToken("");
      setUser(undefined);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
