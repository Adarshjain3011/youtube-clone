
"use client";

import React, { useEffect } from 'react';

import {getAllUserSpecificWatchLater,deleteWatchLaterVideos} from "@/app/actions/watchLater";

import { useContext } from 'react';

import { AppContext } from '../AppContext';

export default function WatchLater(){


    const {

        userData, setUserData

    } = useContext(AppContext);


    async function getAllWatchLaterData(){

        try{

            let userId:string = userData?.data?.id;

            console.log("userId id is ",userId);

            const response = await getAllUserSpecificWatchLater(userId);

            console.log("reposne ka data watch later ke andar ",response.data);


        }catch(error:any){

            console.log(error.message);

        }

    }


    useEffect(()=>{

        getAllWatchLaterData();

    },[]);

    return (

        <div>

            <p className='text-white text-5xl'>hellow watch later </p>

        </div>
    )
}






