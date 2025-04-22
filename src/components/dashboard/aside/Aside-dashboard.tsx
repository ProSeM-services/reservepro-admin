import { Button } from "@/components/ui/button";

export default function SideBar() {
    return (
        <div className="h-full w-full">
            <aside className="flex flex-col items-center w-fit h-full gap-5">
                {/* <h2 className="text-[#505050] text-2xl font-semibold mb-2">Dashboard</h2> */}
                <Button variant="ghost">Clientes</Button>
                <Button variant="ghost">Companias</Button>
                <Button variant="ghost">Profesionales</Button>
            </aside>
        </div>
    )
}
