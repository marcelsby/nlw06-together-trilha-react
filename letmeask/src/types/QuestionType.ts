export type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likeCount: number;
    likeId: string | undefined;
}