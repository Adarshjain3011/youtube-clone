"use server"

import client from "@/db";

export async function createViews(videoId: string, userId: string, isLoggedIn: boolean) {

    try {

        console.log("is logged in ", isLoggedIn,userId,videoId);


        const findVideo = await client.video.findFirst({

            where: {

                id: videoId,

            }
        })

        // check if user logged in or not 

        if (isLoggedIn) {

            const isUserFirstTimeVisitsTheVideo = await client.viewsOnVideo.findFirst({


                where: {



                    userId: userId,
                    videoId: videoId,


                }
            })

            // if user first time visit the video

            if (isUserFirstTimeVisitsTheVideo === null) {

                // create the viewsOnvideo entry in table 

                console.log("ye inka first time video visit hai ")

                const newViewsOnVideo = await client.viewsOnVideo.create({


                    data: {

                        userId: userId,
                        videoId: videoId,

                    }

                })

            }


        }


        const updateViewsOnVideo = await client.video.update({


            where: {

                id: videoId,

            },
            data: {

                viewsCount: {

                    increment: 1,

                }
            }
        })


        return {

            sucess: 200,
            message: "sucessfully added views on the video ",
            data: updateViewsOnVideo,

        }



    } catch (error: any) {


        console.log(error.message);

        return {

            success: 400,
            message: "some error occurred while updating views on the  video",
            error: error.message,

        }

    }
}





