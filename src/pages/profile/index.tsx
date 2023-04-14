import AuthContext from "@/context/authContext";
import { useContext } from "react";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
