
"use client"

import React from 'react';

import { useForm } from 'react-hook-form';

import { Singup } from "@/app/actions/auth";

import axios from 'axios';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

export default function SignupPage() {

  const router = useRouter();

  interface userForm {

    name: string;
    email: string;
    password: string;

  }


  const { handleSubmit, register } = useForm<userForm>();

  const onSubmit = async (data: userForm) => {


    console.log("formadata at the client side ", data);

    try {

      const newUser = await axios.post("/api/auth/signup", data);


      console.log("new created user data ",newUser.data);

      toast.success("signin sucessfully");
      
      router.push("/mailPage");


    } catch (error: any) {

      console.log("error mail aa gaya ");

      console.log(error.message);

      toast.error("user is not verified ");

      if (error.status === 401) {

        console.log("hoo");


      }

    }


  }

  return (

    <div className=" min-h-screen flex justify-center items-center ">

      <div className="rounded-2xl flex justify-center items-center p-6 border shadow-2xl">

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

          <div className="border-2 rounded-xl">

            <input
              {...register("name")}
              placeholder="Enter your Name "
              className="p-2 w-full rounded-xl bg-black font-bold outline-2 text-white"
            />

          </div>

          <div className="border-2 rounded-xl">

            <input
              {...register("email")}
              placeholder="plz enter your email "
              className="p-2 w-full rounded-xl bg-black font-bold outline-2 text-white"
            />

          </div>


          <div className="border-2 rounded-xl">

            <input
              {...register("password")}
              placeholder="Enter your Password "
              className="p-2 w-full rounded-xl bg-black font-bold outline-2 text-white"
            />

          </div>

          <div className="flex justify-center items-center">

            <button type="submit" className="text-white border p-2 w-[150px] rounded-xl">Sign up</button>

          </div>

          <Link href="/login">

            <p className='text-blue-500 text-xs hover:underline'>click here to move login <span className='text-white text-xl font-bold'>→</span> </p>

          </Link>

        </form>

      </div>

    </div>

  );

}



