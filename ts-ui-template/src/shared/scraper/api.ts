import * as request from 'superagent'
import { Token } from '../../shared/modules/state'

export const saveToken = async function(token: Token): Promise<request.Response> {
  return request
    .post('/app/api/checkout')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(token))
}
