export function isEmptyString(value: string, msg?: string) {
    if (value.trim() === '') {
        alert(msg || 'O campo não pode estar vazio!');
        return true;
    } else {
        return false;
    }
}