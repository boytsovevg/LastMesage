import React from 'react';
import { RecordingScreen } from './src/screens/Recording/RecordingScreen';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

export default function App() {
    return (
        <Provider store={store}>
            <RecordingScreen />
        </Provider>
    );
}
