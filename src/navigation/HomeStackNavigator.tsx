import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../features/invitations/screens/HomeScreen';

import type {HomeStackParamList} from './navigation.types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
        }}
      />
    </Stack.Navigator>
  );
}