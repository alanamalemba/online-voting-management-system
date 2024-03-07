import { ReactNode, createContext, useState } from "react";
import { UserType } from "../utilities/Types";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user") as string)
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
