import axios from 'axios'
import config from '../../config.js';

const ENTRYPOINT = process.env.NODE_ENV === 'production' ? config.backEndEntrypoint : 'http://localhost:4200/api'

export interface User {
  id: string,
  username: string,
  name: string,
  email: string
}

export function fetchUser(token: string): Promise<User | {}> {
  return axios.get(ENTRYPOINT + '/users/me', {headers: {'Authorization': token}})
    .then(({data}: {data: User}) => data)
    .catch(e => {
      console.error(e)
      return {}
    })
}