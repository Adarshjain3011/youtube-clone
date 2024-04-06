
import React from "react";


interface Props {

    videoUrl: string;

}

export default function CommonVideoTemplate({ videoUrl }: Props) {


    return (


        <div className="w-full h-full relative">

            <video
                controls
                autoPlay
                className="relative w-full h-full bg-cover"
                style={{ width: "100%", height: "100%" }}
            >
                <source src={videoUrl} type="video/mp4" className="w-full h-full bg-cover" />

            </video>

        </div>


    )
}


