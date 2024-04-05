
"use client"

import React, { useContext, useState } from "react";

import { navbar } from "@/constant/icons/icons";

import mike from "@/assets/mike.png"

import Image from "next/image";

import CreateVideoForm from "@/components/video/createVideoForm";

import { AppContext } from "@/app/AppContext";

import { useRouter } from "next/navigation";

import {searchVideos} from "@/app/actions/createVideo";



export default function NavBar() {

    const router = useRouter();


    const {

        clickVideoCreate, setClickVideoCreate,
        threeLineButtonCliked,
        setThreeLineButtonCliked,
        userData, setUserData,
        isLoggedIn, setIsLoggedIn

    } = useContext(AppContext);

    const[textValue,setTextValue] = useState("");


    console.log("hllow navbar");


    async function searchUserVideos(){


        try{

            
            const resposne = await searchVideos(textValue);
            
            console.log("serach result is ",resposne.data);
            
            setTextValue("");

        }catch(error:any){

            console.log(error.message);

        }
    }



    return (

        <div className="fixed  w-full z-10 top-0 bg-black p-2 h-[50px]">

            <div className="flex w-[98%] justify-between items-center m-auto">

                {/* leftv section  */}

                <div className="flex gap-3">

                    <div className="font-extrabold text-white" onClick={() => setThreeLineButtonCliked(!threeLineButtonCliked)}>

                        <navbar.IoReorderThree className="text-3xl"></navbar.IoReorderThree>

                    </div>

                    <div className="flex justify-center items-center">

                        <navbar.IoLogoYoutube className="text-red-500 text-2xl"></navbar.IoLogoYoutube>

                        <p className="font-bold text-white text-2xl tracking-[-2px]" >YouTube</p>

                    </div>

                </div>



                {/*  middle section  */}


                <div className="flex gap-4 text-white">

                    {/* search bar and seacrh icon  */}

                    <div className="flex ">

                        <div>

                            <div className="w-[500px]">

                                <input type="text" placeholder="search" className="outline-slate-800 border
                                                                         w-full relative rounded-l-full p-[4.5px]
                                                                          bg-black/25 pl-4"  onChange={(e)=>setTextValue(e.target.value)} value={textValue}/>

                            </div>

                        </div>

                        <div className="w-[70px] h-7 rounded-r-lg border flex justify-center items-center bg-black/55 p-4 text-white" onClick={searchUserVideos}>

                            <navbar.FaSearch></navbar.FaSearch>

                        </div>

                    </div>



                    <div className="w-[35px] h-[35px] rounded-full bg-black/80 text-white">

                        <Image src={mike} alt="" className="w-full h-full bg-cover rounded-full bg-white" />

                    </div>

                </div>

                {/* end section  */}

                <div className="flex gap-2 text-white">

                    <div className="flex justify-center items-center rounded-full p-2 hover:bg-black/40" onClick={() => router.push("createVideoForm")}>

                        <navbar.MdVideoCameraFront className="text-2xl"></navbar.MdVideoCameraFront>

                    </div>

                    <div className="flex justify-center items-center rounded-full p-2 hover:bg-black/40">

                        <navbar.IoNotifications className="text-2xl"></navbar.IoNotifications>

                    </div>

                    {

                        isLoggedIn ? (

                            <div className="flex justify-center w-[30px] h-[30px] items-center rounded-full mt-1">

                                <img src={userData?.profileImage} alt="" className="w-full h-full bg-cover rounded-full" />

                            </div>

                        ) :
                            (
                                <div className="flex justify-center items-center gap-1 rounded-full border border-slate-800 p-2 hover:cursor-pointer" onClick={() => router.push("/login")}>

                                    <navbar.FaRegUserCircle className="text-lg text-blue-500"></navbar.FaRegUserCircle>

                                    <p className="text-sm text-blue-500">sign in</p>

                                </div>

                            )

                    }

                </div>

            </div>



        </div>

    )

}




