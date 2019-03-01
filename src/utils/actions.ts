import {Action} from "./actionDispatcher"
import { Event } from "../types/InitialState"

export const toggleEventModalAction: Action<{id: string, isOpen: boolean}> = 'toggleEventModalAction'
export const updateNewEventFormData: Action<any> = 'updateNewEventFormData'
export const submitFormDataAction: Action<any> = 'submitFormData'
export const updateLoginCreds: Action<any> = 'updateLoginCredsAction'
export const login: Action<any> = 'loginAction'
export const fetchUserDetails: Action<void> = 'fetchUserDetailsAction'
export const updateUserRegistrationFormData: Action<any> = 'updateUserRegistrationFormDataAction'
export const submitNewUserData: Action<any> = 'submitNewUserDataAction'
export const setRegistrationView: Action<boolean> = 'setRegistrationViewAction'
export const enrollToEvent: Action<string> = 'enrollToEventAction'
export const yoDawgHeardYouLikeModals: Action<{message: string, isOpen: boolean}> = 'toggleErrorModal'
export const setEditEventView: Action<string> = 'setEditEventViewAction'
export const submitUpdatedEventData: Action<string> = 'submitUpdatedEventDataAction'
export const setNewEvent: Action<Event> = 'setNewEventAction'
export const deleteEvent: Action<string> = 'deleteEventAction'