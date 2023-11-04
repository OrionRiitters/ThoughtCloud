
import Ajv from "ajv"
import {ErrorObject} from "ajv"

const ajv = new Ajv()

const embeddingResponseSchema = {
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

export function validateEmbeddingResponseType(response: any): {isValid: boolean, errors: ErrorObject[]|null} {
    const validate = ajv.compile(embeddingResponseSchema)
    const isValid = validate(response)
    return {isValid, errors: validate.errors}
}