'use client'
import { useDashboardStore } from "../../store/useDashboardStore";
import { useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
} from "@tanstack/react-table";
import { Button } from "../ui/button";


interface Users {
    id: string;
    tenantName: string;
    userName: string;
    name: string;
    lastName: string,
    membership_status: boolean;
    email: string;
    role: string;
    phone: string
}

export default function Dashboard() {
    const { users, getUsers, updateUserStatus } = useDashboardStore();

    useEffect(() => {
        getUsers()
    }, []);

    const handleMembershipStatus = async (userId: string, membership_status: boolean) => {
        try {
            if (!membership_status) {
                console.log("Membresia actualizada! Disfrute del software", membership_status)
            } else {
                console.log("Membresia vencida! Debe pagar para poder seguir usando el software", membership_status)
            }
            await updateUserStatus(userId, !membership_status); // El estado en Zustand ya se actualiza
        } catch (error) {
            console.error("Error al actualizar el estado de membresía:", error);
        }
    };


    const filteredAccounts = users.filter((user) => user.role === "OWNER")

    const columns: ColumnDef<Users>[] = [
        {
            header: "Dueño",
            accessorKey: "name",
            cell: fullname => `${fullname.row.original.name} ${fullname.row.original.lastName}`
        },
        {
            header: "Compañia",
            accessorKey: "tenantName",
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
            accessorKey: "phone"
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
            header: "Edit Membership Status",
            accessorKey: "",
            cell: ({ row }) => {
                return (
                    <Button
                        onMouseDown={() =>
                            handleMembershipStatus(
                                row.original.id,
                                row.original.membership_status
                            )
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
                        variant="default"
                        disabled={false}

                    >
                        {row.original.membership_status
                            ? "Inactivate"
                            : "Activate"}
                    </Button>
                )
            }
        },
    ];

    const table = useReactTable({
        data: filteredAccounts,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Dashboard "SUPERADMIN"</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border p-2">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

