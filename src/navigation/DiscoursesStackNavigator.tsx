import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {DiscoursesScreen} from '../features/invitations/screens/DiscoursesScreen';
import {InvitationFormScreen} from '../features/invitations/screens/InvitationFormScreen';
import {InvitationPreviewScreen} from '../features/invitations/screens/InvitationPreviewScreen';

import type {DiscoursesStackParamList} from './navigation.types';

const Stack = createNativeStackNavigator<DiscoursesStackParamList>();

export function DiscoursesStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Discourses"
      screenOptions={{
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Discourses"
        component={DiscoursesScreen}
        options={{
          title: 'Discursos',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="InvitationForm"
        component={InvitationFormScreen}
        options={{
          title: 'Nueva invitación',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F9F9FF',
          },
        }}
      />

      <Stack.Screen
        name="InvitationPreview"
        component={InvitationPreviewScreen}
        options={{
          title: 'Vista previa',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F9F9FF',
          },
        }}
      />
    </Stack.Navigator>
  );
}