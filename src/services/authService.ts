import axios from 'axios'
import config from '../../config.js';

const ENTRYPOINT = process.env.NODE_ENV === 'production' ? config.backEndEntrypoint : 'http://localhost:4200/api'

export function loginUser(formData: {username: string, password: string}): Promise<{access_token: string}> {
  return axios.post(ENTRYPOINT + '/auth/login', formData)
    .then(({data}: {data: {access_token: string}}) => data)
}