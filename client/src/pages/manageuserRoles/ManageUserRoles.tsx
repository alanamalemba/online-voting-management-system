import { useEffect, useState } from "react";
import UserCard from "./components/UserCard";
import { UserType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";

export default function ManageUserRoles() {
  const [users, setUsers] = useState<UserType[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${serverUrl}/users`);
        const result = await response.json();
        setUsers(result.success.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          toast.error(error.message);
        }
      }
    }

    getData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-4 flex-col grow">
      <h1 className="font-medium text-2xl mt-6 mx-6">Manage User Roles</h1>

      <div className="mx-6 flex gap-2 -">
        <input
          className="py-2 px-4 border grow rounded-full"
          placeholder="Search for user by email"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="p-2 border rounded-full w-[40px] h-[40px]"
          type="button"
        >
          S
        </button>
      </div>

      <div className="mx-6 grid grid-cols-2 gap-4 mb-2">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
