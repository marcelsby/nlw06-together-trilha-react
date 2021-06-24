import { useParams } from 'react-router';
import { RoomCode } from '../components/RoomCode';

import { FormEvent, useState } from 'react';

import { Button } from '../components/Button';
import { RoomHeader } from '../components/RoomHeader';

import { verifyInputEmptyness } from '../services/verifyInputEmptyness';
import { verifyUserIsLogged } from '../services/verifyUserIsLogged';

import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

import '../styles/room.scss';
import { useEffect } from 'react';

type RoomParams = {
    id: string;
}

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
}>

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    const roomId = params.id;


    useEffect(() => {
        const roomRef = database.ref(`/rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        verifyInputEmptyness(newQuestion);

        verifyUserIsLogged(user, 'Você precisa estar logado para enviar uma pergunta.');

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user?.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`/rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <RoomHeader>
                <RoomCode code={roomId} />
            </RoomHeader>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você deseja perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}