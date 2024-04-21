import { ResultType, UserType } from "../../utilities/Types";
import toast from "react-hot-toast";
import { serverUrl } from "../../utilities/constants";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";

export default function EditAccount() {
  const { user, setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);

  async function handleSaveChanges(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(`${serverUrl}/users/edit-account`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user?.id, firstName, lastName }),
      });

      const result: ResultType<undefined> = await res.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      setUser({
        ...user,
        first_name: firstName as string,
        last_name: lastName as string,
      } as UserType);

      toast.success(result.success.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="grow lg:max-w-[75%]">
      <div className="flex items-center mx-6 mt-6 gap-4  ">
        <h1 className=" text-2xl font-medium">Edit Account</h1>
      </div>

      <form
        className=" flex flex-col gap-4 max-w-[500px] rounded-md border  p-4 m-6 shadow"
        onSubmit={(e) => handleSaveChanges(e)}
      >
        <label className="flex flex-col gap-2">
          <p>First name</p>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border rounded p-2"
            type="text"
          />
        </label>

        <label className="flex flex-col gap-2">
          <p>Last name</p>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="border rounded p-2"
            type="text"
          />
        </label>

        <div className=" flex justify-end">
          <button className="bg-primaryColor text-white font-semibold p-2 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
