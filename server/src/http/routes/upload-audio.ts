import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4";
import { generateEmbeddings, transcribeAudio } from "../../services/gemini.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const uploadAudioRoute: FastifyPluginCallbackZod = (app)=>{

    app.post("/rooms/:roomId/audio", {
        schema:{
            params: z.object({
                roomId: z.string(),
            }),
        }
    },

    async (req, res)=>{
        const { roomId } = req.params;

        const audio = await req.file();

        if(!audio){
            throw new Error("Audio is required");
        }

        const audioBuffer = await audio.toBuffer();
        const audioAsBase64 = audioBuffer.toString("base64");

        const transcription = await transcribeAudio(audioAsBase64, audio.mimetype);
        const embeddings = await generateEmbeddings(transcription);

        

        const result = await db.insert(schema.audioChuncks).values({
            roomId,
            transcription,
            embeddings,
        }).returning();

        const chunck = result[0];

        if(!chunck)
            throw new Error("Erro ao salvar chunck");

        return res.status(201).send({ chunkId: chunck.id});

        // 1 transcrever o áudio
        // 2 gerar o vetor | embeddings
        // 3 armazenar o vetor no banco de dados
    })

}