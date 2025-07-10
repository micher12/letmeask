export interface GetQuestionsRequest {
    id: string,
    question: string,
    answer: string | null,
    createdAt: string,
    isGenerating?: boolean,
}