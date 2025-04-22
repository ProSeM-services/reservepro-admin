import { useDashboardStore } from "../../store/useDashboardStore";
import { useEffect } from "react";
import {
    ColumnDef,
} from "@tanstack/react-table";
import { FromatedDate } from "../../components/common/FormatedDate";
import { ContactButton } from "../../components/common/WhatsAppIcon";
import { RootTable } from "../../components/common/root-table";
import DropDownMenu from "../../components/common/dropDownMenu.tsx/owner-dropDown";
import { CardsData } from "./cards/CardsData";
import Aside from "./aside/Aside-dashboard";
import AsideIncomes from "./aside/Aside-incomes";
import Navbar from "./navbard/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuth";
import { Button } from "../ui/button";

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
    const { getAccounts, getCompanies, getUsers, accounts } = useDashboardStore();

    const navigate = useNavigate()
    const { logout } = useAuthStore()


    const handleLogout = () => {
        logout()
        navigate("/")
    }
    useEffect(() => {
        getAccounts()
        getCompanies()
        getUsers()
    }, []);



    const columns: ColumnDef<Account>[] = [
        {
            header: "Dueño",
            accessorKey: "name",
            cell: ({ row }) => {
                const { name, lastName, membership_status, email } = row.original;
                return (
                    <div className="flex items-center gap-2 justify-star w-auto">
                        <span>{membership_status ? "🟢" : "🔴"}</span>
                        <div className="flex flex-col">
                            <span>{name} {lastName}</span>
                            <p className="text-[#555]">{email}</p>
                        </div>
                    </div>
                );
            }
        },
        {
            header: "Compañia",
            accessorKey: "companyName",
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
            header: "Edit",
            accessorKey: "",
            cell: ({ row }) => (
                <DropDownMenu key={row.original.id} account={row.original} />
            )
        },
    ];

    return (
        <div className="flex h-screen">
            <aside className="flex flex-col w-[20vw] px-8 gap-2">
                <div className="flex justify-center p-5">
                    <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                </div>
                <hr />
                <Aside />
            </aside>
            <div className="outline">
                <div className="flex flex-col p-4">
                    <Navbar />
                    <section className="flex gap-4">
                        <section className="">
                            <div className="flex flex-row gap-4 py-4">
                                <CardsData type="accounts" />
                                <CardsData type="companies" />
                                <CardsData type="users" />
                                <CardsData type="services" />
                            </div>
                            <div>
                                <RootTable columns={columns} data={accounts} />
                            </div>
                        </section>
                        <AsideIncomes />
                    </section>
                </div>
            </div>
        </div>
    );
};

