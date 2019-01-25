import {InitialState} from '../types/InitialState'
import {fetchAllUpcomingEvents} from '../services/eventService'

export function resolveInitialState(): Promise<InitialState> {
  const events = fetchAllUpcomingEvents()
  return Promise
    .all([events])
    .then(([events]) => ({
      events
    }))
}
