import AuthContext from "@/context/authContext";
import Link from "next/link";
import { useContext } from "react";

//todo os links da nav bar estão dando refresh na página o q pode ser?
function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <nav className="flex gap-10">
      <Link href="/">Home</Link>
      {!token && (
        <>
          <Link href="/signup">Cadastrar</Link>
          <Link href="/login">Login</Link>
        </>
      )}
      {token && (
        <>
          <Link href="/profile">Profile</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
