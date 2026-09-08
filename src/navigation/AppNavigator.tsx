// src/navigation/AppNavigator.tsx

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  InvitationFormScreen,
  InvitationPreviewScreen,
} from '../features/invitations/screens';

import type {RootStackParamList} from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
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

        <Stack.Screen
          name="InvitationForm"
          component={InvitationFormScreen}
          options={{
            title: 'Nueva invitación',
          }}
        />

        <Stack.Screen
          name="InvitationPreview"
          component={InvitationPreviewScreen}
          options={{
            title: 'Vista previa',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}