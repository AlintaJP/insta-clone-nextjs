import Image from "next/image";
import React from "react";

import { useSession, signOut } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <div className="border p-[2px] rounded-full">
        <div className="relative w-16 h-16">
          <Image
            className="rounded-full"
            src={session?.user?.image}
            alt={session?.user?.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.userName}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>

      <button onClick={signOut} className="text-blue-400 text-sm font-semibold">
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
