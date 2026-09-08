import React from 'react';

import {StyleSheet, View} from 'react-native';

import {Text} from 'react-native-paper';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export function FormSection({
  title,
  children,
}: FormSectionProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text
        variant="headlineSmall"
        style={styles.title}>
        {title}
      </Text>

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  title: {
    marginBottom: 16,
    fontWeight: '600',
  },

  content: {
    gap: 16,
  },
});
