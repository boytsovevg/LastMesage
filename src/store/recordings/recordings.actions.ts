import { createAction } from '@reduxjs/toolkit';
import { RecordingDto } from './dto/recording';

export const addRecordingAction = createAction<RecordingDto>(
    `[recordings] addRecordingAction`
);

export const removeRecordingAction = createAction<number>(
    `[recordings] removeRecordingAction`
);
