import { Link, useHistory } from 'react-router-dom';
import { FormEvent } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const [roomName, setRoomName] = useState('');

    async function handleCreateNewRoom(event: FormEvent) {
        event.preventDefault();

        if (roomName.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const { key: roomId } = await roomRef.push({
            title: roomName,
            authorId: user?.id
        });

        history.push(`/rooms/${roomId}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração símbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Let me ask" />
                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateNewRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setRoomName(event.target.value)}
                            value={roomName}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}