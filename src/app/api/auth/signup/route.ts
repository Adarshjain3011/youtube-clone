import client from "@/db";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


// import { sendEmail } from "@/helpers/mailer";

import {sendMail} from "@/helpers/mailer";


import { date } from "zod";

export async function POST(req: NextRequest) {

    try {
        const reqBody = await req.json();

        const { name, email, password } = reqBody;

        console.log(name, email, password);

        // all fildes required 

        if (!name || !email || !password) {


            return NextResponse.json(

                { error: "all the fields are not fullfilled " },
                { status: 400 }
            );

        }

        // Check if user already exists


        const isExists = await client.user.findUnique({

            where: {

                email: email,

            }

        });

        console.log(isExists);


        if (isExists && !isExists.isVerified) {

            console.log("hanji mai aaya ");

            return NextResponse.json(

                { message:"plz verify your email" },
                { status: 401 }
                
            );

        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Increase the salt rounds for better security


        // const tokenValue = await bcrypt.hash(email,6);


        // Create a new user

        const newUser = await client.user.create({

            data:{

                name: name as string,
                email: email as string,
                password: hashedPassword as string, // Store the hashed password
                userName:"@pik",
                profileImage:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`

            }

        });


        // const savedUser = await newUser.save();

        console.log(newUser);


        // send verfication email notification

        await sendMail(email, "VerifyEmail");

        return NextResponse.json({

            message: "User created successfully",
            success: 200,
            newUser,

        });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            {
                message: "Something went wrong while creating the user",
                error: error.message, // Include the error message in the response
            },
            { status: 500 }
        );
    }
}











