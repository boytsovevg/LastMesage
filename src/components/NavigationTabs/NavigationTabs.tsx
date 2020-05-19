import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';

import { RecordingScreen } from '../../screens/Recording/RecordingScreen';
import { AllRecordingsScreen } from '../../screens/AllRecordings/AllRecordingsScreen';

const Tab = createBottomTabNavigator()

export const NavigationTabs = () => (
    <Tab.Navigator
        tabBarOptions={{
            showLabel: false,
        }}
    >
        <Tab.Screen
            name="AllRecordings"
            component={AllRecordingsScreen}
            options={{
                tabBarIcon: ({color, size}) => (
                    <Icon
                        name='play'
                        type='font-awesome'
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
                    <Icon
                        name='microphone'
                        type='font-awesome'
                        size={size}
                        color={color}
                    />
                )
            }}
        />
    </Tab.Navigator>
)
