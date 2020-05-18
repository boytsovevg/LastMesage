import { combineReducers } from '@reduxjs/toolkit'
import { recordingsReducer, recordingsReducerName } from './recordings/recordings.reducer';

export const rootReducer = combineReducers({
    [recordingsReducerName]: recordingsReducer
})

export type RootState = ReturnType<typeof rootReducer>
