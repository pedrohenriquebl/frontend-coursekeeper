export function DemoCredentials() {
  return (
    <div
      className="rounded-lg p-4 mt-6"
      style={{ background: "var(--authform-card-bg)" }}
    >
      <p
        className="text-sm font-medium mb-2"
        style={{ color: "var(--authform-accent-light)" }}
      >
        Credenciais disponíveis:
      </p>
      <div className="space-y-2 text-xs">
        <div>
          <p style={{ color: "var(--authform-muted)" }}>Usuário principal:</p>
          <p style={{ color: "var(--authform-primary-light)" }}>pedrodev@dev.com | @teste123</p>
        </div>
      </div>
    </div>
  );
}
