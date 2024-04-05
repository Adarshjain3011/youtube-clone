

import { AppContext } from "@/app/AppContext";
import { createWatchLater } from "@/app/actions/watchLater";
import { useContext } from "react";
import toast from "react-hot-toast";

import { navbar } from "@/constant/icons/icons";

import { useRouter } from "next/navigation";

interface Props {

    videoId:string,
    isLoggedIn:boolean,
    userId:string
}

export default function watchlaterbutton({videoId,isLoggedIn,userId}:Props) {

    const router = useRouter();

    // const {isLoggedIn} = useContext(AppContext);


    async function watchLater(videoId: string) {

        try {

            console.log("video id is", videoId);

            if (!isLoggedIn) {


                router.push("/login");

            }

            console.log("user data id ", userId);

            const newWatchLater = await createWatchLater(videoId, userId);

            console.log(newWatchLater);

            toast.success("video added to the watch list successfully");


        } catch (error: any) {

            console.log(error.message);

        }

    }

    return (

        <div>

            <div className="flex justify-between hover:bg-red-600 p-1 rounded-lg pt-2" onClick={() => watchLater(videoId)}>

                <navbar.MdOutlineWatchLater className="text-white text-xl" />

                <p className="text-white text-xs font-semibold text-start px-5">Watch Later</p>


            </div>

        </div>
    )
}