import axios from 'axios'
import 'dotenv/config'

import { validateEmbeddingResponseType } from '../../util/typeValidation'


export async function getEmbeddings(text: string): Promise<number[]> {
  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
        input: text,
        model: "text-embedding-ada-002",
        encoding_format: "float"
      },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );
  const responseValidity = validateEmbeddingResponseType(response)
  if (!responseValidity.isValid) {
    // TODO: Currently, only the first error from ajv will be logged here
    throw new Error(`Invalid response from OpenAI API. AJV Error: ${responseValidity.errors[0].params}`)
  }

  const embeddingsArray = response.data.data[0].embedding

  return embeddings;
}
