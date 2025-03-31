import { useDashboardStore } from "@/store/useDashboardStore";
import { Button } from "../../ui/button";

interface Account {
    id: string;
    membership_status: boolean;
}

export default function ButtonStatus({ id, membership_status }: Account) {

    const { updateUserStatus } = useDashboardStore()

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

    return (
        <div>
            <Button
                onClick={() =>
                    handleMembershipStatus(
                        id,
                        membership_status
                    )
                }
                className="px-3 py-1 bg-blue-500 text-white rounded-md cursor-pointer"
                variant="default"
                disabled={false}

            >
                {membership_status
                    ? "Inactivate"
                    : "Activate"}
            </Button>
        </div>
    )
}
