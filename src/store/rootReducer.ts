import { combineReducers } from '@reduxjs/toolkit'
import { recordingsReducer } from './recordings/recordings.reducer';

export const rootReducer = combineReducers({
    recordings: recordingsReducer
})

export type RootState = ReturnType<typeof rootReducer>
