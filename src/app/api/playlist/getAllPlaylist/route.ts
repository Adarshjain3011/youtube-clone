
import client from "@/db";

import { NextRequest,NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export async function GET(req:NextRequest){

    try{

        // const url = req.nextUrl;
        // const { searchParams } = url;
        // let userId :string = searchParams.get("userId") || "";

        let token = req.cookies.get('token')?.value || "";

        let decodedToken:any =  jwt.verify(token,process.env.jwt_secret  ||"");

        console.log("token data is ",decodedToken);

        console.log("userId at backend ",);

        let userId:string = decodedToken?.id;

        const allPlaylists = await client.playlist.findMany({


            where:{

                userId:userId,

            },


        })


        return NextResponse.json({

            status:200,
            message:"user all playlist fetch successfully ",
            data:allPlaylists,

        });



    }catch(error:any){

        console.log(error.message);

        return NextResponse.json({


            status:500,

            message:"something went wrong  while getting the video from the watch later ",

            error:error.message,
            
        });
    }
}





