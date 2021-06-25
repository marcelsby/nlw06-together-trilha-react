export type FirebaseQuestionsType = Record<string, {
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>