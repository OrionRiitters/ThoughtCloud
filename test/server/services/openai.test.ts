import {test, mock, describe, it, after} from 'node:test'
import assert from 'node:assert'
import sinon from 'sinon'
import axios from 'axios';

import { getEmbeddings } from '../../../server/services/openai'

describe('getEmbeddings', async () => {

    after(() => sinon.restore())

    it('happy path', () => {
        sinon.replace(axios, 'post', sinon.fake.resolves({
            data: {
                data: [
                {
                    embedding: [1, 2, 3, 4, 5],
                },
                ],
            },
        }))
      assert.equal(getEmbeddings('foo'), [1, 2, 3, 4, 5])
    })
    it ('throws error on invalid response', () => {
        sinon.replace(axios, 'post', sinon.fake.resolves({
            data: {
                shmata: [
                {
                    embedding: [1, 2, 3, 4, 5],
                },
                ],
            },
        }))
      assert.throws(() => getEmbeddings('foo'))
    } )
  });