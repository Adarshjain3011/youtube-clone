"use server"

import client from "@/db";

import bcrypt from "bcrypt";

export async function Singup(name:string,email:string,password:string){

    try{

        console.log(name ,email ,password);

        // const result = await client.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)",[name,email,password]);


        if(!name || !email || !password){

            return {

                success:400,
                message:"all the details are  not fullfiled "

            }

        }

        const isUserExists = await client.user.findFirst({

            where:{

                email:email

            }

        })

        // check if user exists 

        if(isUserExists){

            return {

                success:400,
                message:"this user id is already exists"

            }
        }

        // hash password 

        let hashedPassword = await bcrypt.hash(password,10);

        // insert data into users table

        const newUser = await client.user.create({

            data:{

                name:name,
                email:email,
                password:hashedPassword,
                userName:"random"
            }

        })

        return {

            data:newUser,
            message:"user etry successfully created in DB ",
            success:200,

        }



    }
    catch(error:any){


        console.log(error.message)

        return {

            success:false,
            message:"some error occurred while signup ",
            error:error.message

        }

    }
}









export async function Login(name:string,email:string,password:string){

    try{

        console.log(name ,email ,password);

        // const result = await client.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)",[name,email,password]);


        if(!name || !email || !password){

            return {

                success:400,
                message:"all the details are  not fullfiled "

            }

        }

        

        const isUserExists = await client.user.findFirst({

            where:{

                email:email

            }

        })

        // check if user exists 

        if(isUserExists){

            return {

                success:400,
                message:"this user id is already exists"

            }
        }

        // hash password 

        let hashedPassword = await bcrypt.hash(password,10);

        // insert data into users table

        const newUser = await client.user.create({

            data:{

                name:name,
                email:email,
                password:hashedPassword,
                userName:"random"
            }

        })

        return {

            data:newUser,
            message:"user etry successfully created in DB ",
            success:200,

        }



    }
    catch(error:any){


        console.log(error.message)

        return {

            success:false,
            message:"some error occurred while signup ",
            error:error.message

        }

    }
}




export async function getUserById(id:string){

    try{

        const user = await client.user.findUnique({

            where:{

                id:id,

            }
        })

        if(!user){

            return {

                success: false,
                message:"no user found with this user id "

            }
        }

        return {

            success: true,
            message:"found user with this user id",
            data: user

        }

    }catch(error:any){

        console.log(error.message);

        return {

            success: false,
            message:"thier is soemthing error while found user with this user id ",
            error:error.message,

        }

    }
}






