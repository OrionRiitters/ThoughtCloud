import fastify from 'fastify'
import { AddressInfo } from 'node:net'
import Ajv from 'ajv'

import process from 'node:process'
import querystring from 'node:querystring'

import { getOpenAiEmbeddings } from './services/openai'
import { putRequestSchema } from './util/typeValidation/userRequests/textToEmbeddings'
import { getRequestSchema } from './util/typeValidation/userRequests/getCachedEmbeddings'
import { setEmbeddings, getEmbeddings } from './services/redis/client'

const server = fastify({ logger: true })
const ajv = new Ajv()

server.put('/embeddings', async request => {
  const validate = ajv.compile(putRequestSchema)
  if (validate(request)) {
    const embeddings = await getOpenAiEmbeddings(request.body.data)
    const hey = await setEmbeddings(request.body.data, embeddings)
    if (hey) {
        console.log('success')
    } else {
        console.log(hey)
    }

  } else {
    return Promise.reject(
      new Error(
        `400 Bad Request at PUT /embeddings. AJV Error: ${validate.errors?.[0].message}`
      )
    )
  }
})

server.get('/embeddings', async (request, reply) => {
  const validate = ajv.compile(getRequestSchema)
  if (validate(request)) {
    const embeddings = await getEmbeddings(decodeURI(request.query.embeddingKey))
    if (embeddings === undefined) {
      reply.status(404)
      return Promise.reject(
        new Error(
          `404 Not Found at GET /embeddings. Embeddings not found for key ${request.query.embeddingKey}`
        )
      )
    } else {
      reply.status(200)
      return embeddings
    }
  } else {
    console.log(validate.errors)
  }
})

const start = async () => {
  try {
    await server.listen({port:3000})
    // Breaks if we serve traffic using a unix domain socket
    server.log.info(
      `Server listening on ${(server.server.address() as AddressInfo).port}`
    )
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
