import React from "react";
import Header from "../../components/Header";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

const SignIn = ({ providers }) => {
  return (
    <>
      <Header />

      <div
        className="flex flex-col items-center justify-center 
        min-h-screen py-2 -mt-56 px-14 text-center"
      >
        <div className="relative w-80 h-28">
          <Image
            src="https://links.papareact.com/ocw"
            alt="insta logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="font-xs italic">
          This is not a REAL app, it is a clone built for educational purposes
          only
        </p>

        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SignIn;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
