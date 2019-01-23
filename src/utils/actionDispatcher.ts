import Bacon from 'baconjs'

export class Action<T> extends String {}

const bus = new Bacon.Bus<any, any>()

export function sendAction<T>(action: Action<T>, val: T) {
  bus.push({
    action,
    val
  })
}

export function actionStream<T>(action: Action<T>): Bacon.EventStream<T, {}> {
  return bus
    .filter(a => a.action === action)
    .map(a => a.value as T)
}