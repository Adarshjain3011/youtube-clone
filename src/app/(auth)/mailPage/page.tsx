"use client"

import { navbar } from "@/constant/icons/icons";

export default function showInstruction(){

    function openGmail() {

        window.location.href = "https://mail.google.com";

    }

    return (

        <div className="flex justify-center items-center m-28">
            
            <div className="w-[450px] h-[270px] gap-3  bg-white flex flex-col justify-center items-center rounded-lg shadow-2xl">

                {/* icon */}

                <div>

                    <navbar.TbMailPin className="text-blue-500 text-3xl"></navbar.TbMailPin>

                </div>


                <h1 className="text-black text-2xl font-semibold capitalize">check Your Mail</h1>

                <p className="text-sm text-black/35 w-[300px] text-center">we sent mail to your gamil account for the account verification </p>
                
                <span className="text-sm text-blue-700 hover:underline" onClick={openGmail}>click here to reach to your gmail </span>

                {/* <p>check your mail</p> */}
                
                <button className="text-lg text-white font-bold border pl-5 pr-5 rounded-md bg-sky-500 p-1" onClick={openGmail}>click</button>

            </div>

        </div>


    )
}




