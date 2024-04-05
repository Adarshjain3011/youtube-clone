
"use server"

import client from "@/db";
import { PlaylistVideoUncheckedCreateInput } from '@prisma/client';


export async function createPlaylist(title: string, userId: string) {

    try {

        if (!title || !userId) {

            return {


                status: 400,
                message: "all fileds are not fullfilled "

            }
        }

        // create new palylist 

        const newPlaylist = await client.playlist.create({


            data: {

                title: title,
                user: {

                    connect: {

                        id: userId,

                    }
                }

            }
        })



        console.log("new playlist ", newPlaylist);


        return {

            status: 200,
            message: "playlist created",
            data: newPlaylist

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


export async function getAllPlaylists(userId: string) {

    try {


        const allPlaylists = await client.playlist.findMany({


            where: {

                userId: userId,

            },


        })


        return {

            status: 200,
            message: "all user playlist fetch successfully ",
            data: allPlaylists,

        }



    } catch (error: any) {

        console.log(error.message);

        return {


            status: 500,

            message: "something went wrong  while getting the video from the watch later ",

            error: error.message,

        }
    }
}





// export async function updatePlaylist(videoId: string, playlistId: string) {
//     if (!videoId || !playlistId) {
//       return {
//         status: 400,
//         message: "All fields are not filled",
//       };
//     }

//     const isPlaylistExists = await client.playlist.findUnique({
//       where: {
//         id: playlistId,
//       },
//     });

//     if (!isPlaylistExists) {
//       return {
//         status: 400,
//         message: "No playlist exists with this playlist id",
//       };
//     }

//     try {
//       const newPlaylistData = await client.playlistVideo.create({
//         data: {
//           video: {
//             connect: {
//               id: videoId,
//             },
//           },
//           playlist: {
//             connect: {
//               id: playlistId,
//             },
//           },
//         },
//       });

//       return {
//         status: 200,
//         message: "Video added to the playlist successfully",
//         data: newPlaylistData,
//       };
//     } catch (error: any) {
//       console.log(error.message);

//       return {
//         status: 500,
//         message: "Something went wrong while adding video to the playlist",
//         error: error.message,
//       };
//     }
//   }


export async function addVideoToPlaylist(videoId: string, playlistId: string) {

    if (!videoId || !playlistId) {
        return {
            status: 400,
            message: "All fields are not filled",
        };
    }

    const isPlaylistExists = await client.playlist.findUnique({
        where: {
            id: playlistId,
        },
    });


    console.log("playlist exists ", isPlaylistExists);


    if (!isPlaylistExists) {
        return {
            status: 400,
            message: "No playlist exists with this playlist id",
        };
    }

    try {

        const isVideoAlreadyExistsInPlaylist = await client.playlistVideo.findUnique({

            where: {

                videoId_playlistId: {

                    videoId: videoId,
                    playlistId: playlistId

                }

            }
        })


        // is video already exists in the playlist


        if (isVideoAlreadyExistsInPlaylist) {


            return {

                status: 201,
                message: "Video already exists in the playlist",
                data:null

            }

        }


        // add video to the playlist 

        const newPlaylistData = await client.playlistVideo.create({

            data: {

                video: {
                    connect: {
                        id: videoId,
                    },
                },
                playlist: {

                    connect: {

                        id: isPlaylistExists.id,
                    },
                }
            }
        });



        console.log("new playlist data ", newPlaylistData);

        return {

            status: 200,
            message: " new Video added to the playlist successfully",
            data: newPlaylistData,

        };

    } catch (error: any) {
        console.log(error.message);

        return {
            status: 500,
            message: "Something went wrong while adding video to the playlist",
            error: error.message,
        };
    }
}








export async function deleteVideoFromPlaylist(videoId: string, playlistId: string) {

    if (!videoId || !playlistId) {
        return {
            status: 400,
            message: "All fields are not filled",
        };
    }

    const isPlaylistExists = await client.playlist.findUnique({
        where: {
            id: playlistId,
        },
    });


    console.log("playlist exists ", isPlaylistExists);


    if (!isPlaylistExists) {
        return {
            status: 400,
            message: "No playlist exists with this playlist id",
        };
    }

    try {

        const isVideoAlreadyExistsInPlaylist = await client.playlistVideo.findUnique({

            where: {

                videoId_playlistId: {

                    videoId: videoId,
                    playlistId: playlistId

                }

            }
        })


        // is video already exists in the playlist


        if (isVideoAlreadyExistsInPlaylist) {

            // then delete the video from the playlist

            const deletedEntry = await client.playlistVideo.delete({

                where: {

                    videoId_playlistId: {
                        videoId: videoId,
                        playlistId: playlistId
                    }
                }
            });

            return {

                status: 200,
                message: "Video deleted from playlist was successfully deleted",
                data:null

            }

        }

        return {

            status: 201,
            message: "this video does  not exists in the playlist",
            data:null

        };

    } catch (error: any) {
        console.log(error.message);

        return {
            status: 500,
            message: "Something went wrong while adding video to the playlist",
            error: error.message,
        };
    }
}






