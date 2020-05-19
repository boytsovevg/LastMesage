import React from 'react';
import { useSelector } from 'react-redux';
import { selectRecordings } from '../../store/recordings/recordings.selectors';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { format } from "date-fns";

import { removeRecordingAction } from '../../store/recordings/recordings.actions';
import { useAppDispatch } from '../../store/store';

export const AllRecordingsScreen = () => {
    const dispatch = useAppDispatch();
    const recordings = useSelector(selectRecordings);

    const handlePressRecording = (recordingId: number) => dispatch(removeRecordingAction(recordingId));

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>My recordings</Text>
            <FlatList
                data={ recordings }
                keyExtractor={ item => item.id.toString() }
                renderItem={ ({ item }) =>
                    <TouchableOpacity onPress={ () => handlePressRecording(item.id) }>
                        <Text style={ styles.listItemText }>
                            { item.title } - { format(item.duration, 'mm:ss') }
                        </Text>
                    </TouchableOpacity>
                }
                style={ styles.list }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        color: '#333',
        fontSize: 30,
        fontFamily: 'Arial'
    },
    list: {
        marginTop: 30
    },
    listItemText: {
        fontSize: 20,
        color: '#333'
    }
});
