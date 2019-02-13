import {Action} from "./actionDispatcher"

export const toggleEventModalAction: Action<{id: string, isOpen: boolean}> = 'toggleEventModalAction'
export const updateNewEventFormData: Action<any> = 'updateNewEventFormData'
export const submitFormDataAction: Action<any> = 'submitFormData'