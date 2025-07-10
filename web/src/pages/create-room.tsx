import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";


export function CreateRoom(){

    return (
        <div className="min-h-screen py-8">

            <div className="container flex flex-col gap-8">
                <div >
                    <h2 className="text-3xl font-bold mb-2">Listagem de salas</h2>
                    <p className="text-muted-foreground">
                        Criar e listagem de salas
                    </p>
                </div>
                <CreateRoomForm />
                <RoomList />
            </div>

        </div>
    )
}