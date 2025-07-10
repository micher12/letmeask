import { useQuestions } from "@/http/use-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps{
    roomId: string
}

export function QuestionList(props: QuestionListProps){

    const { data, isLoading } = useQuestions(props.roomId);

    return(
        <>
        {isLoading 
        ? <h2>Carregando</h2>
        :
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl text-foreground">
                    Perguntas & Respostas
                </h2>
            </div>

            {data?.map((item)=>(
                <QuestionItem
                    key={item.id}
                    question={item}
                />
            ))}
        </div>
        }
        </>
    )
}