export function isAdmin() {
  const token = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(token || "");
  return loggedInUser.user.role === "ADMIN";
}
