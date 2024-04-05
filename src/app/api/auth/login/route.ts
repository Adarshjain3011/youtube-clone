
import bcrypt from "bcrypt";

import client from "@/db";

import { NextRequest,NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export async function POST(req:NextRequest,res:NextResponse){

    try{

        let data = await req.json();

        const {email,password} = data;
        
        if(!email || !password){

            return NextResponse.json({

                messag:"all fileds are not fullfiled",
                success:400

            })

        }



        let isUserExists = await client.user.findFirst({

             where:{

                email:email,

             }
        })



        console.log("user exists  ",isUserExists);

        // check user exists or not 

        if(!isUserExists){


            return NextResponse.json({

                 messag:"user not exists",
                 status:400

            })
        }

        if(isUserExists.isVerified === false){


             return NextResponse.json({

                messag:"user is not verified ",
                status:401

           })

        //    return NextResponse.redirect("/signin");
        

        }


        // now compare the passowrd of both of them 


        const isPasswordMatch = await bcrypt.compare(password,isUserExists?.password as string);

        if(!isPasswordMatch){


            NextResponse.json({

                status:400,
                message:"password mismatch",

            })

        }

        // is password match then  create the token 

        let tokenData ={

            id:isUserExists?.id,
            email:isUserExists?.email

        }

        const token =  jwt.sign(tokenData,process.env.jwt_secret as string,{

            expiresIn:"24h",

        })

        const response = NextResponse.json({
            message: "Authentication successful",
            status: 200
        });


        console.log("");

        response.cookies.set("token", token, {

            httpOnly: true,

        });

        return response;


    }
    catch(error:any){

        console.log(error.message);

        return NextResponse.json({

            status:400,
            message:"error occur while during login",
            error:error.message,

        })

    }
}