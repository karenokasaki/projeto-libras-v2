import { useRouter } from "next/router";
import { useEffect } from "react";

function ProtectRouteUser({ children }: { children: any }) {
  const router = useRouter();

  useEffect(() => {
    const allowedRoutes = ["/login", "/signup", "/"];
    const token = localStorage.getItem("loggedInUser");
    //redirect to login if not logged in
    // but not if on open routes
    if (!token && !allowedRoutes.includes(router.pathname)) {
      router.push("/signup");
    }
  }, [router]);

  return children;
}

export default ProtectRouteUser;
