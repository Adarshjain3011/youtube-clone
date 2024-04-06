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

                video:true,
                user:{

                    select:{

                        name:true

                    }
                }
                
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






export async function deleteVideoFromUserHistroy(videoId:string, userId:string){


    try{

        if(!videoId ||!userId){
            
            return {

                status:400,
                message:"all fields are not fullfilled "

            }

        }

        const deleteVideo = await client.viewsOnVideo.delete({


            where:{

                videoId_userId:{

                    videoId:videoId,
                    userId:userId

                }
            }
        }) 


        return {

            status:200,
            message:"video deleted fro histroy  successfully"

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





export async function deleteUserAllHistory(videoId:string, userId:string){


    try{

        if(!videoId ||!userId){
            
            return {

                status:400,
                message:"all fields are not fullfilled "

            }

        }

        const deleteVideo = await client.viewsOnVideo.deleteMany({


            where:{

                videoId:videoId,
                userId:userId,

            }

        }) 


        return {

            status:200,
            message:"all video cleared from History  "

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

