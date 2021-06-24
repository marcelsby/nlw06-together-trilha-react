import { User } from '../types/User';

export function verifyUserIsLogged(user?: User, msg?: string) {
    if (!user) {
        throw new Error(msg || 'Você precisa estar logado para executar essa ação.');
    }
}