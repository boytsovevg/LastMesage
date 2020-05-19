import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Header = ({title}: {title: string}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ title }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#3BB371',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
