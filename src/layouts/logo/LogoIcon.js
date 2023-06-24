import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";

const LogoIcon = () => {
  return (
    <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
      <Image src={'/logo.png'} width={50} priority height={50} alt='Logo Image' />
      <span className="ml-3 text-xl font-mono"><i className='font-black'>Games<span className='text-red-700 font-black'>Store</span></i></span>
    </Link>
  );
};

export default LogoIcon;
