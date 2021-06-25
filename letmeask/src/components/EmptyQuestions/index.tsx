import emptyQuestionsImg from '../../assets/images/empty-questions.svg';

import './styles.scss';

export function EmptyQuestions() {
    return (
        <div className="no-questions">
            <img src={emptyQuestionsImg} alt="Nehuma pergunta foi feita nesta sala." />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>Faça seu login e seja a primeira pessoa a fazer uma pergunta!</p>
        </div>
    )
}