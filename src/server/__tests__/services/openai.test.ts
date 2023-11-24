// const { test, mock, describe, it, after } = require('node:test')
// const { assert } = require('node:assert')
// const {sinon } = require('sinon')
// const axios = require('axios')

// const { getOpenAiEmbeddings } = require('../../services/openai')


import { test, mock, describe, it, after } from 'node:test'
import assert from 'node:assert'
import sinon from 'sinon'
import axios from 'axios'

import { getOpenAiEmbeddings } from '../../services/openai'

describe('getEmbeddings', async () => {
  it('happy path', async () => {
    sinon.replace(
      axios,
      'post',
      sinon.fake.resolves({
        data: {
          data: [
            {
              embedding: [1, 2, 3, 4, 5]
            }
          ]
        }
      })
    )

    assert.deepEqual(await getOpenAiEmbeddings('foo'), [1, 2, 3, 4, 5])
    sinon.restore()
  })

  it('throws error on invalid response', async () => {
    sinon.replace(
      axios,
      'post',
      sinon.fake.resolves({
        data: {
          shmata: [
            {
              embedding: [1, 2, 3, 4, 5]
            }
          ]
        }
      })
    )

    assert.rejects(() => getOpenAiEmbeddings('foo'))
    sinon.restore()
  })
})