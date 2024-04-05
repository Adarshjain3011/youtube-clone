"use server"

import client from "@/db";

export async function SubscribeUnsubscribeHandler(currentUserId: string, channelId: string) {

    try {


        let isChannelExists = await client.user.findUnique({

            where: {

                id: channelId,

            }

        })

        // check if the there is a channel exists with this gievn user channel id 

        console.log("isChannelExists", isChannelExists);

        if (!isChannelExists) {

            return {

                success: 400,
                message: "this channel does not exist with this channel id "

            }

        }


        // console.log("channel exists", isChannelExists.subscribesTo.length);




        let findUser = await client.user.findFirst({

            where: {

                id: currentUserId,

            },include:{

                subscribesTo:{

                    where:{

                        id:channelId,
                        
                    }
                }
            }

        })

        console.log("find user ",findUser);

        // console.log("length of subscribeTo",findUser?.subscribesTo.includes)

        // console.log("check",findUser?.subscribersTo.includes(currentUserId))



        const isUserAlreadySubscribed = findUser?.subscribesTo.find((user: any) => user.id === channelId);


        //  if check  user already suscribed to the  channel then we prefrom two operations

        // 1. remove that user from subscribesTo fields and upadte the  subscriber field of user Channel 
        // 2. decrease the subscribers of user Channel


        if(isUserAlreadySubscribed) {

            console.log("ya user is already subscribed")

            //remove that user from subscribesTo fields of current user 

            const updateUser = await client.user.update({

                where: {

                    id: currentUserId

                },
                data: {

                    subscribesTo: {

                        disconnect: {

                            id: channelId

                        }

                    }
                }
            })

        //     //upadte the  subscriber field of user Channel and decrease the subscribers of user Channel

            const upadteChannelUser = await client.user.update({

                where: {

                    id: channelId,

                },
                data: {

                    subscribersCount: {

                        decrement: 1,

                    },
                    subscribers: {

                        disconnect: {

                            id: currentUserId
                        }
                    }
                }


            })


            console.log("upadteChannelUser",upadteChannelUser);

        //     // sucessfully return the response 

            return {

                success: 201, // for unsubscribe 
                message: "your are sucessfully unsubscribed the cahannel ",
                data: upadteChannelUser,

            }



        } else if(isUserAlreadySubscribed === undefined) {


            console.log("hellow guys ")

            //add  that Channel  to the  subscribesTo fields of current user 

            const updateUser = await client.user.update({

                where: {

                    id: currentUserId

                },
                data: {

                    subscribesTo: {

                        connect: {

                            id: channelId

                        }

                    }
                }


            })



            //upadte the  subscriber field of user Channel and decrease the subscribers of user Channel

            const upadteChannelUser = await client.user.update({

                where: {

                    id: channelId,

                },
                data: {

                    subscribersCount: {

                        increment: 1,

                    },
                    subscribers: {

                        connect: {

                            id: currentUserId
                        }
                    }
                }


            })



            // sucessfully return the response 

            return {

                success: 202, // for subscribe 
                message: "your are sucessfully subscribed the cahannel ",
                data: upadteChannelUser,

            }

        }


    }

    catch (error: any) {


        console.log(error.message);

        return {

            message: "their is something error while handling suscribe and unsusCribe",
            error: error.message

        }

    }
}




