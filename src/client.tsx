import ReactDOM from 'react-dom'
import createApp from './features/application'

const initialStateElem = document.getElementById('initial-state')
if (initialStateElem) {
  console.log('asdfds')
  const app = createApp(JSON.parse(initialStateElem.innerText))
  ReactDOM.hydrate(
    app,
    document.getElementById('app')
  )
}