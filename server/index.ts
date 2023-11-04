import fastify from 'fastify'
import { AddressInfo } from 'node:net'

import process from 'node:process'

import { getEmbeddings } from './services/openai'

const server = fastify({ logger: true })

server.get('/', async (request, reply) => {
    return { hello: 'world' }
});

server.post('/embeddings', async(request, reply) => {
    getEmbeddings("I'm stinking!")
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
