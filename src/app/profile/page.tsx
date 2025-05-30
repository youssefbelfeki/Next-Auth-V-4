import { logoutAction } from "@/actions/auth.action";
import { auth } from "@/auth";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-center flex-col">
      {session?.user && (
        <>
        <p className="mb-5 text-center px-9">{JSON.stringify(session)}</p>
          <h1 className="text-3xl font-bold mb-7">
            Welcome {session.user.name} to your profile
          </h1>
          <form action={logoutAction}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer p-2 rounded-lg">
              Sign Out
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
