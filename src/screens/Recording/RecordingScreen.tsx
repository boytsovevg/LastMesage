import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { addSeconds, format, getTime } from 'date-fns';

import { FontAwesome } from '@expo/vector-icons';

import { useAppDispatch } from '../../store/store';
import { RecordingDto } from '../../store/recordings/dto/recording';
import { addRecordingAction } from '../../store/recordings/recordings.actions';

const getInitialTime = () => {
    const date = new Date();

    date.setMinutes(0);
    date.setSeconds(0);

    return date;
};

export type RecordingState = 'None' | 'InProgress' | 'Complete';

export const RecordingScreen = () => {
    const dispatch = useAppDispatch();

    const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>(undefined);
    const [recordingState, setRecordingState] = useState<RecordingState>('None');

    const [time, setTime] = useState<Date>(getInitialTime());

    const handlePressStart = () => {
        setTime(getInitialTime());
        setRecordingState('InProgress');

        const timerId: NodeJS.Timer = setInterval(() => {
            setTime(previousTime => addSeconds(previousTime, 1));
        }, 1000) ;

        setIntervalId(timerId);
    };
    const handlePressEnd = () => {
        setRecordingState('Complete');

        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(undefined);
        }

        const recordingDto: RecordingDto = {
            id: new Date().getTime(),
            title: 'New recording',
            duration: getTime(time)
        };

        dispatch(addRecordingAction(recordingDto));
    };


    return (
        <View style={ styles.container }>
            {
                recordingState !== 'None' && (
                    <Text style={styles.recordingTime}>
                        { format(time, 'mm:ss') }
                    </Text>
                )
            }

            <View style={ styles.element }>
                <TouchableOpacity
                    onPressIn={ handlePressStart }
                    onPressOut={ handlePressEnd }
                >
                    <FontAwesome
                        name={'microphone'}
                        size={100}
                        color={'#3BB371'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    element: {
        marginTop: 30,
    },
    recordingTime: {
        fontSize: 20
    }
});
