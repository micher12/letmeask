import { useQuery } from "@tanstack/react-query";
import type { GetQuestionsRequest } from "./interfaces/get-questions-request";

export function useQuestions(roomId: string){

    return useQuery({
        queryKey: ["get-questions", roomId],
        queryFn: async ()=>{
            const response: GetQuestionsRequest[] = await fetch(`http://localhost:3333/rooms/${roomId}/questions`).then(res => res.json());

            return response;
        },
    });
}