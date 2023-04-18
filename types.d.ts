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

type Question = {
  _id?: string;
  type: string;
  heading: string;
  questions: string;
  options: string[];
  answer: string;
  level: string;
  createdBy?: string;
  createdAt?: strin;
  updatedAt?: string;
  attach?: string;
};
