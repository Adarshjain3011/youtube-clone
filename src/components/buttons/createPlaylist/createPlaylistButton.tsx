"use client"

import React from "react";

import { createPlaylist } from "@/app/actions/playLists"

import { useContext, useState,useRef } from "react";

import { AppContext } from "@/app/AppContext";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { TbPlaylistAdd } from "react-icons/tb";

import { navbar } from "@/constant/icons/icons";

import { TbLockCheck } from "react-icons/tb";

import { addVideoToPlaylist, deleteVideoFromPlaylist } from "@/app/actions/playLists";

import PlayListData  from "@/components/ui/userPlaylistData/PlaylistData"

interface Props {

    isPlaylistButtonClicked: boolean;
    setPlayListButtonClicked: (value: boolean) => void;
    videoId: string;

}


export default function createPlaylistManager({ isPlaylistButtonClicked, setPlayListButtonClicked,videoId }: Props) {



    const router = useRouter();

    const { isLoggedIn, setIsLoggedIn, userData, setUserData, playlistData, setAllPlaylistData } = useContext(AppContext);

    const [titleText, setTitleText] = useState("");

    async function createPlaylistHandler() {

        try {

            if (!isLoggedIn) {
                toast.dismiss("You are not logged in");
                router.push("/login");
                return;
            }

            const response = await createPlaylist(titleText, userData.data.id);

            console.log("created playlist", response.data);

            toast.success("New playlist created successfully");

            setAllPlaylistData([...playlistData, response.data]);

            setPlayListButtonClicked(false);

        } catch (error: any) {

            console.log(error.message);
        }
    }


    return (

        <div>

            {


                isPlaylistButtonClicked ? (


                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">

                        {/* Background blur effect */}

                        <div className="absolute inset-0 bg-black opacity-70 backdrop-blur-lg"></div>

                        {/* Playlist modal */}

                        <div className="absolute w-[240px] p-2 flex flex-col items-center rounded-md border shadow-2xl bg-gray-900/15">

                            <div className=" w-full flex justify-between sticky top-0 border-b-2 border-neutral-700">

                                <p className="text-white font-semibold">Save video to...</p>

                                <div className="w-[30px] h-[30px] rounded-full bg-gray-700 flex justify-center items-center" onClick={() => setPlayListButtonClicked(false)}>

                                    <navbar.RxCross2 className="rounded-full text-white"></navbar.RxCross2>

                                </div>

                            </div>



                            {/*  show all playlist  */}

                            <div className=" relative w-full">

                                <PlayListData isPlaylistButtonClicked ={isPlaylistButtonClicked} setPlayListButtonClicked={setPlayListButtonClicked} videoId={videoId}></PlayListData>

                            </div>


                            <div className="flex flex-col justify-center items-center gap-4 sticky bottom-0 border-t-2 border-gray-700 pt-3">

                                <div className="w-full h-9 rounded-lg">

                                    <input type="text" placeholder="Enter text" className="w-full h-full rounded-lg pl-3 p-2 bg-slate-900 text-white border" onChange={(e) => setTitleText(e.target.value)} />

                                </div>

                                <div className="text border rounded-md p-1">

                                    <p className="text-center text-white font-bold" onClick={createPlaylistHandler}>Create Playlist</p>

                                </div>

                            </div>

                        </div>

                    </div>


                ) : (

                    <div className=" flex hover:bg-red-600 p-1 rounded-lg pt-2" onClick={() => setPlayListButtonClicked(!isPlaylistButtonClicked)}>

                        <TbPlaylistAdd className="text-white text-xl " />

                        <p className="text-white text-xs font-semibold text-start px-5 mb-2">Playlists</p>

                    </div>

                )

            }

        </div>

    )
}







