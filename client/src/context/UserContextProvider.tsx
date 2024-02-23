import { ReactNode, createContext, useEffect, useState } from "react";
import { UserType } from "../utilities/Types";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  user: UserType | null;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("user"))
  );

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      setUser(JSON.parse(localStorage.getItem("user") as string));
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);
  return (
    <UserContext.Provider value={{ user, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
