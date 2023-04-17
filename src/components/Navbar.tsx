import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Image from "next/image";
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
    <nav className="flex justify-center gap-48 items-center h-24">
      <Link href="/">Página inicial</Link>
      {!token && (
        <>
          <Link href="/signup">Cadastrar</Link>
          <Link href="/login">Entrar</Link>
        </>
      )}
      {token && (
        <>
          <Link href="/profile">Profile</Link>
          <Link href="/questions">Perguntas</Link>

          <Link href="/profile" className="flex self-end">
            <Image
              src="/assets/images/user-square-svgrepo-com.png"
              alt="user icon"
              width={20}
              height={20}
              className=" self-end"
            />
          </Link>
          <button onClick={logOff}>Sair</button>
        </>
       
      )}
    </nav>
  );
}

export default Navbar;
