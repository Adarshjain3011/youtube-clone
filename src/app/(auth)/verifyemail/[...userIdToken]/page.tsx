
"use client"

import React from "react";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { verifyUser } from "@/app/actions/verifyUser";

import toast from "react-hot-toast";

import { navbar } from "@/constant/icons/icons";

export default function VerifyEmail() {

    const router = useRouter();

    async function verifyYourUser() {

        try {


            const token: string = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1].split("=")[1];

            const isVerify = await verifyUser(token);


            if (isVerify) {

                toast.success("user is successfully verified");

                router.push("/login");

            }

            else {

                toast.error("something went wrong");

            }


        }
        catch (error: any) {

            console.log(error.message);

        }

    }


    return (

        <div className="flex justify-center items-center mt-28">

            <div className="w-[450px] h-[270px] gap-3  bg-white flex flex-col justify-center items-center rounded-lg shadow-2xl">

                {/* icon */}

                <div>

                    <navbar.TbMailPin className="text-blue-500 text-3xl"></navbar.TbMailPin>

                </div>


                <h1 className="text-black text-2xl font-semibold capitalize">Verify Your Email</h1>

                <p className="text-sm text-black/35 w-[300px] text-center">click below  for your gamil account account verification </p>

                {/* <span className="text-sm text-blue-700 hover:underline">click here to reach to your gmail </span> */}

                {/* <p>check your mail</p> */}

                <button className="text-lg text-white font-bold border pl-5 pr-5 rounded-md bg-sky-500 p-1" onClick={verifyYourUser}>VerifyEmail</button>

            </div>

        </div>
    )

}




