import fastify from 'fastify'
import { AddressInfo } from 'node:net'
import Ajv from 'ajv'

import process from 'node:process'

import { getOpenAiEmbeddings } from './services/openai'
import { putRequestSchema } from './util/typeValidation/userRequests/textToEmbeddings'

const server = fastify({ logger: true })
const ajv = new Ajv()

server.put('/embeddings', async(request, reply) => {
    const validate = ajv.compile(putRequestSchema)
    if (validate(request)) {
        const embeddings = await getOpenAiEmbeddings(request.body.data)
    } else {
        return Promise.reject(new Error(`400 Bad Request at PUT /embeddings. AJV Error: ${validate.errors?.[0].message}`))
    }
})

server.get('/embeddings', async(request, reply) => {
    const embeddings = await getOpenAiEmbeddings('ooflasdfn;oawiepaowieifnawepofiujawpoeijawoeif')
})

const start = async () => {
    try {
        await server.listen(3000)
        // Breaks if we serve traffic using a unix domain socket
        server.log.info(`Server listening on ${(server.server.address() as AddressInfo).port}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
};

start()
