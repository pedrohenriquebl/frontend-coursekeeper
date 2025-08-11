import Navbar from "@/components/navbar/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <Navbar />
            <main className="flex-1">{children}</main>
        </AuthGuard>
    );
}
