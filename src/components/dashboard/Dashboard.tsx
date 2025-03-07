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

export default function Dashboard() {
    const { accounts, getAccounts, updateUserStatus } = useDashboardStore();

    useEffect(() => {
        getAccounts()
    }, []); // Dependencia vacía para que se ejecute solo al montar el componente

    const handleMembershipStatus = async (userId: string, value: boolean) => {
        const status = !value
        updateUserStatus(userId, status)
    }

    const filteredAccounts = accounts.filter((account) => account.role === "OWNER")

    const columns: ColumnDef<any>[] = [
        {
            header: "Compañia",
            accessorKey: "tenantName",
        },
        {
            header: "Dueño",
            accessorKey: "name",
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
            cell: ({ row }) => (
                <Button
                    onClick={() =>
                        handleMembershipStatus(
                            row.original.id,
                            row.original.membership_status
                        )
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                    {row.original.membership_status
                        ? "Inactivate"
                        : "Activate"}
                </Button>
            )
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

