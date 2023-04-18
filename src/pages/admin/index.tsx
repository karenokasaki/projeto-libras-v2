import { isAdmin } from "@/utils/isAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";




function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    !isAdmin() ? router.push("/") : null;
  }, [router]);

  return (
    <div>
      <h1>Admin page</h1>

      <p>Criar pergunta</p>
    </div>
  );
}

export default AdminPage;
