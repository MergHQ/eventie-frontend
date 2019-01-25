import ReactDOM from 'react-dom'
import createApp from './features/application'

const initialStateElem = document.getElementById('initial-state')
if (initialStateElem) {
  createApp(JSON.parse(initialStateElem.innerText))
    .onValue(app => {
    ReactDOM.hydrate(
      app,
      document.getElementById('app')
    )
  })
}