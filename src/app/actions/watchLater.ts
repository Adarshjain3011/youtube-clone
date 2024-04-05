
"use server"

import client from "@/db";


export async function createWatchLater(videoId: string, userId: string) {


    try {

        console.log("videoId :", videoId, "userId :", userId);


        if (!videoId || !userId) {


            return {


                status: 400,
                message: "all fileds are not fullfilled "

            }

        }


        const isVideoExists = await client.video.findUnique({

            where: {

                id: videoId,

            }
        })

        if (!isVideoExists) {

            return {


                status: 400,
                message: "no video find with this video id  "

            }

        }

        // check if watch later alreay exists 

        const isWatchLaterExists = await client.watchLaterOnVideos.findFirst({

            
            where:{


                 videoId: videoId,
                userId: userId,

            }
        })


        if(isWatchLaterExists) {


            return{


                status:"201",
                message:"this video alreay present in the watchlist ",
                data:null,

            }
            
        }



        const newWatchLater = await client.watchLaterOnVideos.create({

            data: {

                userId: userId,
                videoId: videoId,

            }
        });


        return {

            status: 200,
            message: "new video added to the watch later ",
            data: newWatchLater,


        }



    } catch (error: any) {

        console.log(error.message);


        return {


            status: 500,

            message: "something went wrong  while creating the video from the watch later ",

            error: error.message,

        }

    }
}





export async function getAllUserSpecificWatchLater(userId: string) {

    try {

        if (!userId) {

            return {


                status: 400,
                message: "all fileds are not fullfilled "

            }

        }


        const watchLaterVideos = await client.watchLaterOnVideos.findMany({

            where: {

              userId: userId,

            },
            include: {
              video: {
                select: {
                  id: true,
                  title: true,
                  duration: true,
                  thumbnail: true,
                  createdAt: true,
                },

              },
            },
          });

            // Sort the watch later videos by the video's createdAt field in descending order

             watchLaterVideos.sort((a, b) => (b.video.createdAt > a.video.createdAt ? 1 : -1));


        return {


            success: true,
            message: "all watchlist vidoes find successfully ",
            data: watchLaterVideos,

        }


    } catch (error: any) {

        console.log(error.message);

        return {


            status: 500,

            message: "something went wrong  getting watch later videos  ",

            error: error.message,

        }

    }
}




export async function deleteWatchLaterVideos(videoId: string, userId: string) {


    try {

        if (!videoId || !userId) {

            return {


                status: 400,
                message: "all fileds are not fullfilled "

            }

        }


        const isVideoExists = await client.video.findUnique({

            where: {

                id: videoId,

            }
        })

        if (!isVideoExists) {

            return {


                status: 400,
                message: "no video find with this video id  "

            }

        }



        const newWatchLater = await client.watchLaterOnVideos.delete({

            where: {

                videoId_userId: {

                    videoId: videoId,
                    userId: userId,
                }

            }

        });


        return {

            status: 200,
            message: "watch later videos deleted successfully",
            data: null,

        }



    } catch (error: any) {

        console.log(error.message);

        return {


            status: 500,

            message: "something went wrong  while deleting the video from the watch later ",

            error: error.message,

        }

    }
}

