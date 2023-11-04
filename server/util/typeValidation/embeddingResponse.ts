
import { JSONSchemaType } from 'ajv'

interface EmbeddingResponse {
    data: {
        data: {
            embedding: number[]
        }[]
    }
}

export const embeddingResponseSchema: JSONSchemaType<EmbeddingResponse> = {
  type: "object",
  required: ['data'],
    properties: {
        data: {
            type: 'object',
            required: ['data'],
            properties: {
                data: {
                    type: 'array',
                    minItems: 1,
                    items: {
                        type: 'object',
                        required: ['embedding'],
                        properties: {
                            embedding: {
                                type: 'array',
                                items: {
                                    type: 'number'
                                }
                            }
                        }
                    }
                }
            },
        }
    }
}