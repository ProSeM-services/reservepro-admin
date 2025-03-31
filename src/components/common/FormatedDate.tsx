interface Account {
    createdAt: string;
}

export function FromatedDate({ createdAt }: Account) {
    const DAYS = [
        { short: "dom", long: "Domingo" },
        { short: "lun", long: "Lunes" },
        { short: "mar", long: "Martes" },
        { short: "mie", long: "Miércoles" },
        { short: "jue", long: "Jueves" },
        { short: "vie", long: "Viernes" },
        { short: "sab", long: "Sábado" },
    ];
    const MONTHS = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const weekDay = DAYS[new Date(createdAt).getDay()]?.long;
    const number = new Date(createdAt).getDate();
    const month = MONTHS[new Date(createdAt).getMonth()];
    return (
        <p>
            {weekDay}, {number} de {month}
        </p>
    );
}