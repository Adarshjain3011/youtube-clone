"use client"

import React from "react";
import { useEffect, useState } from "react";

import { getUsersHistory, deleteUserAllHistory, deleteVideoFromUserHistroy } from "@/app/actions/histroy";

import { useContext } from "react";

import { AppContext } from "@/app/AppContext";

import { FaShuffle } from "react-icons/fa6";

import { FaPlay } from "react-icons/fa";

import Video from "@/components/ui/video/CommonVideo";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { getTime } from "@/helpers/getTimeFromDate";

import { PiEqualsLight } from "react-icons/pi";

import VerticalButton from "@/components/buttons/verticalThreeDotsButton/VerticalButton";

import { BiDotsVerticalRounded } from "react-icons/bi";

import { useRef } from "react";



export default function userHistroy() {


    const router = useRouter();

    const videoRef = useRef(null);


    const {

        userData,
        setUserData,
        threeLineButtonCliked,
        setThreeLineButtonCliked,
        isLoggedIn, setIsLoggedIn,
        historyData, setHistroyData

    } = useContext(AppContext);

    const [isPlaylistButtonClicked, setPlayListButtonClicked] = useState(false);

    const [isVerticalButtonClicked, setVerticalButtonClicked] = useState(false);

    const [indexValue, setIndex] = useState(-1);

    // const url = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];

    let url = "histroy";


    async function getAllUserHistroy() {

        try {

            if (!isLoggedIn) {

                toast.dismiss("user is not logged in");

                router.push("/login");

            }

            console.log("user data is ", userData);

            const userId = userData.data.id;

            console.log("user id is ", userData.data.id);

            const response = await getUsersHistory(userId);

            console.log(response?.data);

            setHistroyData(response?.data);


        } catch (error: any) {


            console.log(error.message);

        }
    }


    useEffect(() => {

        getAllUserHistroy();

    }, []);



    function handleClickOutside(event: any) {

        if (videoRef.current && !videoRef.current.contains(event.target)) {

            setIndex(-1);

        }

    }


    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };


    }, []);



    return (

        <div className={` relative w-full h-full ${threeLineButtonCliked === true ? "" : ""}`}>

            {/*  two div   */}

            <div className={` relativew-full mt-14 flex min-h-screen ${threeLineButtonCliked === true ? " " : ""}`}>

                {/*  first div  */}

                <div className="h-[480px] rounded-xl w-[350px] p-4 flex flex-col gap-5 shadow-2xl overflow-hidden bg-[rgba(255,255,255,.1)] fixed">

                    <div className=" w-[380x] h-[200px] rounded-xl">

                        {historyData && historyData?.length > 0 && (

                            <img src={historyData[0]?.video?.thumbnail} alt="" className="w-full h-full bg-cover rounded-xl" />

                        )}

                    </div>

                    <h1 className="text-white text-xl font-bold">{url}</h1>

                    {/*  user name */}


                    <div className="flex flex-col">

                        <p className="text-sm font-semibold text-white">Adarsh Jain</p>

                        <div className="text-xs font-semibold text-white">

                            <p>{historyData?.length} videos </p>

                        </div>

                    </div>


                    {/*  play All And shuffle  */}

                    <div className="flex gap-5">

                        <div className="flex rounded-full justify-center items-center border w-[230px] p-1">

                            {/* icon */}

                            <FaPlay className="text-white"></FaPlay>

                            <p className="text-white font-bold ">Play all</p>

                        </div>

                        <div className="flex justify-center items-center border w-[260px] rounded-full p-1">

                            {/* icon */}

                            <FaShuffle className="text-white"></FaShuffle>

                            <p className="text-white font-bold">Shuffle</p>

                        </div>

                    </div>

                </div>

                {/* second div  */}


                <div className={`bg-[rgba(255,255,255,.1)] relative flex justify-between max-h-screen shadow-xl rounded-md  ${threeLineButtonCliked === true ? "ml-[34%] w-[1000px]" : "ml-[32%] w-[600px]"}`}>


                    <div className="relative h-full w-full flex flex-col overflow-y-auto overflow-x-hidden pr-6">

                        {

                            historyData?.map((data: any, index: any) => (


                                <div className="relative w-full h-[100px] flex justify-between items-center  hover:border hover:rounded-lg hover:bg-gray-700" onClick={()=>router.push(`videoPlay/${data?.videoId}`)}>


                                    <div className="relative w-full h-full flex gap-2 justify-start items-center ">


                                        <div className="flex justify-center items-center">

                                            <PiEqualsLight className="text-white/65 text-2xl"></PiEqualsLight>

                                            {/* video  */}
                                            <div className="w-[170px] h-[90px] rounded-md">

                                                <video

                                                    controls
                                                    autoPlay
                                                    className="relative w-full h-full bg-cover rounded-md"
                                                    style={{ width: "100%", height: "100%" }}
                                                >
                                                    <source src={data?.video?.url} type="video/mp4" />

                                                </video>

                                            </div>

                                        </div>


                                        <div className="flex flex-col justify-center items-center">


                                            <p className="text-white text-sm font-semibold text-start">{data?.video?.title}</p>


                                            <p className="text-white/65 text-xs">{data?.user?.name} <span> · </span>{data?.video?.viewsCount} views <span>· {getTime(data?.video?.createdAt)} ago</span></p>


                                        </div>

                                    </div>


                                    <div>

                                        {

                                            indexValue === index ? (

                                                <div ref={videoRef} className="flex justify-center items-center">

                                                    <VerticalButton isPlaylistButtonClicked={isPlaylistButtonClicked}

                                                        setPlayListButtonClicked={setPlayListButtonClicked} videoId={data?.video?.id}

                                                        userId={userData?.data?.id} isLoggedIn={isLoggedIn} historyData={historyData} setHistoryData={setHistroyData}>

                                                    </VerticalButton>

                                                </div>

                                            )
                                                : (

                                                    <div onClick={() => {

                                                        setVerticalButtonClicked(!isVerticalButtonClicked)

                                                        setIndex(index);

                                                    }} className="flex justify-center items-center">

                                                        <BiDotsVerticalRounded className="text-white text-2xl"></BiDotsVerticalRounded>

                                                    </div>

                                                )
                                        }

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </div>

            </div>

        </div >
    )
}







