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
    <div className=" min-h-[100vh] bg-[#E4CFB4] pt-52">
      <div className="flex justify-center items-center">
        {user && (
          <div className="flex gap-12 flex-col lg:flex-row ">
            <div className="flex  bg-[#81B2D9] rounded-2xl flex-col border items-center justify-center w-[65vw] h-40 lg:w-[30vw] lg:h-auto lg:text-4xl ">
              <h1>Seus pontos:</h1>
              <p className="font-bold">{user.points} ⭐</p>
            </div>
            <div className="flex flex-col bg-[#81B2D9] rounded-2xl items-center justify-center w-[65vw] h-auto lg:w-[30vw]">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
