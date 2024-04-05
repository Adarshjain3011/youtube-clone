"use client"

import React from "react";
import { useEffect,useState } from "react";

import {getUsersHistory} from "@/app/actions/histroy";

import { useContext } from "react";

import { AppContext } from "@/app/AppContext";

export default  function userHistroy(){


    const {userData,setUserData} = useContext(AppContext);

    async function getAllUserHistroy(){

        try{

            const userId = userData.data.id;

            console.log("user id is ",userData.data.id);

            const response = await getUsersHistory(userId);

            console.log(response?.data);


        }catch(error:any){


            console.log(error.message);

        }
    }

    useEffect(()=>{

        getAllUserHistroy();

    },[]);


    return (

        <div>

            <h1>welcome to histroy page </h1>

        </div>
    )
}



