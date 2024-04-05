
// import { NextRequest,NextResponse } from "next/server";

// import ImageUploader from "@/helpers/ImageUploader";

// // import {} from "upload-file-to-cloudinary"

// export async function POST(req:NextRequest){

//     try{

//         console.log("hii");

//         const userData = await req.formData();

//         console.log(userData);

//         console.log("hellow");

//         const file = userData.get("file") as File;

//         // const arrayBuffer = await file.arrayBuffer();

//         // const buffer = new Uint8Array(arrayBuffer);

//         // console.log("file",file);

//         // const{de}

//         let uploadedImage = await ImageUploader(file);

//         return NextResponse.json({

//             message:"Uploaded image",
//             data: uploadedImage

//         },{status: 200});


//     }
//     catch(error:any){

//         console.log(error);

//         return NextResponse.json({

//             message:"Uploaded image",
//             error:error.message

//         },{status: 400});


//     }
// }


