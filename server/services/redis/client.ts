import { createClient } from 'redis'

import 'dotenv/config'

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number.parseInt(process.env.REDIS_PORT),
    }
})

client.on('error', err => console.log('Redis Client Error', err))

await client.connect()

export async function setEmbeddings(key: string, embeddings: number[]): Promise<string> {
    return client.set(`embeddings:${key}`, JSON.stringify(embeddings))
}