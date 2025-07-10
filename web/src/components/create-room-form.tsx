import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod/v3";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "./ui/textarea";
import { useCreateRoom } from "@/http/use-create-room";

export function CreateRoomForm(){

    const { mutateAsync: createRoom } = useCreateRoom();

    const createRoomSchema = z.object({
        name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
        description: z.string(),
    })

    type CreateRoomFormData = z.infer<typeof createRoomSchema>

    const form = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
        }
    })

    async function handleCreateRoom({name, description}: CreateRoomFormData) {
       await createRoom({name, description});
       
       form.reset();
    }

    return(
        <Card>
           <CardHeader>
                <CardTitle>Criar sala</CardTitle>
                <CardDescription>Criar uma nova sola para começar a fazer perguntas e receber respostas de I.A</CardDescription>
           </CardHeader>
           <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateRoom)} className="flex flex-col gap-5">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite o nome da sala..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <Button type="submit">Criar sala</Button>
                    </form>
                </Form>
           </CardContent>
        </Card>
    )
}
