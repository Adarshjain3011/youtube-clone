"use client"

import React, { useEffect, useState } from "react";
import { getVideoById } from "@/app/actions/createVideo";

import { getUserById } from "@/app/actions/auth";
import { navbar } from "@/constant/icons/icons";

import { SubscribeUnsubscribeHandler } from "@/app/actions/Suscriber";

import { AppContext } from "@/app/AppContext";

import { useContext } from "react";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { likeDislike_LikeHandler, likeDislike_DislikeHandler } from "@/app/actions/LikeDislike";

import { createViews } from "@/app/actions/views"

import { getTime } from "@/helpers/getTimeFromDate";


export default function VideoPlay() {

    const router = useRouter();

    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);

    const [currentPlayingVideoUser, setCurrentPlayingVideoUser] = useState(null);

    const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useContext(AppContext);

    // const[]
    const [loading, setLoading] = useState(false);

    let userId: string;

    async function getVideo() {

        try {

            setLoading(true);

            const videoId = window.location.pathname.split("/").pop();

            const video = await getVideoById(videoId);

            console.log("actual video ", video);

            setCurrentPlayingVideo(video.data);

            // we get the user Id from the 

            userId = video.data?.userId as string;

            const user = await getUserById(userId as string);

            console.log("actual video  author  ", user);

            setCurrentPlayingVideoUser(user.data);

            setLoading(false);

        } catch (error: any) {

            console.log(error.message);

        }
    }



    async function subscribeButtonClickHandler() {

        try {

            if (userData === null) {

                toast.error("user is not logged in");

                router.push("/signin");

            }

            setLoading(true);

            const response = await SubscribeUnsubscribeHandler(userData.id, currentPlayingVideoUser?.id);

            console.log("response ka data ", response?.data);


            if (response?.success === 202) {

                toast.success("user subscribe to the channel ");

            }
            else {

                toast.error("user unsubscribe to the channel ");

            }

            setCurrentPlayingVideoUser(response?.data);

            setLoading(false);

        }
        catch (error: any) {

            console.log(error.message);

        }
    }





    async function likeHandler() {




        try {

            const videoId: string = window.location.pathname.split("/").pop();

            console.log("like handler ke andar ", videoId);

            const userId: string = userData.data.id;

            console.log("User ID:", userId);


            const response = await likeDislike_LikeHandler(videoId, userId);

            console.log("reposne ", response.data);

            if (response.success === 202) {

                toast.error("user remove like from the video ");

            } else if (response.success == 201) {

                toast.success("user successfully  like the video ");


            }

            setCurrentPlayingVideo(response?.data);



        } catch (error: any) {

            console.log(error.message);

        }
    }





    async function dislikeHandler() {


        try {

            console.log("dislike video handler ke andar ");

            const videoId: string = window.location.pathname.split("/").pop();

            console.log("videoId ", videoId);

            const userId: string = userData.data.id;

            console.log("User ID:", userId);


            const response = await likeDislike_DislikeHandler(videoId, userId);

            console.log("reposne ", response?.data);

            if (response?.success === 201) {

                toast.success("user successfully add dislike on the video ");

            } else if (response?.success == 202) {

                toast.error("user successfully remove  like the video and add one dislike ");

            }
            else if (response?.success == 203) {

                toast.success("user sucessfully remove dislike from the  video ");

            }

            setCurrentPlayingVideo(response?.data);


        } catch (error: any) {

            console.log(error.message);

        }
    }





    async function addViewsOnVideo() {

        console.log("views on video handler");

        try {

            const videoId: string = window.location.pathname.split("/").pop();

            console.log("video id ");

            if (!userData) {
                console.log("User data not available.");
                return;
            }

            const userId = userData.data.id;

            console.log("User ID:", userId);

            setLoading(true);

            const response = await createViews(videoId, userId, isLoggedIn as boolean);

            console.log("Response:", response);



            setCurrentPlayingVideo(response?.data);

            setLoading(false);

        } catch (error: any) {

            console.log("Error:", error.message);

        }
    }





    useEffect(() => {

        getVideo();


        addViewsOnVideo();


    }, []);

    return (

        <div>

            {loading ? (
                <div className="text-3xl mt-24 text-white">
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="mt-20">
                    {/* Video player */}

                    <div className="flex flex-col w-[770px] rounded-md shadow-2xl gap-3">

                        <div className="relative w-full h-[370px] border rounded-lg">
                            <video
                                controls
                                autoFocus
                                className="relative w-full h-full bg-cover"
                                style={{ width: "100%", height: "100%" }}
                            >
                                <source src={currentPlayingVideo?.url} type="video/mp4" className="w-full h-full bg-cover" />
                            </video>
                        </div>

                        {/* Video title */}
                        <div>

                            <p className="text-white capitalize font-bold">{currentPlayingVideo?.title}</p>

                        </div>

                        {/* Other elements */}
                        <div className="flex justify-between items-center">
                            {/* First part */}
                            <div className="flex gap-3">
                                {/* User image */}
                                <div className="w-[40px] h-[40px] text-white rounded-full">

                                    <img src={currentPlayingVideoUser?.profileImage} alt="" className="w-full h-full bg-cover rounded-full" />

                                </div>

                                {/* Channel name and subscribers */}

                                <div className="flex flex-col">

                                    <h1 className="text-white"> {currentPlayingVideoUser?.name} </h1>

                                    <p className="text-white/50 text-xs">{currentPlayingVideoUser?.subscribersCount} <span className="text-sm text-white/50">subscribers</span></p>

                                </div>

                                {/* Subscribe button */}

                                <div className="bg-white rounded-full w-[100px] h-8 flex justify-center items-center">

                                    <p className="font-semibold" onClick={subscribeButtonClickHandler}>Subscribe</p>

                                </div>

                            </div>

                            {/* Second part */}

                            <div className="flex gap-3">

                                {/* Like and dislike */}
                                <div className="flex border justify-evenly items-center rounded-full w-[150px] h-8 p-1 bg-[#5656566f]">

                                    {/* Like */}

                                    <div className="flex gap-2 justify-center items-center w-full rounded-l-full hover:bg-[#616161]" onClick={likeHandler}>

                                        <div className=" relative flex justify-center items-center">

                                            <navbar.GrLike className="text-white/85"></navbar.GrLike>

                                        </div>

                                        <p className="text-center text-white">{currentPlayingVideo?.likesCount}</p>

                                    </div>


                                    {/* Dislike */}

                                    <div className="relative flex justify-center items-center gap-1 rounded-r-full border-l-2 w-full hover:bg-[#616161]" onClick={dislikeHandler}>



                                        <div className=" relative flex justify-center items-center">


                                            <navbar.GrDislike className="text-white/85"></navbar.GrDislike>

                                        </div>

                                        <p className="text-center text-white">{currentPlayingVideo?.dislikesCount}</p>

                                    </div>

                                </div>

                                {/* Share button */}

                                <div className="flex justify-evenly items-center border rounded-full w-[100px] h-8 p-1 bg-[#5656566f] hover:bg-[#616161]">

                                    <navbar.FaShare className="text-white"></navbar.FaShare>

                                    <p className="text-white">Share</p>

                                </div>



                                {/* Download button */}

                                <div className="flex justify-evenly items-center border rounded-full w-[120px] h-8 p-2 bg-[#5656566f] hover:bg-[#616161]">

                                    <navbar.LiaDownloadSolid className="text-white"></navbar.LiaDownloadSolid>

                                    <p className="text-white capitalize">Download</p>


                                </div>


                                {/* More options */}

                                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#5656566f] hover:bg-[#616161]">

                                    <navbar.HiDotsHorizontal className="text-white text-lg"></navbar.HiDotsHorizontal>

                                </div>

                            </div>

                        </div>

                        {/* Video description */}
                        <div className="bg-[#5656566f] h-9 w-full rounded-md p-2">

                            <div className="flex gap-3">

                                <p className="font-bold text-white/75 text-sm">{currentPlayingVideo?.viewsCount} views</p>
                                <p className="font-bold text-white/75 text-sm">{getTime(currentPlayingVideo?.createdAt)}</p>

                                <div className="flex gap-1">

                                    {

                                        currentPlayingVideo?.tags?.map((data:any)=>(


                                            <p className="font-medium text-blue-600 text-sm">#{data} </p>

                                        ))

                                    }

                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}
