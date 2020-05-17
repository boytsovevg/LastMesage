import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { addSeconds, format } from 'date-fns';

import MicrophoneIcon from '../../../assets/icons/mic.svg';

const getInitialTime = () => {
    const date = new Date();

    date.setMinutes(0);
    date.setSeconds(0);

    return date;
}

export type RecordingState = 'None' | 'InProgress' | 'Complete';

export const RecordingScreen = () => {
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const [recordingState, setRecordingState] = useState<RecordingState>('None');

    const [time, setTime] = useState<Date>(getInitialTime());

    const handlePressStart = () => {
        setRecordingState('InProgress');

        const intervalId = setInterval(() => {
            setTime(previousTime => addSeconds(previousTime, 1));
        }, 1000);

        setIntervalId(intervalId);
    }
    const handlePressEnd = () => {
        setRecordingState('Complete');

        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(undefined);
            setTime(getInitialTime())
        }
    }

    return (
        <View style={ styles.container }>
            {
                recordingState !== 'None' && (
                    <Text>
                        { format(time, 'mm:ss') }
                    </Text>
                )
            }

            <View style={styles.recordButton}>
                <TouchableWithoutFeedback
                    onPressIn={ handlePressStart }
                    onPressOut={ handlePressEnd }
                >
                    <MicrophoneIcon
                        width={100}
                        height={100}
                    />
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordButton: {
        marginTop: 50,
        color: '#333'
    },
});
