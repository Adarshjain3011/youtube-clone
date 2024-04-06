"use client"

import React, { useEffect } from "react";

import NavBar from "@/components/common/navbar/Navbar";


import axios from "axios";

import CreateVideoForm from "@/components/video/createVideoForm";

import { AppContext } from "@/app/AppContext";

import { useContext } from "react";

import { VideoDisplayReal } from "../videoDisplay/VideoDisplayer";

import { SideBar } from "@/constant/sidebarComponents/sideBarCompo";

import {getAllVideo} from "@/app/actions/createVideo";

export default function () {

    const { userData, setUserData, isLoggedIn, setIsLoggedIn,allVideos,setAllVideos } = useContext(AppContext);

    async function fetchAllVideos(){


        try{

            const response = await getAllVideo();

            console.log("respnse ka data ",response.data);

            setAllVideos(response?.data);


        }
        catch(error:any){

            console.log("error",error.message);
            
        }
    }



    useEffect(()=>{

        fetchAllVideos();

    },[]);


    return (

        <div className="relative w-full">

            <div className=" relative flex flex-wrap gap-4 overflow-x-hidden w-full overflow-y-auto">

                <VideoDisplayReal></VideoDisplayReal>

            </div>

        </div>

    )


}







