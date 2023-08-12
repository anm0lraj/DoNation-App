import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import { ConnectWallet } from "@thirdweb-dev/react";

const Header = () => {
    return (
        <header
            className="flex justify-between items-center p-2
         bg-white shadow-lg fixed top-0 left-2 right-3"
        >
            <div
                className="flex justify-start items-center 
      text-xl text-black space-x-1"
            >
                <div>
                    <Image src={logo} width={180} height={50} alt="" />
                </div>
            </div>

            <div className="flex space-x-2 justify-center">
                <ConnectWallet accentColor="#8c12f0" colorMode="light" />
            </div>
        </header>
    );
};

export default Header;
