
"use client"

import { navbar } from "@/constant/icons/icons";

import React from 'react';
import { useForm } from 'react-hook-form';
import { createNewVideo } from '@/app/actions/createVideo';

import { useContext } from "react";
import { AppContext } from "@/app/AppContext";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormValues {

    description: string;
    title: string;
    VideoUrl: FileList; // Change to FileList for multiple files or File for a single file
    isAgeRestricted: boolean;
    tags: string;
    thumbnail: FileList; // Change to FileList for multiple files or File for a single file
    userId: string;

}

export default function CreateVideoForm() {

    const router = useRouter();

    const {

        clickVideoCreate,
        setClickVideoCreate, userData,
        setUserData, isLoggedIn,
        setIsLoggedIn

    }
        = useContext(AppContext);


    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {

        // check the user is logged in or not 

        if (!isLoggedIn) {

            toast.error("you are not logged in")

            router.push("/signin");

        }

        console.log("new videon form ",data);


        // create a new form and append form values to it 

        const formData = new FormData();
        formData.append('description', data.description);
        formData.append('title', data.title);
        formData.append("userId", userData?.data?.id);
        formData.append("tags", data.tags);
        formData.append('isAgeRestricted', data.isAgeRestricted.toString());
        data.VideoUrl[0] && formData.append('VideoUrl', data.VideoUrl[0]);
        data.thumbnail[0] && formData.append('thumbnail', data.thumbnail[0]);

        try {

            const response = await createNewVideo(formData);

            toast.success("new video is created successfully");

            console.log('Response from server:', response);

            router.back();

        } catch (error) {

            console.error('Error creating video:', error);

        }
    };

    function clickHandler() {


        setClickVideoCreate(false);

    }

    return (

        <div className="mt-6 relative flex justify-center items-center">

            <div className="relative flex flex-col border rounded-xl justify-center items-center m-auto">

                <div className="flex justify-between items-center w-full border-b-2 border-slate-800 p-3">
                    <div className="text-white">
                        <p>upload a new Video</p>
                    </div>
                    <div onClick={clickHandler}>
                        <navbar.RxCross2 className="text-white font-bold text-2xl"></navbar.RxCross2>
                    </div>
                </div>

                <div className="rounded-2xl flex justify-center items-center p-3">

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[500px] h-[400px]"> {/* Pass onSubmit function to handleSubmit */}
                        <div className="border-2 rounded-xl">
                            <input
                                {...register("title")}
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
                        <div className="rounded-xl h-auto">
                            <textarea
                                {...register("description")}
                                placeholder=" Enter the description for the video Description"
                                className=" min-h-[90px] w-full rounded-xl bg-black font-bold outline-2 text-white p-3"
                            />
                        </div>
                        <label className="flex border rounded-xl p-2 justify-between items-center">
                            <p className="text-white text-nowrap capitalize font-bold pl-2">select the video for to Upload </p>
                            <input type="file" {...register("VideoUrl")} className="w-[100px]" />
                        </label>
                        <div className="flex border rounded-xl p-2 justify-between items-center">
                            <p className="text-white text-start font-bold pl-2">is Age Restricted</p>
                            <input type="checkbox" {...register("isAgeRestricted")} className="w-[30px] h-[30px]" />
                        </div>
                        <label className="flex border rounded-xl p-2 justify-between place-items-end">
                            <p className="text-white text-nowrap capitalize font-bold pl-2">create the thumbnail for the video </p>
                            <input type="file" {...register("thumbnail")} className="w-[100px]" />
                        </label>
                        <div className="flex justify-center items-center" >
                            <button type="submit" className="text-white border p-2 w-[150px] rounded-xl" >create video</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}





