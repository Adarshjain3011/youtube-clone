
import { useContext } from "react"
import { AppContext } from "@/app/AppContext"

import { navbar } from "@/constant/icons/icons"


export function CommonVideoDisplay() {

    const { currentPlayingVideo, userData,currentPlayingVideoUser } = useContext(AppContext);

    console.log("cutrrentPlayingVideo ", currentPlayingVideo);


    return (

        <div>

            {/* <video width="320" height="240" controls autoPlay preload="none">

                <source src={currentPlayingVideo?.url} type="video/mp4" />

            </video> */}

            <div className="flex flex-col w-[770px] rounded-md shadow-2xl gap-3">


                {/*  video running part  */}


                <div className="realtive w-full h-[370px] border rounded-lg">

                    <video
                        controls
                        autoFocus

                        className="relative w-full h-full bg-cover"
                        style={{ width: "100%", height: "100%" }}
                    >
                        <source src={currentPlayingVideo?.url} type="video/mp4" className="w-full h-full bg-cover" />

                    </video>

                </div>


                {/* video title  */}

                <div>

                    <p className="text-white capitalize font-bold">

                        {currentPlayingVideo?.title}

                    </p>

                </div>



                {/*  */}

                <div className="flex justify-between items-center">

                    {/* first part  */}

                    <div className="flex gap-3">

                        {/* userImage */}

                        <div className="w-[40px] h-[40px] text-white rounded-full">

                            <img src="" alt="" className="w-full h-full bg-cover rounded-full" />

                        </div>

                        {/*  channel name and suscribers  */}

                        <div className="flex flex-col">

                            {/* <h1 className="text-white">{userData.name}</h1>  */}

                            <h1 className="text-white"> Adarsh </h1>

                            <p className="text-white/50 text-xs">123 <span className="text-sm text-white/50">suscribers</span></p>

                        </div>

                        {/* suscribe button  */}

                        <div className="bg-white rounded-full  w-[100px] h-8 flex justify-center items-center">

                            <p className="font-semibold">Suscribe</p>

                        </div>


                    </div>

                    {/* second part  */}

                    <div className="flex gap-3">

                        {/* 2.1 like dislike  */}

                        <div className="flex border justify-evenly  items-center rounded-full w-[150px] h-8 p-1 bg-[#5656566f]">

                            <div className="flex gap-2 justify-center items-center w-full rounded-l-full hover:bg-[#616161]">

                                <div className=" relative flex justify-center items-center">

                                    <navbar.GrLike className="text-white/85"></navbar.GrLike>

                                </div>

                                {/* <div className="text-white/85 flex justify-center items-center p-1"> */}
                                    
                                    <p className="text-center text-white">


                                        {currentPlayingVideo?.likesCount}

                                    </p>

                                {/* </div> */}

                            </div>


                            <div className="relative flex justify-center items-center rounded-r-ful border-l-2 w-full hover:bg-[#616161]">
                                
                                <navbar.GrDislike className="text-white/85"></navbar.GrDislike>

                            </div>

                        </div>

                        {/* 2.2  share button */}

                        <div className="flex justify-evenly items-center border rounded-full w-[100px] h-8 p-1 bg-[#5656566f] hover:bg-[#616161]">

                            <navbar.FaShare className="text-white"></navbar.FaShare>

                            <p className="text-white">share</p>
                         
                        </div>


                        {/* 2.3  download */}

                        <div className="flex justify-evenly items-center border rounded-full w-[120px] h-8 p-2 bg-[#5656566f] hover:bg-[#616161]">

                            <navbar.LiaDownloadSolid className="text-white"></navbar.LiaDownloadSolid>

                            <p className="text-white capitalize">download</p>
                         
                        </div>

                        {/* 2.4  three dots div */}

                        <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#5656566f] hover:bg-[#616161]">

                            <navbar.HiDotsHorizontal className="text-white text-lg></navbar.HiDotsHorizontal"/>

                        </div>

                    </div>

                </div>


                {/* video description  */}

                
                <div className="bg-[#5656566f] h-9 w-full rounded-md p-2">

                    {/* views time tags  */}

                    <div className="flex gap-3">

                        <p className="font-bold text-white/75 text-sm">{currentPlayingVideo?.viewsCount}<span> views</span></p>

                        <p className="font-bold text-white/75 text-sm"><span>4 hours ago</span></p>

                        <p className="font-medium text-blue-600 text-sm"><span>#IRAN #PAKISTAN #INDIA</span></p>
         
                    </div>

                </div>


            </div>

        </div>

    )
}