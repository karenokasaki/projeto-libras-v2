import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
//todo os links da nav bar estão dando refresh na página o q pode ser?
// do nada foi resolvido eu não sei porque kkkkkk
function Navbar() {
  const { data: currentUser, error } = useSWR<User>("/user/profile");
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
  console.log(currentUser);
  return (
    <>
      <nav className="hidden justify-evenly items-center   lg:flex  bg-yellowg h-[13.5vh]  ">
        <Link
          href="/"
          className="flex flex-row hover:text-gray-600 items-center"
        >
          <Image
            src="/assets/images/librasblush.png"
            alt="logo libras"
            height={60}
            width={60}
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
          <div className="flex flex-row items-center gap-12">
            <div className="flex items-center">
              <Link href="/quiz" className="hover:text-gray-600">
                Perguntas
              </Link>
            </div>
            <div className="bottom-0 h-[13.5vh] flex flex-col-reverse">
              <Link href="/profile" className="">
                <Image
                  src="/assets/images/todds-profile.png"
                  alt="user icon"
                  width={80}
                  height={80}
                  className=""
                />
              </Link>
            </div>
            <span className="text-sm">
              Seus pontos:{" "}
              <span className="font-semibold">
                {currentUser && currentUser.points > 0 && currentUser.points} ⭐
              </span>
            </span>
          </div>
        )}
      </nav>
      <nav className="lg:hidden flex justify-end fixed z-50 items-end w-[100vw] ">
        <Image
          src="/assets/images/menu-alt-05-svgrepo-com.png"
          alt="menu icon"
          width={30}
          height={30}
          onClick={toggleMenu}
          className="bg-yellowg border-2 rounded-full m-5 w-11"
        />
        {toggle && (
          <div
            onClick={toggleMenu}
            className="transition-all origin-left animate-openmenu h-screen w-[100vw] bg-yellowg to-blue-200 fixed top-0 left-0 opacity-97 flex flex-col"
          >
            <Image
              src="/assets/images/menu-alt-05-svgrepo-com.png"
              alt="menu icon"
              width={30}
              height={30}
              onClick={toggleMenu}
              className="self-end mt-8 mr-10 bg-white rounded-full border-2 m-5 w-11
              "
            />
            <div className="flex justify-center items-center h-screen">
              <ul className="flex flex-col items-center gap-32">
                <Link
                  href="/"
                  className="flex flex-row hover:text-gray-400 text-center items-center justify-center"
                >
                  Página inicial
                  <Image
                    src="/assets/images/librasblush.png"
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
                      className="flex  gap-1 hover:text-gray-600 items-center"
                    >
                      Sua conta
                      <Image
                        src="/assets/images/todds-profile.png"
                        alt="user icon"
                        width={50}
                        height={50}
                        className=""
                      />
                    </Link>
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
