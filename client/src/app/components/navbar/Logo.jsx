import Image from "next/image";
import Link from "next/link";

import React from 'react'

function Logo() {
  return (
   <Link href="/">
      <Image src="/favicon.ico" alt="Logo" width={50} height={50}/>
    </Link>
  )
}

export default Logo