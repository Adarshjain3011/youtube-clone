
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken"

import client from "@/db";

export async function GET(req: NextRequest) {


    try {

        const tokenData = await getDataFromToken(req);

        if (tokenData === "") {

            return NextResponse.json({

                message: "invalid token ",


            }, { status: 400 });

        }

        // now find the user by using the token data 

        const user = await client.user.findFirst({

            where:{

                id:tokenData.id,

            }
        })

        if(!user){

            return NextResponse.json({

                message: "no user registor with token  id ",


            }, { status: 400 });

        }

        return NextResponse.json({

            message: "sucessfully fetch the user with  the token ",

            data:user,


        }, { status: 200 });


    }
    catch (error: any) {

        console.log(error.message);

        return NextResponse.json({

            message: "something wrong while getting adta from token  ",

            error:error.message

        }, { status: 400 });

    }
}



