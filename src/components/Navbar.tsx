import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";
//todo os links da nav bar estão dando refresh na página o q pode ser?
function Navbar() {
  const { token } = useContext(AuthContext);

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
        <div className="flex flex-row justify-between gap-52">
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
        </div>
      )}
    </nav>
  );
}

export default Navbar;
