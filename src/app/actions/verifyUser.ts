"use server"

import client from "@/db";

export async function verifyUser(token:any) {

    try {
        // Attempt to update the user with the given token

        console.log("token at verify user actions ",token);



        const finduser = await client.user.findFirst({

            where: {

                token: token,

            }

        });

        console.log("user found",finduser);

        const updatedUser = await client.user.update({

            where: {

                id:finduser?.id || "1"

            },
            data: {

                isVerified: true,
                token:null,
                

            }

        });

        if (updatedUser) {
            // User successfully updated, return true or any other success indicator
            return true;

        } else {
            // If no user was updated, the token might be invalid or expired
            console.log("No user found with the provided token.");
            return false;
        }
    } catch (error: any) {

        // Handle any errors that might occur during the update process

        console.error("Error verifying user:", error.message);

        return false;
    }
}




