import { ReactNode, createContext, useEffect, useState } from "react";
import { ResultType, UserType } from "../utilities/Types";
import { serverUrl } from "../utilities/constants";

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
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser: UserType = JSON.parse(
      localStorage.getItem("user") as string
    );

    if (!currentUser) return;

    fetch(`${serverUrl}/users/user/${currentUser.id}`)
      .then((res) => res.json())
      .then((result: ResultType<UserType>) => {
        if (result.error) {
          throw new Error(result.error.message);
        }

        setUser(result.success.data);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
