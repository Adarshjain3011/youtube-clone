
"use client"

import { navbar } from "@/constant/icons/icons";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createNewVideo } from '@/app/actions/createVideo';

import { useContext } from "react";
import { AppContext } from "@/app/AppContext";

import { useRouter } from "next/navigation";

import { FaImage } from "react-icons/fa6";

import { useState } from "react";

import { getVideoById,UpdateVideo } from "@/app/actions/createVideo";

interface FormValues {

    description?: string;
    title?: string;
    VideoUrl?: FileList; // Change to FileList for multiple files or File for a single file
    isAgeRestricted?: boolean;
    tags?: string;
    thumbnail?: FileList; // Change to FileList for multiple files or File for a single file
    userId?: string

}

export default function CreateVideoForm({ params }:{params:{id:string}}) {

    const router = useRouter();

    
    console.log("video id is ",params.id);

    

    const { clickVideoCreate, setClickVideoCreate, userData, setUserData, isLoggedIn, setIsLoggedIn } = useContext(AppContext);

    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);


    const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(currentPlayingVideo?.thumbnail); // State to hold the thumbnail preview

    const [videoUrlPreview, setVideoUrlPreviews] = useState<string | undefined>(currentPlayingVideo?.url); // State to hold the video preview

    // console.log("userId is ",userData);

    const { register, handleSubmit } = useForm<FormValues>();



    const onSubmit = async (data: FormValues) => {

        // if (!isLoggedIn) {

        //     router.push("/signin");

        // }


        console.log("data", data);

        const formData = new FormData();
        formData.append('description', data.description);
        formData.append('title', data.title);
        formData.append("userId", userData.id);
        formData.append('isAgeRestricted', data.isAgeRestricted.toString());
        data.VideoUrl[0] && formData.append('VideoUrl', data.VideoUrl[0]);
        data.thumbnail[0] && formData.append('thumbnail', data.thumbnail[0]);


        try {

            console.log("")

            const response = await updateExistingVideo(formData,);

            console.log('Response from server:', response);

        } catch (error) {

            console.error('Error creating video:', error);

        }
    };


    //  handler fro change in thumabnail


    const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log("file mai changes hua ");

        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {

                
                setThumbnailPreview(reader.result as string);

            };
            reader.readAsDataURL(file);
        }

    };


    // handler for change in video 


    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log("video file  mai changes hua ");

        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            console.log("fil is ",reader);

            reader.onload = () => {

                console.log("file ",reader.result as string)

                setVideoUrlPreviews(reader.result as string);
            };
            reader.readAsDataURL(file);

        }

    };



    function clickHandler() {


        setClickVideoCreate(false);

    }



    async function getVideo() {

        try {


            const videoId = window.location.pathname.split("/").pop();

            const video = await getVideoById(params.id);

            console.log("actual video ", video);

            setCurrentPlayingVideo(video?.data);


        } catch (error: any) {

            console.log(error.message);

        }

    }


    useEffect(()=>{


        getVideo();

        
    },[]);



    return (

        <div className="mt-20 relative flex justify-center items-center">

            <div className="relative flex flex-col border rounded-xl justify-center items-center m-auto">

                {/* <div className="flex justify-between items-center w-full border-b-2 border-slate-800 p-3">
                    <div className="text-white">
                        <p>upload a new Video</p>
                    </div>
                    <div onClick={clickHandler}>
                        <navbar.RxCross2 className="text-white font-bold text-2xl"></navbar.RxCross2>
                    </div>
                </div> */}

                <div className="rounded-2xl flex justify-center items-center p-3">

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[700px] h-[620px]"> {/* Pass onSubmit function to handleSubmit */}


                        <div className="flex gap-8">

                            <div className="w-[270px] h-[180px] bg-amber-600 rounded-2xl">
                                {/* Display video preview */}
                                <video src={videoUrlPreview || currentPlayingVideo?.url } controls className="w-full h-full bg-cover rounded-2xl" />
                                <input type="file" {...register("VideoUrl")} onChange={handleVideoChange} className="w-[100px] text-sm absolute left-0 top-0" />
                                
                            </div>


                            <div className=" relative w-[350px] bg-red-600 h-[250px] rounded-2xl">

                                 <img src={thumbnailPreview || currentPlayingVideo?.thumbnail } alt="Thumbnail Preview" className="w-full h-full bg-cover rounded-2xl" />

                                <input type="file" {...register("thumbnail")} onChange={handleThumbnailChange} className="w-[100px] text-sm absolute right-0 top-0" />


                            </div>

                        </div>


                        <div className="border-2 rounded-xl">

                            <input
                                {...register("title")}
                                defaultValue={currentPlayingVideo?.title}
                                placeholder="Enter the title for the video "
                                className="p-2 w-full rounded-xl bg-black font-bold outline-2 text-white"
                            />

                        </div>

                        <div className="border-2 rounded-xl">

                            <input
                                {...register("tags")}

                                placeholder="Enter the tags for the video  "
                                className="p-2 w-full rounded-xl bg-black font-bold outline-2 text-white"
                            />

                        </div>



                        <div className="flex border rounded-xl p-2 justify-between items-center">

                            <p className="text-white text-start font-bold pl-2">is Age Restricted</p>
                            <input type="checkbox" {...register("isAgeRestricted")} defaultChecked={currentPlayingVideo?.isAgeRestricted || false}  className="w-[30px] h-[30px]" />

                        </div>



                        <div className="rounded-xl h-auto">

                            <textarea
                                {...register("description")}
                                defaultValue={currentPlayingVideo?.description}
                                placeholder=" Enter the description for the video Description"
                                className=" min-h-[90px] w-full rounded-xl border bg-black font-bold outline-2 text-white p-3"
                            />

                        </div>



                        <div className="flex justify-center items-center" >

                            <button type="submit" className="text-white border p-2 w-[150px] rounded-xl" >save Changes</button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}





