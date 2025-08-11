'use client'

import { useAuthUser } from "@/context/authUserContext";

export default function DashboardPage() {
    const { user } = useAuthUser();
    return (
        <div>
            <h1>Hello {user?.firstName}</h1>
        </div>
    );
}
