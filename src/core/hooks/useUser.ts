import { User, UserService } from "goodvandro-alganews-sdk";
import { useCallback, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState<User.Detailed>();

  const fetchUser = useCallback(async function () {
    UserService.getDetailedUser(6).then(setUser);
  }, []);

  return {
    user,
    fetchUser,
  };
}