import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {BottomTabNavigator} from './BottomTabNavigator';

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}