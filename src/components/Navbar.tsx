import AuthContext from "@/context/authContext";
import Link from "next/link";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Image from "next/image";
//todo os links da nav bar estão dando refresh na página o q pode ser?
// do nada foi resolvido eu não sei porque kkkkkk
function Navbar() {
  const { token, setToken, setUser, user } = useContext(AuthContext);
  const router = useRouter();
  const [toggle, setTogle] = useState(false);
  function logOff() {
    localStorage.removeItem("loggedInUser");
    setToken("");
    setUser(undefined);
    router.push("/");
  }

  const toggleMenu = () => {
    setTogle(!toggle);
  };

  return (
    <>
      <nav className="hidden justify-evenly gap-48 items-center h-24 lg:flex  bg-gradient-to-r from-blue-100 to-blue-200  ">
        <Link href="/" className="flex flex-row hover:text-gray-600">
          <Image
            src="/assets/images/libras.png"
            alt="logo libras"
            height={50}
            width={50}
          />
          Página inicial
        </Link>
        {!token && (
          <>
            <Link href="/signup" className="hover:text-gray-600">
              Cadastrar
            </Link>
            <Link href="/login" className="hover:text-gray-600">
              Entrar
            </Link>
          </>
        )}
        {token && (
          <div className="flex flex-row justify-between gap-36">
            <Link href="/quiz" className="hover:text-gray-600">
              Perguntas
            </Link>

            <Link href="/profile" className="flex self-end">
              <Image
                src="/assets/images/user-square-svgrepo-com.png"
                alt="user icon"
                width={20}
                height={20}
                className=" self-end"
              />
            </Link>
            <button onClick={logOff} className="hover:text-gray-600">
              Sair
            </button>
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
          <div
            onClick={toggleMenu}
            className="transition-all origin-left animate-openmenu h-screen w-[100vw] bg-gradient-to-r from-blue-100 to-blue-200 fixed top-0 left-0 opacity-97 flex flex-col"
          >
            <Image
              src="/assets/images/menu-alt-05-svgrepo-com.png"
              alt="menu icon"
              width={30}
              height={30}
              onClick={toggleMenu}
              className="self-end mt-8 mr-10"
            />
            <div className="flex justify-center items-center h-screen">
              <ul className="flex flex-col justify-center items-center gap-32">
                <Link href="/" className="flex flex-row hover:text-gray-400">
                  Página inicial
                  <Image
                    src="/assets/images/libras.png"
                    alt="logo libras"
                    height={50}
                    width={50}
                  />
                </Link>
                {token ? (
                  <>
                    <Link href="/quiz" className="hover:text-gray-600">
                      Perguntas
                    </Link>
                    <Link
                      href="/profile"
                      className="flex  gap-1 hover:text-gray-600"
                    >
                      Sua conta
                      <Image
                        src="/assets/images/user-square-svgrepo-com.png"
                        alt="user icon"
                        width={20}
                        height={20}
                        className=" self-end "
                      />
                    </Link>
                    <button onClick={logOff} className="hover:text-gray-600">
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/signup" className="hover:text-gray-600">
                      Cadastrar
                    </Link>
                    <Link href="/login" className="hover:text-gray-600">
                      Entrar
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
