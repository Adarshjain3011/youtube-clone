"use server"

import client from "@/db";

// import { auth } from "@clerk/nextjs";

// import { currentUser } from "@clerk/nextjs";


export async function getUserData() {

    try {

        // const { userId, getToken } = auth();
        // const user = await currentUser();

        // console.log("current user is ", user);

        // check if user is alreay exists 

        // const existingUser = await client.user.findFirst({

        //     where: {

        //         email: user?.emailAddresses?.[0]?.emailAddress as string, // Replace with the email address you want to use
        //     },

        // });

        // if (existingUser) {

        //     // this user is already exists 

        //     return {

        //         status: "400",
        //         message: "user alreay exists",
        //     };

        // }

        // if user is not found then create its entry to the database

        // const newUser = await client.user.create({

        //     data: {

        //         userName: user?.firstName + " " + user?.lastName,
        //         // email: user?.emailAddresses[0].emailAddress

        //         email: (user?.emailAddresses?.[0]?.emailAddress as string) ?? "example@example.com",

        //     },

        // })


        return {

            status: "200",
            message: "user entry sucessfully created in db ",
            data:"1"

        }



    }
    catch (err: any) {


        console.log(err.message);

        return {

            status: "400",
            message: "some error while getting user data",
            
        };

    }
}



