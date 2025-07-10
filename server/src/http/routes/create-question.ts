import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { generateEmbeddings, genereteAnswer } from "../../services/gemini.ts";
import { and, desc, eq, sql } from "drizzle-orm";

export const createQuestionRoute: FastifyPluginCallbackZod = (app)=>{


    app.post("/rooms/:roomId/questions", {
        schema:{
            params: z.object({
                roomId: z.string(),
            }),
            body: z.object({
                question: z.string().min(1),
            })
        }
    },
    async ({body, params}, res)=>{
        const { roomId } = params
        const { question } = body

        const embeddings = await generateEmbeddings(question);

        const embeddingsAsString = `[${embeddings.join(",")}]`

        const chuncks = await db
            .select({
                id: schema.audioChuncks.id,
                transcription: schema.audioChuncks.transcription,
                similarity: sql<number>`1 - (${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector)`
            })
            .from(schema.audioChuncks)
            .where(and(
                eq(schema.audioChuncks.roomId, roomId),
                sql`1 - (${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`  
            ))
            .orderBy(desc(sql`${schema.audioChuncks.embeddings} <=> ${embeddingsAsString}::vector`))
            .limit(3)
        
        let answer: string | null = null;

        if(chuncks.length > 0){
            const transcription = chuncks.map(chunck => chunck.transcription)

            answer = await genereteAnswer(question, transcription)
        }


        const result = await db
        .insert(schema.questions)
        .values({
            roomId,
            question,
            answer,
        }).returning()
 
        const insertedQuestion = result[0];
 
        if(!insertedQuestion)
            throw new Error("Failed to create new room.");

        return res.status(201).send({questionId: insertedQuestion.id, answer})


    })

}