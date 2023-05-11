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

  return (
    <>
      <nav className="hidden text-2xl justify-center gap-20 items-center shadow-sm shadow-[#44B3E3] fixed lg:flex text-slate-200 bg-[#81B2D9] h-[13.5vh]  w-[100vw]">
        <Link
          href="/"
          className="flex flex-row hover:text-white items-center transition-all duration-200 gap-4"
        >
          página inicial
          <Image
            src="/assets/images/home.png"
            alt="logo libras"
            height={40}
            width={40}
            className="mb-4"
          />
        </Link>

        {!token && (
          <>
            <Link
              href="/signup"
              className="hover:text-white transition-all duration-200 "
            >
              cadastrar
            </Link>
            <Link
              href="/login"
              className="hover:text-white transition-all duration-200"
            >
              entrar
            </Link>
          </>
        )}
        {token && (
          <div className="flex flex-row items-center gap-20 justify-center">
            <div className="flex items-center ">
              <Link
                href="/quiz"
                className="hover:text-white transition-all duration-200 flex flex-row  items-center gap-2"
              >
                perguntas
                <img
                  className="h-10"
                  src="/assets/images/question-mark.png"
                  alt="question"
                />
              </Link>
            </div>
            <div className=" ">
              <Link
                href="/profile"
                className="flex  hover:text-white transition-all duration-200 items-center gap-2"
              >
                <span>perfil</span>

                <img src="/assets/images/user.png" alt="" className="h-10" />
              </Link>
            </div>
            <span className=" flex items-center gap-2 ">
              pontos:{" "}
              <span className="font-semibold">
                {currentUser && currentUser.points > 0 && currentUser.points}
              </span>
              <img src="/assets/images/star.png" alt="" className="h-8" />
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
          className="bg-[#81B2D9] border-2 rounded-full m-5 w-11"
        />
        {toggle && (
          <div
            onClick={toggleMenu}
            className="transition-all origin-left animate-openmenu h-screen w-[100vw] bg-[#81B2D9] to-blue-200 fixed top-0 left-0 opacity-97 flex flex-col"
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
                  página inicial
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
                      perguntas
                    </Link>
                    <Link
                      href="/profile"
                      className="flex  gap-1 hover:text-gray-600 items-center"
                    >
                      sua conta
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
                      cadastrar
                    </Link>
                    <Link href="/login" className="hover:text-gray-600">
                      entrar
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
