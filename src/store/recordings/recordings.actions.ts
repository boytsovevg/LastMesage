import { createAction } from '@reduxjs/toolkit';
import { RecordingDto } from './dto/recording';
import { recordingsReducerName } from './recordings.reducer';

export const addRecordingAction = createAction<RecordingDto>(
    `[${recordingsReducerName}] addRecordingAction`
);

export const removeRecordingAction = createAction<string>(
    `[${recordingsReducerName}] removeRecordingAction`
);
