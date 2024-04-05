
import { NextRequest,NextResponse } from "next/server";

import jwt from "jsonwebtoken";

export async function getDataFromToken(req:NextRequest){

    try{

        let token = req.cookies.get('token')?.value || "";

        let decodedToken:any =  jwt.verify(token,process.env.jwt_secret  ||"");

        console.log("decodecoded token: " + decodedToken);

        return decodedToken
    

    }
    catch(error:any){

        console.log(error.message);

        throw new Error(error.message);

    }
}

