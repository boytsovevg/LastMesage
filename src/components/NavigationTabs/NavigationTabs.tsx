import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { RecordingScreen } from '../../screens/Recording/RecordingScreen';
import { AllRecordingsScreen } from '../../screens/AllRecordings/AllRecordingsScreen';

const Tab = createBottomTabNavigator()

export const NavigationTabs = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="AllRecordings"
            component={AllRecordingsScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <FontAwesome
                        name={'play'}
                        size={size}
                        color={color}
                    />
                )
            }}
        />
        <Tab.Screen
            name="Recording"
            component={RecordingScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <FontAwesome
                        name={'microphone'}
                        size={size}
                        color={color}
                    />
                )
            }}
        />
    </Tab.Navigator>
)
