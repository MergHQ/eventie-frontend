import {Action} from "./actionDispatcher"

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