
import { JSONSchemaType } from "ajv"

interface PutBody {
    body: {
        data: string
    }
}

export const putRequestSchema: JSONSchemaType<PutBody> = {
    type: 'object',
    required: ['body'],
    properties: {
        body: {
            type: 'object',
            required: ['data'],
            properties: {
                data: {
                    type: 'string'
                }
            }
        }
    }
}