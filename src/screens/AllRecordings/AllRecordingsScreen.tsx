import { useSelector } from 'react-redux';
import { selectRecordings } from '../../store/recordings/recordings.selectors';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from "date-fns";
import React from 'react';

import { removeRecordingAction } from '../../store/recordings/recordings.actions';
import { useAppDispatch } from '../../store/store';

export const AllRecordingsScreen = () => {
    const dispatch = useAppDispatch();
    const recordings = useSelector(selectRecordings);

    const handlePressRecording = (recordingId: string) => dispatch(removeRecordingAction(recordingId));

    return (
        <View style={styles.container}>
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
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
