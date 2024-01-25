import { ReactNode, createContext, useEffect, useState } from "react";
import { UserType } from "../utilities/Types";

type UserContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () =>
      Boolean(localStorage.getItem("user")) &&
      Boolean(localStorage.getItem("accessToken"))
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (Boolean(storedUser) && Boolean(storedAccessToken)) {
      setUser(JSON.parse(storedUser as string));
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
