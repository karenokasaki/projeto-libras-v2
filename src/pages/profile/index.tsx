import AuthContext from "@/context/authContext";
import { useContext, useEffect } from "react";
import useSWR from "swr";

function ProfilePage() {
  const { data: user, error } = useSWR<User>("/user/profile");
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
