
"use client"

import { navbar } from "@/constant/icons/icons"

import React from 'react';

import { useContext } from "react";

import { AppContext } from "@/app/AppContext";

import { useRouter } from "next/navigation"


export function SideBar() {

    const { threeLineButtonCliked, setThreeLineButtonCliked } = useContext(AppContext);

    const router = useRouter();


    const sidebarItems = [

        {
            icon: <navbar.MdHome />,
            label: 'Home',
            func: () => {

                router.push("/homepage");

            }
        },

        {
            icon: <navbar.SiYoutubeshorts />,
            label: 'Shorts',
            func: () => {
                
                // Define functionality here

            }
        },

        {
            icon: <navbar.PiUserRectangleLight></navbar.PiUserRectangleLight>,
            label: 'Your Channel',
            func: () => {
                // Define functionality here
            }
        },

        {
            icon: <navbar.LuHistory></navbar.LuHistory>,
            label: 'Histroy',
            func: () => {
                // Define functionality here
                router.push("/userHistroy");

            }
        },
        {
            icon: <navbar.BiSolidVideos></navbar.BiSolidVideos>,
            label: 'Your Videos',
            func: () => {
                
                router.push("/editVideo");

            }
        },
        {
            icon: <navbar.MdOutlineWatchLater></navbar.MdOutlineWatchLater>,
            label: 'watch Later',
            func: () => {
                // Define functionality here

                router.push("/watchLater");
                
            }
        },

        {
            icon: <navbar.LiaDownloadSolid></navbar.LiaDownloadSolid>,
            label: 'downloads',
            func: () => {
                // Define functionality here
            }
        },

        {
            icon: <navbar.GrLike></navbar.GrLike>,
            label: 'Liked Videos',
            func: () => {
                // Define functionality here
            }
        },


        {
            icon: <navbar.IoMdMusicalNote></navbar.IoMdMusicalNote>,
            label: 'Music',
            func: () => {
                // Define functionality here
            }
        },

        {
            icon: <navbar.SiYoutubegaming></navbar.SiYoutubegaming>,
            label: 'Gaming',
            func: () => {
                // Define functionality here
            }

        },

        {
            icon: <navbar.IoNewspaperOutline></navbar.IoNewspaperOutline>,
            label: 'News',
            func: () => {
                // Define functionality here
            }
        },

        {
            icon: <navbar.CiTrophy></navbar.CiTrophy>,
            label: 'Sport',
            func: () => {
                // Define functionality here
            }
        },


        {
            icon: <navbar.MdOutlinePodcasts></navbar.MdOutlinePodcasts>,
            label: 'Podcasts',
            func: () => {
                // Define functionality here
            }
        },

    ];

    return (


        <div className={` bg-black mt-14 h-screen overflow-y-scroll no-scrollbar ${threeLineButtonCliked === true ? "pl-3 w-[150px]" : "w-[70px]"} `}>


            <div className=" flex flex-col justify-center items-baseline gap-3">

                {

                    sidebarItems.map((item, index) => (
                        // w-70
                        <div className={`text-white justify-start items-center rounded-md hover:bg-slate-800  flex
                                        ${threeLineButtonCliked === true ? " text-sm w-[160px] z-10 justify-start p-2 gap-5 " :
                                         "text-xs flex-col justify-center w-[60px] h-[70px] gap-1"} `} key={index} onClick={item.func}>

                            <div className={`relative flex text-lg font-bold justify-center items-center`}>

                                {item.icon}

                            </div>

                            <div className="w-[60px] text-start font-semibold" key={index}>

                                {/* <p className="realtive text-white text-xs font-serif text-start w-full ">{item.label}</p> */}
                                <p className={` text-nowrap ${threeLineButtonCliked === false ? "text-center text-[8px]" : "text-sm"}`}>

                                    {item.label}

                                </p>

                            </div>

                        </div>

                    ))}

            </div>

        </div>

    );
}




