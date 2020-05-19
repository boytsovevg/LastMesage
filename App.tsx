import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';

import { NavigationTabs } from './src/components/NavigationTabs/NavigationTabs';
import { StyleSheet, View } from 'react-native';
import { Header } from './src/components/Header/Header';

export default function App() {
    return (
        <View style={ styles.container }>
            <Provider store={ store }>
                <Header title='Last Message'/>
                <NavigationContainer>
                    <NavigationTabs/>
                </NavigationContainer>
            </Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

