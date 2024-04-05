import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../AppContext";

import { useRouter } from "next/navigation";

// import NavBar from "@/components/common/navbar/Navbar";

import { navbar } from "@/constant/icons/icons";
import { TbPlaylistAdd } from "react-icons/tb";

import { useEffect } from "react";

import { useRef } from "react";

import { getTime } from "@/helpers/getTimeFromDate";

import { createWatchLater } from "@/app/actions/watchLater";

import { createPlaylist, getAllPlaylists, addVideoToPlaylist, deleteVideoFromPlaylist } from "../actions/playLists";

import toast from "react-hot-toast";

import axios from "axios";

import { TbLockCheck } from "react-icons/tb";
import { getAllVideo } from "../actions/createVideo";





export function VideoDisplayReal() {

    const {

        allVideos, userData, isLoggedIn,
        setIsLoggedIn, threeLineButtonCliked,
        setThreeLineButtonCliked,
        setCurrentPlayingVideo,
        playlistData, setAllPlaylistData

    } = useContext(AppContext);

    const [hoveredVideoIndex, setHoveredVideoIndex] = useState(-1);

    const [isPlaylistButtonClicked, setPlayListButtonClicked] = useState(false);

    const [titleText, setTitleText] = useState("");

    const [horizontalThreeButtonCliked, setHorizontalThreeButtonCliked] = useState(-1);


    const router = useRouter();

    const videoRef = useRef(null);


    const handleMouseEnter = (index: any) => {

        setHoveredVideoIndex(index);

    };

    const handleMouseLeave = () => {

        setHoveredVideoIndex(-1);

    };

    function moveToVideoPlayPage(data: any) {



        router.push(`/videoPlay/${data.id}`);


    }



    function handleClickOutside(event: any) {

        if (videoRef.current && !videoRef.current.contains(event.target)) {

            setHorizontalThreeButtonCliked(-1);

        }

    }




    async function watchLater(videoId: string) {

        try {

            console.log("video id is", videoId);

            if (!isLoggedIn) {


                router.push("/login");

            }

            console.log("user data ", userData);

            const newWatchLater = await createWatchLater(videoId, userData.data.id);

            console.log(newWatchLater.data);

            toast.success("video added to the watch list successfully");


        } catch (error: any) {

            console.log(error.message);

        }

    }



    async function createPlaylistHandler() {

        try {


            if (!isLoggedIn) {

                router.push("/login");

            }

            const response = await createPlaylist(titleText, userData.data.id);


            console.log("created playlist", response.data);

            setAllPlaylistData([...playlistData, response.data]);

            setPlayListButtonClicked(false);


        } catch (error: any) {


            console.log(error.message);

        }
    }




    async function getPlaylists() {

        // console.log("play list ke aadra ",userData);


        try {

            // await verifyUserWithToken();

            const response = await axios.get(`/api/playlist/getAllPlaylist`);

            console.log("reposne playlist data ", response.data.data);

            setAllPlaylistData(response?.data?.data);


        } catch (error: any) {

            console.log(error.message);

        }
    }



    async function checkBoxClickHandler(event: any, playlistId: string, videoId: string) {


        try {


            console.log("playlistId: ", playlistId);

            console.log("videoId: ", videoId);


            console.log(event.target.checked);

            if (event.target.checked === true) {

                const response = await addVideoToPlaylist(videoId, playlistId);

                console.log(response.data);

                if (response.status === 201) {

                    console.log("video alreafy prsent in the db ");

                    toast.success("video added successfully");


                }
                else {

                    toast.success("video added successfully");


                    //  playlistData, setAllPlaylistData

                    setAllPlaylistData([...playlistData, response.data]);

                }

            }
            else {


                const response = await deleteVideoFromPlaylist(videoId, playlistId);

                console.log(response.data);

                if (response.status === 201) {

                    // console.log("video alreafy prsent in the db ");

                    toast.success("this video does not exists in playlist");


                }
                else {

                    toast.success("video remove from playlist successfully");

                    console.log("playlist data ", playlistData);

                    console.log("resposne ka data ", response.data);

                }

            }


        } catch (error: any) {

            console.log(error.message);

        }
    }



    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };



    }, []);

    useEffect(() => {


        console.log("helow");

        // getAllVideo()

        getPlaylists();


    }, [])


    return (

        <div className="relative w-full  mt-28 bg-black ">

            <div className={`relative flex flex-wrap w-full justify-start items-start p-3 gap-4 `}>

                {allVideos?.map((data: any, index: any) => (

                    <div className={`flex relative flex-col gap-2 mb-11 ${threeLineButtonCliked === false ? "pl-1" : "pl-6"}`}>

                        <div className={`realtive`} key={data.id}
                        
                            onMouseOver={() => handleMouseEnter(index)}

                            onMouseLeave={() => setHoveredVideoIndex(-1)}

                            onClick={() => moveToVideoPlayPage(data)}

                        >router.push(`/videoPlay/${data.id}`)
                            {hoveredVideoIndex === index ? (

                                <div className={`rounded-xl ${threeLineButtonCliked === false ? "w-[260px] h-[160px]" : "w-[300px] h-[180px] pl-12"} `}>
                                    <video
                                        controls
                                        autoPlay
                                        className="relative w-full h-full bg-cover"
                                        style={{ width: "100%", height: "100%" }}
                                    >
                                        <source src={data?.url} type="video/mp4" className="w-full h-full bg-cover" />
                                    </video>

                                </div>


                            ) : (

                                <div className={`rounded-xl ${threeLineButtonCliked === false ? "w-[260px] h-[160px]" : "w-[300px] h-[200px]"} `}

                                >

                                    <img src={data.thumbnail} alt="" className="w-full h-full bg-cover rounded-xl"

                                        onMouseOver={() => handleMouseEnter(index)}
                                        onMouseLeave={() => setHoveredVideoIndex(-1)} />

                                </div>

                            )}

                            {hoveredVideoIndex !== index && (

                                <div className={`bg-black inline-block absolute right-1 rounded-md bottom-[73px] ${threeLineButtonCliked === false ? "right-7" : "right-1"}`}>

                                    <p className="text-white text-sm">{data?.duration}</p>

                                </div>
                            )}
                        </div>

                        {/* Individual Options */}

                        {horizontalThreeButtonCliked === index && (


                            <div ref={videoRef} className="w-[150px] bg-slate-800 flex flex-col gap-2 absolute right-[-70px] bottom-[-30px] rounded-xl z-40">

                                <div className="flex justify-between hover:bg-red-600 p-1 rounded-lg pt-2" onClick={() => watchLater(data.id)}>

                                    <navbar.MdOutlineWatchLater className="text-white text-xl" />

                                    <p className="text-white text-xs font-semibold text-start px-5">Watch Later</p>


                                </div>

                                {/* when the vertical button clcicked */}

                                {isPlaylistButtonClicked && (

                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">

                                        {/* Background blur effect */}

                                        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-lg"></div>

                                        {/* Playlist modal */}

                                        <div className="absolute w-[240px] p-2 items-center rounded-md border shadow-2xl bg-gray-900/15">

                                            <div className=" w-full flex justify-between sticky top-0 border-b-2 border-neutral-700">

                                                <p className="text-white font-semibold">Save video to...</p>

                                                <div className="w-[30px] h-[30px] rounded-full bg-gray-700 flex justify-center items-center" onClick={() => setPlayListButtonClicked(false)}>

                                                    <navbar.RxCross2 className="rounded-full text-white"></navbar.RxCross2>

                                                </div>

                                            </div>

                                            {/*  show all playlist  */}

                                            <div className="flex w-full flex-col gap-2 items-center justify-between pt-2 max-h-[150px] overflow-y-auto">

                                                {playlistData?.map((val: any) => (

                                                    <div className=" relative flex justify-between w-full p-1 ">

                                                        <input type="checkbox" className="text-white" onChange={(e) => checkBoxClickHandler(e, val?.id, data?.id)} />

                                                        <p className="text-white text-lg font-bold capitalize">{val.title}</p>

                                                        <TbLockCheck className="text-white text-2xl" />

                                                    </div>
                                                ))}

                                            </div>


                                            <div className="flex flex-col justify-center items-center gap-4 sticky bottom-0 border-t-2 border-gray-700 pt-3">

                                                <div className="w-full h-9 rounded-lg">

                                                    <input type="text" placeholder="enter text" className="w-full h-full rounded-lg pl-3 p-2 bg-slate-900 text-white border" onChange={(e) => setTitleText(e.target.value)}></input>

                                                </div>

                                                <div className="text border rounded-md p-1">

                                                    <p className="text-center text-white font-bold" onClick={() => createPlaylistHandler()}>create Playlist</p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )}


                                <div className="flex justify-between hover:bg-red-600 p-1 rounded-lg" onClick={() => {

                                    setPlayListButtonClicked(true);

                                }}>

                                    <TbPlaylistAdd className="text-white text-xl "/>

                                    <p className="text-white text-xs font-semibold text-start px-5 mb-2">Playlists</p>

                                </div>

                            </div>
                        )}

                        <div className="flex justify-between">

                            <div className="flex gap-2 w-full">

                                <div className={`rounded-full flex justify-center items-center w-[20px] h-[20px]`}>

                                    <img src={data?.user?.profileImage} alt="" className="rounded-full bg-cover w-full h-full" />

                                </div>

                                <div className="flex flex-col gap-1">

                                    <p className="font-bold text-[12px] text-white w-[220px]">{data.title}</p>

                                    <div className="flex flex-col">

                                        <h1 className="text-white/45 capitalize">{data?.user?.name}</h1>

                                        <p className="text-xs capitalize text-white/45">{data.viewsCount} views . {getTime(data?.createdAt)}</p>

                                    </div>

                                </div>

                            </div>

                            

                            <div>

                                <navbar.PiDotsThreeOutlineVerticalFill className="text-white" onClick={() => setHorizontalThreeButtonCliked(index)}></navbar.PiDotsThreeOutlineVerticalFill>

                            </div>

                        </div>

                    </div>

                ))}

            </div>
        </div>

    );
}






