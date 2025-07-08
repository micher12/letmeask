import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface GetRoomsApiResponse {
    id: string,
    name: string,
}

export function CreateRoom(){

    const {data, isLoading} = useQuery({
        queryKey: ["get-rooms"],
        queryFn: async ()=>{
            const response: GetRoomsApiResponse[] = await fetch("http://localhost:3333/rooms").then(res => res.json());

            return response;
        }
    });

    return (
        <div>

            {isLoading && "Carregando..."}

            {data && 
                <div className="flex flex-col gap-1">
                {data.map((data) => (
                    <Link key={data.id} to={`/room/${data.id}`} className="underline" >{data.name}</Link>
                ))}
                </div>
            }

            
        </div>
    )
}