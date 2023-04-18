import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CompleteAPalavra() {
  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);
  return (
    <div>
      <h1>Complete a palavra</h1>
    </div>
  );
}

export default CompleteAPalavra;
