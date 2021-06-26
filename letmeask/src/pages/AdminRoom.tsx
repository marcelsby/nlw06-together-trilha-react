// import { useState } from 'react';
import { useParams, useHistory } from 'react-router';

import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { RoomCode } from '../components/RoomCode';
import { Button } from '../components/Button';
import { RoomHeader } from '../components/RoomHeader';
import { EmptyQuestions } from '../components/EmptyQuestions/index';
import { Question } from '../components/Question';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import { database } from '../services/firebase';

import '../styles/room.scss';

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


    async function handleCheckAnsweredQuestion(questionId: string) {
        await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
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
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                >
                                    {!question.isAnswered &&
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => handleCheckAnsweredQuestion(question.id)}
                                            >
                                                <img src={checkImg} alt="Marcar pergunta como respondida." />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleHighlightQuestion(question.id)}
                                            >
                                                <img src={answerImg} alt="Destacar pergunta." />
                                            </button>
                                        </>
                                    }

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteQuestion(question.id)}
                                        className="delete-button"
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