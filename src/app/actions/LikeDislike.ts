
"use server"

import client from "@/db";


export async function likeDislike_LikeHandler(videoId: string, userId: string) {


    try {


        // find the video  


        if(!videoId || !userId){

            return {

                success: 400,  // fot the unlike  the video 
    
                message: "all the filds are not fullfilled ",

            }

        }

        
        
        const isVideoExists = client.video.findUnique({
            
            where: {
                
                id: videoId,
                
            }
        })
        
        
        // check video exists with this video id or not 


        if (!isVideoExists) {

            return {

                sucess: 400,
                message: "no video is persent with this video id "

            }

        }



        const isUserExists = client.user.findUnique({

            where: {

                id: userId,

            }
        })


        // find the user

        // 1. check if the user already like the video 


        const isUserAlreadyLikeVideo = await client.likesOnVideo.findFirst({

            where: {

                userId: userId,
                videoId: videoId,

            }

        })



        // if isUserAlreadyLikeVideo is not found that means push the isUserAlreadyLikeVideo id ino the video like array field

        console.log("isUserAlreadyLikeVideo", isUserAlreadyLikeVideo);


        if (isUserAlreadyLikeVideo === null) {

            // User hasn't liked the video yet, so create a new like

            const likeVideo = await client.likesOnVideo.create({

                data: { userId: userId, videoId: videoId }

            });


            // upadte the like count on the video  by + 1

            const upadteVideo = await client.video.update({

                where: {

                    id: videoId,

                },
                data: {

                    likesCount: {

                        increment: 1,

                    }
                }
            })

            return {

                success: 201,
                message: "user sucessfully like the video ",
                data: upadteVideo,

            }


        } else {

            // User has already liked the video, so delete the like

            const deleLikesOnVideo = await client.likesOnVideo.delete({

                where: {

                    videoId_userId: {

                        userId: userId,
                        videoId: videoId,

                    }
                }

            });



            console.log("delete likes on the video ", deleLikesOnVideo);


            // upadte the like count on the video  by - 1 

            const upadteVideo = await client.video.update({

                where: {

                    id: videoId,

                },
                data: {

                    likesCount: {

                        decrement: 1,

                    }

                }
            })


            return {

                success: 202,  // fot the unlike  the video 

                message: "user sucessfully remove hte  like from the  video ",

                data: upadteVideo,

            }


        }

    } catch (error: any) {


        console.log(error.message);

        return {

            success: 400,  // fot the unlike  the video 

            message: "some error while handling like and dislike onto the video  ",
            error: error.message,

        }

    }
}








export async function likeDislike_DislikeHandler(videoId: string, userId: string) {

    try {

        // find the video  

        const isVideoExists = client.video.findUnique({

            where: {

                id: videoId,

            }
        })


        // is video exists or not 

        if (!isVideoExists) {

            return {

                sucess: 400,
                message: "no video is persent with this video id "

            }

        }



        // check user exists or not 

        const isUserExists = client.user.findUnique({

            where: {

                id: userId,

            }
        })



        // 1. check if the user already like the video 

        const isUserAlreadyLikeVideo = await client.likesOnVideo.findFirst({

            where: {

                userId: userId,
                videoId: videoId,

            }

        })



        // check user already dislike the video 

        const isUserAlreadyDisLikeVideo = await client.dislikesOnVideo.findFirst({

            where: {

                userId: userId,
                videoId: videoId,

            }

        })



        // con-1.user is not like and dislike the video 

        // (a) then create new dislikeonvideo update video dislikeCount field of video by + 1 

        if (isUserAlreadyLikeVideo === null && isUserAlreadyDisLikeVideo === null) {

            // User hasn't liked the video yet, so create a new Dislike 

            const dislikesOnVideo = await client.dislikesOnVideo.create({

                data: { userId: userId, videoId: videoId }

            });


            // upadte the Dislike count on the video  by + 1


            const upadteVideo = await client.video.update({

                where: {

                    id: videoId,

                },
                data: {

                    dislikesCount: {

                        increment: 1,

                    }
                }
            })




            return {

                success: 201,
                message: "user sucessfully add dislike on  the video ",
                data: upadteVideo,

            }


        } else {

            // con2 ->1) if user likes the video then 
            // (a) delete the like from the likesonVideo table
            // (b) upadte the like count on the video  by - 1 


            if (isUserAlreadyLikeVideo != null && isUserAlreadyDisLikeVideo === null) {

                // remove like from the video 

                const deleLikesOnVideo = await client.likesOnVideo.delete({

                    where: {

                        videoId_userId: {

                            userId: userId,
                            videoId: videoId,

                        }
                    }

                });


                // create a new Dislike 
                
                const dislikesOnVideo = await client.dislikesOnVideo.create({

                    data:{

                        userId:userId,
                        videoId:videoId,

                    }

                })


                // upadte the like count on the video  by - 1  and add one more +1 to the video dislike field 

                const updateVideo = await client.video.update({

                    where: {

                        id: videoId,

                    },
                    data: {

                        likesCount: {

                            decrement: 1,

                        },
                        dislikesCount:{

                            increment:1,

                        }

                    }
                })



                return {
    
                    success: 202,  // remove dislike from video 
    
                    message: "user sucessfully remove the likes from the video and add one dislike to the video ",
    
                    data: updateVideo,
    
                }

            }



            // user is not likes the video 

            else if (isUserAlreadyLikeVideo === null && isUserAlreadyDisLikeVideo !== null) {


                const deleteDisLikesOnVideo = await client.dislikesOnVideo.delete({

                    where: {

                        videoId_userId: {

                            userId: userId,
                            videoId: videoId,

                        }
                    }

                });

                // upadte the Dislike count on the video  by - 1 

                const updateVideo = await client.video.update({

                    where: {

                        id: videoId,

                    },
                    data: {

                        dislikesCount: {

                            decrement: 1,

                        }

                    }
                })

                return {
    
                    success: 203,  // remove dislike from video 
    
                    message: "user sucessfully remove dislike from the  video ",
    
                    data: updateVideo,
    
                }


            }


        }

    

    } catch (error: any) {


        console.log(error.message);
        
        return {

            success:400,
            message:"some error occurred while handling like and dislike video"

        }

    }
}






