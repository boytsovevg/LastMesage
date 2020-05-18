import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { addSeconds, format, getTime } from 'date-fns';

import { FontAwesome } from '@expo/vector-icons';

import { v4 as uuid } from 'uuid';

import { useAppDispatch } from '../../store/store';
import { RecordingDto } from '../../store/recordings/dto/recording';
import { addRecordingAction } from '../../store/recordings/recordings.actions';
import { selectRecordings } from '../../store/recordings/recordings.selectors';

const getInitialTime = () => {
    const date = new Date();

    date.setMinutes(0);
    date.setSeconds(0);

    return date;
};

export type RecordingState = 'None' | 'InProgress' | 'Complete';

export const RecordingScreen = () => {
    const dispatch = useAppDispatch();

    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const [recordingState, setRecordingState] = useState<RecordingState>('None');

    const [time, setTime] = useState<Date>(getInitialTime());

    const handlePressStart = () => {
        setTime(getInitialTime());
        setRecordingState('InProgress');

        const intervalId = setInterval(() => {
            setTime(previousTime => addSeconds(previousTime, 1));
        }, 1000);

        setIntervalId(intervalId);
    };
    const handlePressEnd = () => {
        setRecordingState('Complete');

        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(undefined);
        }

        const recordingDto: RecordingDto = {
            id: uuid(),
            title: 'New recording',
            duration: getTime(time)
        };

        dispatch(addRecordingAction(recordingDto));
    };


    return (
        <View style={ styles.container }>
            {
                recordingState !== 'None' && (
                    <Text>
                        { format(time, 'mm:ss') }
                    </Text>
                )
            }

            <View style={ styles.element }>
                <TouchableWithoutFeedback
                    onPressIn={ handlePressStart }
                    onPressOut={ handlePressEnd }
                >
                    <FontAwesome
                        name={'microphone'}
                        size={100}
                    />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    element: {
        marginTop: 30,
    },
});
