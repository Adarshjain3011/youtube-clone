
"use client"


import { UserButton } from "@clerk/nextjs";

import { navbar } from "@/constant/icons/icons";

import mike from "@/assets/mike.png"


import Image from "next/image";

export default function NavBar() {

    return <div className="sticky top-2 w-full">

        <div className="flex w-[98%] justify-between items-center m-auto">

            {/* leftv section  */}

            <div className="flex gap-3">

                <div className="font-extrabold">

                    <navbar.IoReorderThree className="text-2xl"></navbar.IoReorderThree>

                </div>

                <div className="flex justify-center items-baseline">

                    <navbar.IoLogoYoutube className="text-red-700 text-2xl"></navbar.IoLogoYoutube>

                    <p className="font-extrabold text-2xl">Youtube</p>

                </div>

            </div>



            {/*  middle section  */}


            <div className="flex gap-4">

                {/* search bar and seacrh icon  */}

                <div className="flex ">

                    <div>

                        <div className="w-[500px]">

                            <input type="text" placeholder="search" className="outline-slate-800 border w-full relative rounded-l-lg p-1" />

                        </div>

                    </div>

                    <div className="w-[70px] h-7 rounded-r-lg border flex justify-center items-center bg-black/55 p-4 text-white">

                        <navbar.FaSearch></navbar.FaSearch>

                    </div>

                </div>



                <div className="w-[35px] h-[35px] rounded-full bg-black/80">

                    <Image src={mike} alt="" className="w-full h-full bg-cover rounded-full"/>

                </div>

            </div>

            {/* end section  */}

            <div className="flex gap-2">

                <div className="flex justify-center items-center rounded-full p-2 hover:bg-black/40">

                    <navbar.MdVideoCameraFront className="text-2xl"></navbar.MdVideoCameraFront>

                </div>

                <div className="flex justify-center items-center rounded-full p-2 hover:bg-black/40">

                    <navbar.IoNotifications className="text-2xl"></navbar.IoNotifications>

                </div>

                <div className="flex justify-center items-center rounded-full">

                    <UserButton></UserButton>

                </div>

            </div>

        </div>

    </div>

}



