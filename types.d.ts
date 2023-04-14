type SignupForm = {
  name: string;
  password: string;
  email: string;
};

type LoginForm = {
  password: string;
  email: string;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  token: string;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setToken: React.Dispatch<React.SetStateAction>;
};
