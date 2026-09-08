import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function InvitationPreviewScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>InvitationPreviewScreen</Text>
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