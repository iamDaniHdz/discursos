import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function InvitationFormScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>InvitationFormScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});