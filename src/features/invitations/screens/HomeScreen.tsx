import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from 'react-native-paper';

export function HomeScreen(): React.JSX.Element {
  const theme = useTheme();
  return (
    <>
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text>Home Screen</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});