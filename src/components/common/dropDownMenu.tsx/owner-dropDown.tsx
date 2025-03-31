import { EllipsisVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import ButtonStatus from "../buttonStatus/ButtonStatus";

interface Account {
    id: string;
    name: string;
    membership_status: boolean;
}

export default function DropDownMenu({ account }: { account: Account }) {

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{account.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <ButtonStatus id={account.id} membership_status={account.membership_status} />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}