import { GlassesIcon } from "lucide-react";

export default function Navbar() {

    return (
        <div className="flex flex-row justify-center w-full border rounded-md">
            <div className="flex flex-row justify-center py-2">
                <div className="flex justify-center items-center gap-2 border rounded px-2 py-1 w-80 opacity-40">
                    <input
                        type="text"
                        placeholder="Search"
                        className="outline-none w-full"
                    />
                    <GlassesIcon />
                </div>
            </div>
        </div>
    )
}
