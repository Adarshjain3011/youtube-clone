
"use client"

import { getAllUserVideos } from "@/app/actions/createVideo";


import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/app/AppContext";

import toast from "react-hot-toast";

import { useRouter } from 'next/navigation';

import moment from "moment";

import { deleteSpecificVideo } from "@/app/actions/createVideo";

import { mycompo } from "@/constant/yourVideos/yourVideosCompo";

import { FaRegEdit } from "react-icons/fa";

import { MdDelete } from "react-icons/md";



export default function commonVideoCompo() {


    const router = useRouter();



    const { userData, setUserData, isLoggedIn, setIsLoggedIn } = useContext(AppContext);


    const [allUserVideos, setAllUserVideos] = useState<any | null>();


    const [loading, setLoading] = useState(false);



    async function getFullUserVideos() {

        try {

            if (isLoggedIn) {

                setLoading(true);

                console.log("get all videos ke andar ");

                console.log("user id is ", userData?.data?.id);

                let userId = userData?.data?.id;

                const response = await getAllUserVideos(userId);

                console.log(response?.data);


                setAllUserVideos(response?.data);

                setLoading(false);


            } else {

                toast.error("user is not logged in ");

                router.push("/signin");


            }




        } catch (error: any) {


            console.log(error.message);

        }
    }


    async function deleteVideo(videoId: string) {

        try {

            console.log("video id is ", videoId);

            console.log(userData);

            const response = await deleteSpecificVideo(videoId, userData.id);

            console.log("resposne ka data after delete ", response);


        } catch (error: any) {


            console.log(error.message);

        }
    }


    function moveToVideoUpdateHandler(id: string){



        console.log(id);

        router.push(`/updateVideoForm/${id}`);


    }


    useEffect(() => {


        getFullUserVideos();


    }, [])



    return (



        <div className="text-white relative w-full min-h-screen">


            {

                loading ? (<div className="text-3xl mt-24 text-white">

                    loading....

                </div>) : (


                    <div className="flex flex-col mt-3">


                        <div className=" flex w-full justify-evenly">

                            {

                                mycompo.map((data: any) => (

                                    <div className={`${data.bg}`}>

                                        <p className={`${data.gap} text-white font-bold text-xl`} >{data.title}</p>

                                    </div>

                                ))

                            }

                        </div>


                        <div className="pt-5">

                            {

                                allUserVideos?.map((data: any) => (


                                    <div className="flex border-b-2 gap-14 pt-6">


                                        <div className="flex flex-row gap-3">

                                            {/* first vidoe div  */}

                                            <div className="w-[160px] h-[100px] rounded-xl">

                                                <video src={data?.url} controls width={"100%"} height={"100%"} className="rounded-xl"></video>

                                            </div>

                                            {/* description title tags  */}

                                            <div className="w-[230px] ">

                                                <div>

                                                    <span className="text-xs text-wrap">{data?.title} { } tags </span>

                                                </div>

                                                <p className="text-xs text-warp">{data?.description}</p>

                                            </div>


                                        </div>



                                        {/* private public div  */}

                                        <div className="">

                                            <p className="text-xs text-start">Visible</p>

                                        </div>

                                        <div>


                                            {

                                                data.isAgeRestricted ? (<p className="text-xs">private</p>) : (<p className="text-xs">public</p>)

                                            }

                                        </div>

                                        <div>

                                            <p className="text-[9px]">{moment(data?.createdAt).format('MMMM Do YYYY')}</p>

                                        </div>

                                        <p className="text-xs">{data?.viewsCount} </p>

                                        <p className="text-xs ">{data?.likesCount}</p>


                                        <div className="pl-3">

                                            <FaRegEdit className="text-xl" onClick={()=>moveToVideoUpdateHandler(data.id)}></FaRegEdit>

                                        </div>

                                        {/* <div onClick={() => deleteVideo(data?.id)} className="text-xs text-start flex justify-center items-center"> */}

                                        <div>

                                            <MdDelete className="text-xl "></MdDelete>

                                        </div>

                                        {/* </div> */}

                                    </div>

                                ))

                            }


                        </div>

                    </div>
                )

            }

        </div>


    )
}




