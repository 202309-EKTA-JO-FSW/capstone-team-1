import Image from "next/image";
import Link from "next/link";
import FreshFix from "../../../../public/FreshFix.png";
import React from "react";

function Logo() {
  return (
    <Link href="/">
      <>
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={35}
          height={25}
          priority="true"
        />
      </>
    </Link>
  );
}

export default Logo;
