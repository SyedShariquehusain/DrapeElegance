import { auth } from "../../firebase";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    auth.signOut();
  }, []);

  return null;
}