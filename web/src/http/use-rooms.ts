import { useQuery } from "@tanstack/react-query";
import type { GetRoomsApiResponse } from "./interfaces/get-rooms-response";

export function useRooms(){
    return useQuery({
        queryKey: ["get-rooms"],
        queryFn: async ()=>{
            const response: GetRoomsApiResponse[] = await fetch("http://localhost:3333/rooms").then(res => res.json());

            return response;
        },
    });
}