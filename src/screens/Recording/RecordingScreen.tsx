import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, FlatList, TouchableOpacity } from 'react-native';
import { addSeconds, format, getTime } from 'date-fns';

import { v4 as uuid } from 'uuid';

import MicrophoneIcon from '../../../assets/icons/mic.svg';
import { useAppDispatch } from '../../store/store';
import { RecordingDto } from '../../store/recordings/dto/recording';
import { addRecordingAction, remoteRecordingAction } from '../../store/recordings/recordings.actions';
import { useSelector } from 'react-redux';
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
    const recordings = useSelector(selectRecordings);

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

    const handlePressRecording = (recordingId: string) => dispatch(remoteRecordingAction(recordingId));

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
                    <MicrophoneIcon
                        width={ 100 }
                        height={ 100 }
                    />
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.element}>
                <FlatList
                    data={ recordings }
                    keyExtractor={item => item.id}
                    renderItem={ ({ item }) =>
                        <TouchableOpacity onPress={() => handlePressRecording(item.id)}>
                            <Text>{ item.title } - { format(item.duration, 'mm:ss') }</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    element: {
        marginTop: 30,
    },
});
