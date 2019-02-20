import {Action} from "./actionDispatcher"

export const toggleEventModalAction: Action<{id: string, isOpen: boolean}> = 'toggleEventModalAction'
export const updateNewEventFormData: Action<any> = 'updateNewEventFormData'
export const submitFormDataAction: Action<any> = 'submitFormData'
export const updateLoginCreds: Action<any> = 'updateLoginCredsAction'
export const login: Action<any> = 'loginAction'
export const fetchUserDetails: Action<void> = 'fetchUserDetailsAction'