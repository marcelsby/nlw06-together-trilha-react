import { UserType } from '../../types/UserType';

export function userIsLogged(user?: UserType, msg?: string) {
    if (!user) {
        throw new Error(msg || 'Você precisa estar logado para executar essa ação.');
    }
}