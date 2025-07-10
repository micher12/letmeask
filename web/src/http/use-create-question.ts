import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./interfaces/create-question-request";
import type { CreateQuestionResponse } from "./interfaces/create-question-response";
import type { GetQuestionsRequest } from "./interfaces/get-questions-request";

export function useCreateQuestion(roomId: string){

    const queryClient = useQueryClient();

    return useMutation({
        
        mutationFn: async ({question}: CreateQuestionRequest)=>{
            const response: CreateQuestionResponse = await fetch(`http://localhost:3333/rooms/${roomId}/questions`,{
                method: "POST",
                body: JSON.stringify({roomId, question}),
                headers:{
                    "Content-type":"application/json"
                }
            }).then(res => res.json());

            return response 
        },
        // Executa no momento que for feita a chama para a API
        onMutate: ({ question }) => {
            const questions = queryClient.getQueryData<GetQuestionsRequest[]>(["get-questions", roomId])

            const newQuestion = {
                id: crypto.randomUUID(),
                answer: null,
                question,
                createdAt: new Date().toISOString(),
                isGenerating: true,
            }

            queryClient.setQueryData<GetQuestionsRequest[]>(["get-questions", roomId], 
                [newQuestion, ...questions ?? []]
            )

            return {newQuestion , questions }
        }, 
        onSuccess: (data, _variables, context)=>{
            queryClient.setQueryData<GetQuestionsRequest[]>(
                ["get-questions", roomId],
                questions => {
                    if(!questions)
                        return questions

                    return questions.map(question => {
                        if(question.id === context.newQuestion.id)
                            return { ...context.newQuestion, id: data.questionId, answer: data.answer, isGenerating: false }

                        return question
                    })
                }
            )
            
        },
        onError(_error, _variables, context){
            if(context?.questions){
                queryClient.setQueryData<GetQuestionsRequest[]>(
                    ["get-questions", roomId],
                    context.questions
                )
            }
        }   
    })
} 