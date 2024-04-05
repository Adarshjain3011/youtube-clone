import { createPlaylist } from "@/app/actions/playLists"
import { useContext, useState } from "react";
import { AppContext } from "@/app/AppContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {

    isPlaylistButtonClicked: boolean;
    setPlayListButtonClicked: (value: boolean) => void;
}


export default function createPlaylistManager({ isPlaylistButtonClicked, setPlayListButtonClicked }: Props) {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn, userData, setUserData, playlistData, setAllPlaylistData } = useContext(AppContext);
    const [titleText, setTitleText] = useState("");

    async function createPlaylistHandler() {

        try {

            if (!isLoggedIn) {
                toast.dismiss("You are not logged in");
                router.push("/login");
                return;
            }

            const response = await createPlaylist(titleText, userData.data.id);

            console.log("created playlist", response.data);

            toast.success("New playlist created successfully");

            setAllPlaylistData([...playlistData, response.data]);

            setPlayListButtonClicked(false);

        } catch (error: any) {

            console.log(error.message);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center gap-4 sticky bottom-0 border-t-2 border-gray-700 pt-3">
                <div className="w-full h-9 rounded-lg">
                    <input type="text" placeholder="Enter text" className="w-full h-full rounded-lg pl-3 p-2 bg-slate-900 text-white border" onChange={(e) => setTitleText(e.target.value)} />
                </div>
                <div className="text border rounded-md p-1">
                    <p className="text-center text-white font-bold" onClick={createPlaylistHandler}>Create Playlist</p>
                </div>
            </div>
        </div>
    )
}
