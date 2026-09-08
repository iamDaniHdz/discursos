import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

interface InvitationDateFieldProps {
  label?: string;
  value: string;
  onPress: () => void;
  error?: string;
  externalLabel?: string;
}

export function InvitationDateField({
  value,
  onPress,
  error,
  externalLabel,
}: InvitationDateFieldProps): React.JSX.Element {
  return (
    <View>
      {externalLabel ? (
        <Text variant="labelMedium" style={styles.label}>
          {externalLabel}
        </Text>
      ) : null}

      <Pressable onPress={onPress}>
        <TextInput
          mode="outlined"
          value={value}
          editable={false}
          pointerEvents="none"
          left={<TextInput.Icon icon="calendar-outline" />}
          error={Boolean(error)}
        />
      </Pressable>

      {error ? (
        <Text variant="bodySmall" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },

  error: {
    color: '#BA1A1A',
    marginTop: 4,
    marginLeft: 12,
  },
});
