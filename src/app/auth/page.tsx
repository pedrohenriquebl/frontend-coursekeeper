import Link from 'next/link';

export default function AuthPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[color:var(--background,#f4f4f5)] text-[color:var(--foreground,#18181b)]">
            <div className="text-center p-6">
                <h1 className="text-2xl font-bold">Área de autenticação</h1>
                <p className="mt-2">Você será redirecionado para a página de login.</p>
                <Link href="/login" className="inline-block mt-4 px-4 py-2 rounded bg-[color:var(--modal-submit-bg,#059669)] text-[color:var(--modal-submit-text,#fff)]">Ir para Login</Link>
            </div>
        </div>
    );
}