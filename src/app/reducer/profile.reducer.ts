import { Action } from '@ngrx/store'
import { IProfile } from '../models/IProfile'
import * as ProfileActions from '../actions/profile.actions'

export function reducer(state: IProfile, action: ProfileActions.Actions) {
    switch(action.type) {
        case ProfileActions.SET_PROFILE: 
            state = action.data
            return state
        default: 
            return state
    }
} 