import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {SettingsScreen} from '../features/settings/screens/SettingsScreen';

const Stack =
  createNativeStackNavigator();

export function SettingsStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}