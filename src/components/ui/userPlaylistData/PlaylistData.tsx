"use client"

import React, { useEffect } from "react"

import { TbLockCheck } from "react-icons/tb";


import { AppContext } from "@/app/AppContext";

import { useContext } from "react";

import toast from "react-hot-toast";

import axios from "axios";


import { addVideoToPlaylist,deleteVideoFromPlaylist, getAllPlaylists } from "@/app/actions/playLists";

interface Props {

    isPlaylistButtonClicked: boolean;
    setPlayListButtonClicked: (value: boolean) => void;
    videoId: string;

}

export default function PlaylistData({isPlaylistButtonClicked,setPlayListButtonClicked,videoId}:Props) {


    const {playlistData,setAllPlaylistData} = useContext(AppContext);


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

                    setAllPlaylistData([...playlistData, response.data]);

                }

                setPlayListButtonClicked(false);

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

                setPlayListButtonClicked(false);

            }


        } catch (error: any) {

            console.log(error.message);

        }
    }

    async function getPlaylists() {

        try {

            const response = await axios.get(`/api/playlist/getAllPlaylist`);

            console.log("reposne playlist data ", response.data.data);

            setAllPlaylistData(response?.data?.data);


        } catch (error: any) {

            console.log(error.message);

        }
    }


    useEffect(()=>{


        getPlaylists();

    },[]);


    return (

        <div>

            <div className="flex w-full flex-col gap-2 items-center justify-between pt-2 max-h-[150px] overflow-y-auto">

                {

                    playlistData?.map((val: any) => (

                        <div className=" relative flex justify-between w-full p-1 ">

                            <input type="checkbox" className="text-white" onChange={(e) => checkBoxClickHandler(e, val?.id, videoId)} />

                            <p className="text-white text-lg font-bold capitalize">{val.title}</p>

                            <TbLockCheck className="text-white text-2xl" />

                        </div>
                    ))}

            </div>

        </div>
    )

}



