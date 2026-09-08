import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import {HomeStackNavigator} from './HomeStackNavigator';
import {DiscoursesStackNavigator} from './DiscoursesStackNavigator';

import type {BottomTabParamList} from './navigation.types';
import { useTheme } from 'react-native-paper';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const {colors} = useTheme();

export function BottomTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'HomeStack':
              iconName = 'home';
              break;

            case 'DiscoursesStack':
              iconName = 'book-open-variant-outline';
              break;

            default:
              iconName = 'help-circle';
          }

          return (
            <MaterialDesignIcons
              name={iconName}
              color={color}
              size={size}
            />
          );
        },
      })}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Inicio',
        }}
      />

      <Tab.Screen
        name="DiscoursesStack"
        component={DiscoursesStackNavigator}
        options={{
          title: 'Discursos',
        }}
      />
    </Tab.Navigator>
  );
}