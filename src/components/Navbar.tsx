import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

//todo os links da nav bar estão dando refresh na página o q pode ser?
// do nada foi resolvido eu não sei porque kkkkkk
function Navbar() {
  const { token, setToken, setUser } = useContext(AuthContext);
  const router = useRouter();

  function logOff() {
    localStorage.removeItem("loggedInUser");
    setToken("");
    setUser(undefined);
    router.push("/");
  }

  return (
    <nav className="flex gap-10">
      <Link href="/">Home</Link>
      {!token && (
        <>
          <Link href="/signup">Cadastrar</Link>
          <Link href="/login">Login</Link>
        </>
      )}
      {token && (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={logOff}>Sair</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
