import { JSONSchemaType } from 'ajv'

interface GetBody {
  query: {
    embeddingKey: string
  }
}

export const getRequestSchema: JSONSchemaType<GetBody> = {
  type: 'object',
  required: ['query'],
  properties: {
    query: {
      type: 'object',
      required: ['embeddingKey'],
      properties: {
        embeddingKey: {
          type: 'string'
        }
      }
    }
  }
}
