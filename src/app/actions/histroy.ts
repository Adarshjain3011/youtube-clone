"use server"

import client from "@/db";
export async function getUsersHistory(userId:string){

    try{
        

        if(!userId){


            return {

                status:400,
                message:"all fields are not fullfilled "

            }
        }



        const allHistroy  = await client.viewsOnVideo.findMany({

            where:{

                userId:userId,

            },include:{

                video:true
                
            }
        })
        

        console.log("all user histroy videos ",allHistroy);


        return {

            status:200,
            message:"user histroy found successfully",
            data:allHistroy

        }
        

    }catch(error:any){

        console.log(error.message);

        return {

            status:400,
            message:"some error occurred",
            error:error.message,

        }

    }
}