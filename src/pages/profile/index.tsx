import AuthContext from "@/context/authContext";
import { useContext } from "react";
import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
function ProfilePage() {
  const { token, setToken, setUser } = useContext(AuthContext);
  const { data: user, error } = useSWR<User>("/user/profile", {
    revalidateOnReconnect: true,
  });
  const router = useRouter();
  function logOff() {
    localStorage.removeItem("loggedInUser");
    setToken("");
    setUser(undefined);
    router.push("/");
  }
  return (
    <div className=" min-h-[82vh] bg-[#44B3E3]">
      <h1 className=" text-center pt-10 mb-14 text-5xl sm:pt-24 sm:mb-3 sm:text-xl">
        Seu perfil
      </h1>

      <div className="flex justify-center items-center">
        {user && (
          <div className="flex gap-12 flex-wrap">
            <div className="flex flex-col border-2 rounded-lg border-moonstone items-center justify-center w-[30vw] h-[50vh]">
              <Image
                src="/assets/images/profile.png"
                alt="user icon"
                width={200}
                height={200}
              />
              <h2 className="font-semibold">{user.name}</h2>
              <p className="font-light">{user.email}</p>
              <button
                onClick={logOff}
                className="border-2 rounded-lg hover:bg-[#CC7B8B] border-blush text-sm p-3 bg-blush m-3"
              >
                Sair da sua conta
              </button>
            </div>
            <div className="flex flex-col border-2 rounded-lg border-moonstone items-center justify-center w-[30vw]">
              <h1>Seus pontos:</h1>
              <p className="font-bold">{user.points} ⭐</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
