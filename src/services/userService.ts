import axios from 'axios'
import config from '../../config.js';

const ENTRYPOINT = process.env.NODE_ENV === 'production' ? config.backEndEntrypoint : 'http://localhost:4200/api'

export interface User {
  id: string,
  username: string,
  name: string,
  email: string
}

export interface UserRegistrationData {
  username: string,
  name: string,
  email: string,
  password: string
}

export function fetchUser(token: string): Promise<User | {}> {
  return axios.get(ENTRYPOINT + '/users/me', {headers: {'Authorization': token}})
    .then(({data}: {data: User}) => data)
    .catch(e => {
      console.error(e)
      return {}
    })
}

export function createUser(user: UserRegistrationData): Promise<User | null> {
  return axios.post(ENTRYPOINT + '/users', user)
    .then(({data}) => data as User)
    .catch(e => {
      console.error(e)
      return null
    })
}