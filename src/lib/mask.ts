export function maskCPF(value: string): string {
  const numbersOnly = value.replace(/\D/g, "").slice(0, 11);
  return numbersOnly
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
