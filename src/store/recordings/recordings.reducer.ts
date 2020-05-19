import { RecordingDto } from './dto/recording';
import { createReducer } from '@reduxjs/toolkit';
import { addRecordingAction, removeRecordingAction } from './recordings.actions';

export interface RecordingsState {
    recordings: RecordingDto[];
}

const initialState: RecordingsState = {
    recordings: []
};

export const recordingsReducer = createReducer<RecordingsState>(
    initialState, builder =>
        builder
            .addCase(
                addRecordingAction, (state, action) => ({
                    ...state,
                    recordings: [...state.recordings, action.payload]
                })
            )
            .addCase(
                removeRecordingAction, (state, action) => ({
                    ...state,
                    recordings: state.recordings.filter(r => r.id !== action.payload)
                })
            )
);
