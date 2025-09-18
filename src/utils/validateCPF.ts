export function validateCPF(cpf: string): boolean {
    if (!cpf) return false;

    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    if (secondCheck !== parseInt(cpf.charAt(10))) return false;

    return true;
}