import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationTabs } from './src/components/NavigationTabs/NavigationTabs';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <NavigationTabs />
            </NavigationContainer>
        </Provider>
    );
}
