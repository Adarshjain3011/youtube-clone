"use client"

import React from "react";

import { useEffect } from "react";

import { useState } from "react";

import axios from "axios";

import { getUserData } from "@/app/actions/user";

import { getAllPlaylists } from "./actions/playLists";

import { useContext } from "react";
import { AppContext } from "./AppContext";


export default function () {

  const { userData, setUserData } = useContext(AppContext);


  console.log("user data ", userData);


  // async function getPlaylists() {

  //   console.log("play list ke aadra ", userData);


  //   try {

  //     const response = await getAllPlaylists(userData.data.id);

  //     console.log(response.data);

  //   } catch (error: any) {

  //     console.log(error.message);

  //   }
  // }



  // useEffect(() => {


  //   getPlaylists();


  // }, []);


  return (


    <div>hellow </div>

  )

}