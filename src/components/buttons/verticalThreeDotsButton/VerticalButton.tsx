import React from "react";
import WatchLaterButton from "../WatchLater/WatchLaterButton";
import CreatePlaylistButton from "../createPlaylist/createPlaylistButton";

import { VscHistory } from "react-icons/vsc";

import { useRouter } from 'next/router';

import { deleteVideoFromUserHistroy } from "@/app/actions/histroy";

import toast from "react-hot-toast";




interface Props {

    isPlaylistButtonClicked: boolean;
    setPlayListButtonClicked: (value: boolean) => void;
    videoId: string; // Make videoId non-optional
    isLoggedIn: boolean;
    userId: string;
    historyData: any,
    setHistoryData: (value: any) => void;


}




export default function VerticalButton({ isPlaylistButtonClicked, setPlayListButtonClicked, videoId, isLoggedIn, userId, historyData, setHistoryData }: Props) {



    const currentPath = window.location.pathname;

    console.log("path name is ", currentPath);

    console.log("history data in vertical button ", historyData);


    async function deleteVideoFromHistory(videoId: string) {

        try {

            const response = await deleteVideoFromUserHistroy(videoId, userId);

            const newFilteredData = historyData.filter((data: any) => data?.videoId !== videoId);

            setHistoryData(newFilteredData);

            toast.success("video remove from history successfully");

            console.log("resposne is ", response);


        } catch (error: any) {


            console.log(error.message);

        }

    }


    return (


        <div className="flex flex-col border bg-stone-700 ">

            <WatchLaterButton videoId={videoId} userId={userId} isLoggedIn={isLoggedIn}></WatchLaterButton>

            <CreatePlaylistButton isPlaylistButtonClicked={isPlaylistButtonClicked} setPlayListButtonClicked={setPlayListButtonClicked} videoId={videoId}></CreatePlaylistButton>

            {

                currentPath.includes("userHistroy") && <div className="flex gap-1 rounded-lg hover:bg-red-500" onClick={() => deleteVideoFromHistory(videoId)}>

                    <VscHistory className="text-white text-xl pt-2"></VscHistory>

                    <p className="text-white font-semibold text-[9px] p-1">Remove from watch Hisory</p>

                </div>
            }



        </div>
    )
}






