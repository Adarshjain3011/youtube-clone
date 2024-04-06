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


  return (


    <div>hellow </div>

  )

}



