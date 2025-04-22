
export default function AsideIncomes() {

    const incomes = ["$20.000", "$10.000", "$10.000", "$50.000"]

    return (
        <div className="h-fit border-2 rounded-2xl mt-4">
            <aside className="w-52 p-4">
                <div className="border rounded-full w-32 h-32 flex items-center justify-center mx-auto text-2xl font-bold">
                    <h1>$90.000</h1>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Ingresos recientes</h3>
                    <ul className="flex flex-col gap-2">
                        {incomes.map((inc) => (
                            <li key={inc} className="first:font-bold">+{inc}</li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    )
}
