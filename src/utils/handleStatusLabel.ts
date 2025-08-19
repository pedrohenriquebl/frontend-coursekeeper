const status: Record<string, string> = {
  CONCLUIDO: "Concluído",
  EM_PROGRESSO: "Em Progresso",
  NAO_INICIADO: "Não Iniciado",
  NAO_CONCLUIDO: "Não Concluído",
};

export function handleStatusLabel(statusKey: string) {
  return status[statusKey as keyof typeof status] || status.NAO_INICIADO;
}
