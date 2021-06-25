import { useState } from 'react';
import { useParams, useHistory } from 'react-router';

import deleteImg from '../assets/images/delete.svg';

import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';
import { RoomHeader } from '../components/RoomHeader';
import { EmptyQuestions } from '../components/EmptyQuestions/index';
import { Question } from '../components/Question';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';

import { database } from '../services/firebase';

import { RoomParamsType } from '../types/RoomParamsType';

export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams<RoomParamsType>();
    const history = useHistory();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
            await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleEndRoom() {
        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/')
    }

    return (
        <div id="page-room">
            <RoomHeader>
                <div>
                    <RoomCode code={roomId} />
                    <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                </div>
            </RoomHeader>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                {questions.length > 0 ? (
                    <div className="question-list">
                        {questions.map(question => {
                            return (
                                <Question
                                    // TODO: Algoritmo de reconciliação (React reconciliation)
                                    key={question.id}
                                    content={question.content}
                                    author={question.author}
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                    >
                                        <img src={deleteImg} alt="Deletar pergunta." />
                                    </button>
                                </Question>
                            )
                        })}
                    </div>
                ) : (
                    <EmptyQuestions />
                )}
            </main>
        </div>
    )
}