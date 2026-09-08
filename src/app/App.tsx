import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

export function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.container} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});