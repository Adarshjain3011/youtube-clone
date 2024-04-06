// 'use client' is not needed in a Next.js application, assuming this is for Vercel deployment. 

"use client"

import React, { createContext, useState,useEffect} from 'react';

import axios from 'axios';

import { getAllVideo } from "@/app/actions/createVideo";

import { getAllPlaylists } from './actions/playLists';

// Define the context
export const AppContext = createContext<any>({});

// import {deleteUser} from "@/app/actions/deleteUserAndVideos";

// Define the ThemeProvider component
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    // State for storing all videos
    const [allVideos, setAllVideos] = useState<any | null>(null);
    // State for user data
    const [userData, setUserData] = useState<any | null>(null);

    const[clickVideoCreate,setClickVideoCreate] = useState(false);

    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const [threeLineButtonCliked,setThreeLineButtonCliked] = useState(false);
    
    const [currentPlayingVideo,setCurrentPlayingVideo] = useState(null);

    const [currentPlayingVideoUser,setCurrentPlayingVideoUser] = useState(null);

    const [playlistData,setAllPlaylistData] = useState(null);

    const [historyData, setHistroyData] = useState(null);
    



    async function verifyUserWithToken() {

        try {

            if(isLoggedIn){

                return;
            }

            const response = await axios.get("/api/auth/getDataFromToken");

            console.log(response.data);
            
            setUserData(response.data);


            setIsLoggedIn(true);


        } catch (error:any) {


            setIsLoggedIn(false);

            console.error("Error verifying user with token:", error.message);

        }
    }



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



    async function getPlaylists(){

        console.log("play list ke aadra ",userData);


        try{

            // await verifyUserWithToken();

            const response = await axios.get(`/api/playlist/getAllPlaylist?userId=${userData.data.id}`);

            console.log(response.data);

        }catch(error: any) {

            console.log(error.message);

        }
    }




    useEffect(()=>{
        

        // fetchAllVideos();

        verifyUserWithToken();


    },[]);


    // Value object to be provided to the context
    const value = {

        allVideos,
        setAllVideos,
        userData,
        setUserData,
        verifyUserWithToken,
        clickVideoCreate,
        setClickVideoCreate,
        isLoggedIn,
        setIsLoggedIn,
        threeLineButtonCliked,
        setThreeLineButtonCliked,
        currentPlayingVideo,
        setCurrentPlayingVideo,
        playlistData,
        setAllPlaylistData,
        historyData, setHistroyData

    };

    // Render the context provider with children

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}






