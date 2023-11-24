import { createClient } from 'redis'

import 'dotenv/config'

if (process.env.REDIS_PORT === undefined) {
  console.warn('REDIS_PORT is undefined. Defaulting to 6379')
}

if (process.env.REDIS_HOST === undefined) {
  console.warn('REDIS_HOST is undefined. Defaulting to localhost')
}

const REDIS_PORT = Number.parseInt(process.env.REDIS_PORT ?? '6379')
const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost'

const client = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
})

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

export async function setEmbeddings(
  key: string,
  embeddings: number[]
): Promise<boolean> {
  console.log(key)
  return client.HSETNX(`embeddings:${key}`, 'embeddings', JSON.stringify(embeddings))
}

export async function getEmbeddings(
    key: string,
  ): Promise<string|undefined> {
    return client.hGet(`embeddings:${key}`, 'embeddings')
  }
  