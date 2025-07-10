import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRooms } from "@/http/use-rooms";
import { dayAgo } from "@/lib/dayAgo";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function RoomList(){
    
    const { data, isLoading } = useRooms();

    return(
        <Card>
            <CardHeader>
                <CardTitle>Salas recentes</CardTitle>
                <CardDescription>Acesso rápido para as salas criadas recentemente</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isLoading && [1,2,3].map((index)=>(<Skeleton key={index} type={"roomsLoading"} />))}

                {data?.map(room=>(
                    <Link to={`room/${room.id}`} key={room.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-zinc-950/40">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-medium">{room.name}</h2> 
                            <div className="flex items-center gap-2">
                                <Badge variant={"secondary"}>{dayAgo(room.createdAt).toNow()}</Badge>
                                <Badge variant={"secondary"} className="text-xs">{room.questionsCount} Pergunta(s)</Badge>
                            </div>
                        </div>

                        <span className="flex items-center gap-1">
                            Entrar
                            <ArrowRight className="size-4 text-sm" />
                        </span>
                    </Link>
                ))}
            </CardContent>
        </Card>
    )
}