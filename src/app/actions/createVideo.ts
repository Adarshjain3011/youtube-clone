
"use server"

import client from "@/db";
import { formToJSON } from "axios";
import { any, boolean, string } from "zod";

import { ImageUploader } from "@/helpers/ImageUploader";

import { number } from "zod";


// import { currentUser } from "@clerk/nextjs";



function formatDuration(durationInSeconds: any) {

    // Ensure duration is a number
    const duration = Number(durationInSeconds);

    if (isNaN(duration)) {
        return 'Invalid duration'; // Handle invalid input
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    // Format the output with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toFixed(2).padStart(5, '0'); // Display seconds with two decimal places

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

}




export async function createNewVideo(body: any) {


    try {

        // convert the data into JSON fromat 

        const { title, thumbnail, VideoUrl, isAgeRestricted, description, userId,tags } = formToJSON(body);

        console.log(title, thumbnail, VideoUrl, isAgeRestricted, description, userId,tags);


        // find the current user 

        const existingUser = await client.user.findFirst({

            where: {

                id: userId, // Replace with the email address you want to use

            },

        });


        console.log("existing user ", existingUser);

        let videoUrl: string;

        let duartion:string;

        let thumbnailUrl:string;

        let videoDuration:string;


        // now we to upload the video and thumbnail to cloudinary to get its url 

        // =================uploading thumbanail and video ==========================

        let response:any = await ImageUploader(VideoUrl);

        videoUrl = response?.secure_url;

        videoDuration = response?.duartion;

        let response2:any = await ImageUploader(thumbnail);

        thumbnailUrl = response2.secure_url;

        // ===================================================================

        let age: boolean = isAgeRestricted === "true" ? true : false;

        let newTitle: string = title || "";

        let newDescription: string = description || "";

        videoDuration = formatDuration(videoDuration);

        let allTags = tags.split(",");

        // now we to create the new video data 

        const videoData = {

            duration: videoDuration,
            title: newTitle,
            description: newDescription,
            tags:allTags,
            isAgeRestricted: age,
            url: videoUrl,
            thumbnail: thumbnailUrl,
            userId:userId,
            
        }

        // create the new video 

        const newVideo = await client.video.create({ data: videoData });

        console.log("new video in db", newVideo);


        // update exitingUser with the new video which is created by user  

        const upadtedUser = await client.user.update({

            where: { id: userId },
            data: {
                videos: {

                    connect: [{ id: newVideo.id }], // Push the newly created video into the authoredVideos array

                },
            },
        });

        console.log("updated user", upadtedUser);

        let responseData: any = {

            status: "200",
            message: "video is created successfully",
            data:upadtedUser,

        }

        // successfully return the resposne 

        return responseData;

    }


    catch (error: any) {

        console.log(error.message);

        let responseData: any = {

            status: "400",
            message: "some error occur while creating the video ",
            error: error.message,

        };

        return responseData;

    }
}




export async function getAllVideo() {

    try {

        // fetch all the video 

        console.log("all videos ");
        // Fetch all videos with user information
        const allVideo = await client.video.findMany({

            include: {

                user: {

                    select: {

                        id: true,
                        name: true,
                        profileImage:true,

                    }
                }
            },
        });

        console.log("all video of database ", allVideo);

        return {

            message: "all videos fetch successfully",
            data: allVideo,
            status: "200"
        }

    }
    catch (error: any) {

        console.log(error.message);

        return {

            status: "400",
            message: "some error occur while fetching the video ",
            error: error.message,

        }
    }
}






export async function getVideoById(id: string) {

    try {

        const findVideo = await client.video.findUnique({

            where: {

                id: id,

            }
        })


        if (!findVideo) {

            return {

                success: false,
                message: "no video found with this video id "

            }
        }

        return {

            success: true,
            message: "found video with this video id",
            data: findVideo

        }

    } catch (error: any) {

        console.log(error.message);

        return {

            success: false,
            message: "thier is soemthing error while found video  with this video id ",
            error: error.message,


        }
    }
}







export async function deleteSpecificVideo(videoId: string, userId: string) {


    try {

        console.log(videoId, userId);

        if (!videoId || !userId) {

            return {

                success: 400,
                message: "all fields are not fullfiled  ",

            }

        }

        console.log(" video Id is  ", userId);


        // Delete the viewsOnVideo records associated with the video
        await client.viewsOnVideo.deleteMany({

            where: {

                videoId,

            },

        });

        // Delete the likesOnVideo and dislikesOnVideo records associated with the video
        await client.likesOnVideo.deleteMany({

            where: {

                videoId,
            },

        });

        await client.dislikesOnVideo.deleteMany({

            where: {

                videoId,
            },

        });



        // delete video from palylists 

        await client.playlistVideo.deleteMany({

            where: {

                videoId: videoId,

            },
        });


        // Delete the video itself
        const existingVideo = await client.video.delete({

            where: {

                id: videoId,
                userId,

            },
        });

        console.log("deleted video ", existingVideo);


        return {

            success: 200,
            message: "video is  deleted successfully",
            data: existingVideo

        }


    }
    catch (error: any) {

        console.log(error.message);

        return {

            success: false,
            message: "some error occur while deleting the video ",
            error: error.message,

        }
    }

}









export async function getAllUserVideos(userId: string) {

    try {


        const AllVideos = await client.video.findMany({

            where: {

                id: userId,

            }
        })

        if (!AllVideos) {


            return {


                status: 400,
                message: "no videos found with this userId "

            }
        }


        return {


            status: 200,
            message: "user ALl Videos fetch sucessfully ",

            data: AllVideos

        }


    }
    catch (error: any) {


        console.log(error.message);

        return {

            status: 400,
            message: "some error while ftching the user videos  ",
            error: error.message,


        }
    }
}







export async function UpdateVideo(body: any) {


    try {

        // convert the data into JSON fromat 

        console.log("upadte video ke andar")

        console.log("body ka data ",body);

        const { title, thumbnail, VideoUrl, isAgeRestricted, description, userId, videoId,tags } = formToJSON(body);

        console.log(title, thumbnail, VideoUrl, isAgeRestricted, description, userId,tags);


        // find current user 

        if(!videoId || !userId ){


            return {

                status:400,
                message:"all fields are not fullfilled "

            }
        }

        // check the user exists or not 

        const existingUser = await client.user.findFirst({

            where: {

                id: userId, // Replace with the email address you want to use
            },

        });


        console.log("existing user ", existingUser);


        // is video Exists with this video Id 

        const isVideoExists = await client.video.findUnique({

            where: {


                id: videoId,

            }
        })



        if (!isVideoExists) {

            return {

                status: 400,
                message: "no video found with this video id "

            }
        }




        // now we to upload the video and thumbnail to cloudinary to get its url 

        // =================uploading thumbanail and video ==========================

        let newVideoUrl:string; 
        let newThumbnailUrl:string;
        let newVideoDuration: string;

        // check if video is not updated 

        if (isVideoExists.url === VideoUrl) {

            newVideoUrl = VideoUrl as string;
            newVideoDuration = isVideoExists?.duration;

        }
        else {

            let response:any = await ImageUploader(VideoUrl);

            newVideoUrl = response?.secure_url;

            newVideoDuration = response?.duration;
            
        }

        // check if thumbnail of the video is updated  or not 

        if (isVideoExists.thumbnail === thumbnail) {

            newThumbnailUrl = thumbnail;

        }
        else {

            let response:any = await ImageUploader(thumbnail);

            newThumbnailUrl = response?.secure_url;

        }


        // ===================================================================

        let age: boolean = isAgeRestricted === "true" ? true : false;

        let newTitle: string = title || "";

        let newDescription: string = description || "";

        let currentUserId = existingUser?.id ;

        let allTag = tags.split(',');

        console.log("all tags are " , allTag);

    //========================================================================  = 

        // now we form to upadte the video 

        const videoData = {

            duration: newVideoDuration,
            title: newTitle,
            description: newDescription,
            isAgeRestricted: age,
            url: newVideoUrl,
            tags:allTag,
            thumbnail: newThumbnailUrl,
            userId: currentUserId

        }

        console.log("video data is ",videoData);

        
        
        // update the video 

        const updatedVideo = await client.video.update({

            where:{

                 id: videoId,
                 userId:userId,

            },
            data:videoData,

        })

        console.log("newly updated video",updatedVideo);

        // successfully return the resposne 

        return {

            status:200,
            message:"video updated sucessfully ",
            data:updatedVideo,

        }


    }


    catch (error: any) {

        console.log(error.message);

        let responseData: any = {

            status: "400",
            message: "some error occur while updating the  the video ",
            error: error.message,

        };

        return responseData;

    }
}





// search the video by using text 


export async function searchVideos(text: string) {

    try {

        const searchTerm = `%${text}%`; // create a search term with wildcards

        if (!text) {

            return {


                status: 400,
                message: "all fields are not fullfiled  ",

            }
        }



        const videos = await client.video.findMany({

            where: {
                title: {
                    contains: searchTerm, // match the search term in the title field
                    mode: 'insensitive', // case-insensitive search
                },
            },
        });


        return {

            status: 200,
            message: "searched videos fetch successfully",
            data: videos

        }

    } catch (error: any) {


        console.log(error.message);


        return {

            status: 400,
            message:"while fetching videos error occur ",
            error: error.message,

        }

    }
}






