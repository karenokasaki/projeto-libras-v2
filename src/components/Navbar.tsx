import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";
//todo os links da nav bar estão dando refresh na página o q pode ser?
function Navbar() {
  const [toggle, setTogle] = useState(false);
  const { token } = useContext(AuthContext);

  const toggleMenu = () => {
    setTogle(!toggle);
  };

  return (
    <>
      <nav className="hidden justify-center gap-48 items-center h-24 lg:flex  bg-gradient-to-r from-blue-100 to-blue-200  ">
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
      <nav className="lg:hidden h-24 flex items-center justify-end pr-10 bg-gradient-to-r from-blue-100 to-blue-200 ">
        <Image
          src="/assets/images/menu-alt-05-svgrepo-com.png"
          alt="menu icon"
          width={30}
          height={30}
          onClick={toggleMenu}
        />
        {toggle && (
          <div className="transition-all origin-left animate-openmenu h-screen w-[50vw] bg-gradient-to-r from-blue-100 to-blue-200 fixed top-0 left-0">
            {token ? (
              <ul>
                <li>
                  {" "}
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
                </li>
                <li></li>
                <li></li>
              </ul>
            ) : (
              <>
                <Link href="/signup">Cadastrar</Link>
                <Link href="/login">Entrar</Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
