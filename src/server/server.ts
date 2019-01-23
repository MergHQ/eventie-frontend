require('dotenv').config() 
import express from 'express'
import ReactServer from 'react-dom/server'
import {resolveInitialState} from './initialStateResolver'
import {createTemplate} from './basePage'
import createApp from '../features/application'

const PORT = process.env.PORT || 3000
const server = express()

server.use(express.static('dist'))

server.get('/', async (req, res) => {
  const initialState = await resolveInitialState()
  const html = ReactServer.renderToString(createApp(initialState))
  const wrappedPage = createTemplate({
    title: 'Eventie',
    body: html,
    initialState: JSON.stringify(initialState)
  })
  res.send(wrappedPage)
})


server.listen(PORT, () => {
  console.log('Server listening on ' + PORT, '🚀')
})

