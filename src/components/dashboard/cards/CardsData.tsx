import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDashboardStore } from "@/store/useDashboardStore";

type Type = "accounts" | "companies" | "users" | "services"

interface IConfig {
    title: string;
    count: number;
}

interface DashboardCardProps {
    type: Type;
}

export function CardsData({ type }: DashboardCardProps) {

    const { accounts, companies, users } = useDashboardStore();

    const Config: Record<Type, IConfig> = {
        accounts: {
            title: "Clientes",
            count: accounts.length,
        },
        companies: {
            title: "Companias",
            count: companies.length
        },
        users: {
            title: "Profesionales",
            count: users.length
        },
        services: {
            title: "Servicios",
            count: 4
        }
    }

    const { title, count } = Config[type]
    return (
        <Card className="flex flex-col p-2 gap-2  max-sm:w-full  max-sm:max-w-full flex-grow max-md:max-w-[50%] md:max-w-[33%]  min-w-[250px] ">
            <section className="   flex flex-col  gap-4 ">
                <div className="flex flex-col items-center ">
                    <Label className="text-3xl">{count}</Label>
                    <p>{title}</p>
                </div>
            </section>
        </Card>
    )
}
