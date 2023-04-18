import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function CliqueNoVideo() {
    const router = useRouter();
    useEffect(() => {
      !isAdmin() ? router.push("/") : null;
    }, [router]);
  return (
    <div>
      <h1>Clique no vídeo</h1>
    </div>
  );
}

export default CliqueNoVideo;
