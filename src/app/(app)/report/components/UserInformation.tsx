import Image from "next/image";

type UserInformationProps = {
    name: string;
    email: string;
    memberSince: string;
    reportDate: string;
    period: string;
    periods: { value: string; label: string }[];
    userImg?: string;
}

export default function UserInformation({ name, email, memberSince, reportDate, period, periods, userImg }: UserInformationProps) {
    const periodLabel = periods.find((p) => p.value === period)?.label;

    const safeSrc = userImg
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${userImg}`
        : "/avatars/placeholder.png";

    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 mb-8" >
            <h3 className="text-lg font-semibold text-white mb-4">
                Informações do Usuário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center">
                        <Image
                            width={48}
                            height={48}
                            src={safeSrc}
                            alt={`Avatar de ${name}`}
                            className="object-cover w-full h-full rounded-full"
                            onError={(e) => { e.currentTarget.src = "/avatars/placeholder.png"; }}
                        />
                    </div>
                    <div>
                        <div className="text-white font-medium">{name}</div>
                        <div className="text-gray-400 text-sm">
                            {email}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">Membro desde</div>
                    <div className="text-white font-medium">{memberSince}</div>
                </div>
                <div>
                    <div className="text-gray-400 text-sm mb-1">
                        Relatório gerado em
                    </div>
                    <div className="text-white font-medium">
                        {reportDate}
                    </div>
                    <div className="text-gray-400 text-sm">
                        Período: {periodLabel}
                    </div>
                </div>
            </div>
        </div >
    )
}