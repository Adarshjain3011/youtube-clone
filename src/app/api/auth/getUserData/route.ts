// import { NextRequest, NextResponse } from "next/server";
// import { auth, currentUser } from "@clerk/nextjs";

// import { PrismaClient } from "@prisma/client";

// // import connect from "@/db"

// const client = new PrismaClient();



// export  async function GET() {

//   try {

//     console.log("get user details ke andar ");

//     const { userId, getToken } = auth();
//     const user = await currentUser();

//     // const existingUser = await client.user.deleteMany({
//     //   where: {
//     //     email: user?.emailAddresses?.[0]?.emailAddress as string, // Replace with the email address you want to use
//     //   },
//     // });
    
//     // if (existingUser) {
//     //   // The email address is already in use, so display an error
//     //   throw new Error("Email address is already in use");

//     // }

//     console.log("current user ",user?.emailAddresses[0].emailAddress);

//     // const newUser = await client.user.create({

//     //   data: {

//     //     userName: user?.firstName + " " + user?.lastName,
//     //     // email: user?.emailAddresses[0].emailAddress

//     //     email: (user?.emailAddresses?.[0]?.emailAddress as string)?? "example@example.com",

//     //   },

//     // });

//     // console.log("new user ",newUser);

  


//     return NextResponse.json({

//       message:"user detail upadted  successfully",

//       data:"a"

//     },{status:200});


//   } catch (error:any) {

//     console.log(error);

//     return NextResponse.json({

//       message:"some error occurred while upadteing the user details ",
//       error:error.message

//     },{status:400});

//   }
// }



