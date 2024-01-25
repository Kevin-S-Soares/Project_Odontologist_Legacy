import React, { ReactNode } from "react";
import Image from "next/image";
import githubLogo from "../public/github.svg";
const Home = (): ReactNode => {
  return (
    <div>
      <div className="flex justify-evenly">
        <a
          className="flex flex-col items-center rounded-md border-2 border-black p-2"
          href="https://github.com/Kevin-S-Soares/Project_Odontologist/tree/master/client"
        >
          <Image src={githubLogo} width={100} height={100} alt="github logo" />
          <span className="mt-4">Checkout the client repository</span>
        </a>
        <a
          className="flex flex-col items-center rounded-md border-2 border-black p-2"
          href="https://github.com/Kevin-S-Soares/Project_Odontologist/tree/master/server"
        >
          <Image src={githubLogo} width={100} height={100} alt="github logo" />
          <span className="mt-4">Checkout the server repository</span>
        </a>
      </div>
    </div>
  );
};

export default Home;
