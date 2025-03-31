import { useDashboardStore } from "../../store/useDashboardStore";
import { useEffect } from "react";
import {
    ColumnDef,
} from "@tanstack/react-table";
import { FromatedDate } from "../../components/common/FormatedDate";
import { ContactButton } from "../../components/common/WhatsAppIcon";
import { RootTable } from "../../components/common/root-table";
import DropDownMenu from "../../components/common/dropDownMenu.tsx/owner-dropDown";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuth";
import { useNavigate } from "react-router-dom";

interface Account {
    id: string;
    name: string,
    lastName: string,
    tenantName: string;
    membership_status: boolean;
    email: string;
    role: string;
    phone: string;
    createdAt: string;
}

export default function Dashboard() {
    const navigate = useNavigate()
    const { getAccounts, accounts } = useDashboardStore();
    const { logout } = useAuthStore()

    useEffect(() => {
        getAccounts()
    }, []);

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const columns: ColumnDef<Account>[] = [
        {
            header: "Dueño",
            accessorKey: "name",
            cell: fullname => `${fullname.row.original.name} ${fullname.row.original.lastName}`
        },
        {
            header: "Compañia",
            accessorKey: "companyName",
        },
        {
            header: "Nombre de Usuario",
            accessorKey: "userName",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Phone",
            accessorKey: "phone",
            cell: ({ getValue }) => {
                const phoneNumber = getValue<string>();
                return (
                    <div className="flex items-center gap-2">
                        <ContactButton phoneNumber={phoneNumber} />
                    </div>
                );
            }
        },
        {
            header: "Fecha Creacion",
            accessorKey: "createdAt",
            cell: ({ row }) => (
                <FromatedDate createdAt={row.original.createdAt} />
            )
        },
        {
            header: "Membership Status",
            accessorKey: "membership_status",
            cell: ({ getValue }) => {
                const value = getValue()
                return value ? "🟢 Active" : "🔴 Inactive"
            }
        },
        {
            header: "Edit",
            accessorKey: "",
            cell: ({ row }) => (
                <DropDownMenu key={row.original.id} account={row.original} />
            )
        },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Dashboard "SUPERADMIN"</h2>
            <Button variant={"outline"} onClick={handleLogout}>Logout</Button>
            <RootTable columns={columns} data={accounts} />
        </div>
    );
};

