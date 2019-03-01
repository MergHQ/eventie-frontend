export interface InitialState {
  events: Event[]
}

export interface Event {
  id: string,
  name: string,
  description: string,
  time: Date,
  registrationStart: Date,
  registrationEnd: Date,
  maxParticipants: number
  author: {
    id: string,
    name: string
  }
  participants: Array<{id: string, username: string}>
}