import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomRequest } from "./interfaces/create-room-request";
import type { CreateRoomResponse } from "./interfaces/create-room-response";

export function useCreateRoom(){

    const clientQuery = useQueryClient();

    return useMutation({
        
        mutationFn: async (data: CreateRoomRequest)=>{
            const response: CreateRoomResponse = await fetch(`http://localhost:3333/rooms`,{
                method: "POST",
                body: JSON.stringify(data),
                headers:{
                    "Content-type":"application/json"
                }
            }).then(res => res.json());

            return response
        },
        onSuccess(){
            clientQuery.invalidateQueries({queryKey: ["get-rooms"]});
        }
    })
} 