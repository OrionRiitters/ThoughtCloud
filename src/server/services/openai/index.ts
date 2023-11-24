import axios from 'axios'
import 'dotenv/config'
import Ajv from 'ajv'

import { embeddingResponseSchema } from '../../util/typeValidation/embeddingResponse'

const ajv = new Ajv()

export async function getOpenAiEmbeddings(text: string): Promise<number[]> {
  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      input: text,
      model: 'text-embedding-ada-002',
      encoding_format: 'float'
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    }
  )
  const validate = ajv.compile(embeddingResponseSchema)
  if (validate(response)) {
    return response.data.data[0].embedding
  }
  return Promise.reject(
    new Error(
      `Invalid response from OpenAI API. AJV Error: ${validate.errors?.[0].message}`
    )
  )
}
