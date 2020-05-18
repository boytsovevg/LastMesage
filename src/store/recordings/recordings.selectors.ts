import { RootState } from '../rootReducer';
import { createSelector } from '@reduxjs/toolkit';

export const selectRecordingsState = (state: RootState) => state.recordings;

export const selectRecordings = createSelector(
    selectRecordingsState,
    state => state.recordings
);
