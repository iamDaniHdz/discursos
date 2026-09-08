import React from 'react';

import {StatusBar} from 'react-native';

import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from '../navigation/AppNavigator';
import {appTheme} from '../theme';

export function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={appTheme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={appTheme.colors.background}
        />

        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
``