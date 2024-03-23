"use client"

import Image from "next/image";

import { UserButton } from "@clerk/nextjs";

import { auth,currentUser } from '@clerk/nextjs';

import NavBar from "@/components/common/navbar/Navbar";

export default  async function Home() {

  // const {userId, getToken} = auth();

  // const user = await currentUser();

  // console.log("curretn user ",user);

  return (

    <div className="w-full min-h-screen ">
      

        <NavBar></NavBar>
      {/* <Us */}

    </div>
  );
}


