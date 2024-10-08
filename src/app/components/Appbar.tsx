import React from "react";
import SigninButton from "./SigninButton";
import Link from "next/link";

const Appbar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <SigninButton />
      <Link href="/login/signup">
        <button className="text-blue-600">Sinscrire</button>
      </Link>
    </header>
    
  );
};

export default Appbar;
