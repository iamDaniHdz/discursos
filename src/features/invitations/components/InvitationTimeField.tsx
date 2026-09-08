import React from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

interface InvitationTimeFieldProps {
  label?: string;
  value: string;
  onPress: () => void;
  error?: string;
  disabled?: boolean;
  externalLabel?: string;
}

export function InvitationTimeField({
  label,
  value,
  onPress,
  error,
  disabled = false,
  externalLabel,
}: InvitationTimeFieldProps): React.JSX.Element {
  return (
    <View>
      {externalLabel ? (
        <Text variant="labelMedium" style={styles.label}>
          {externalLabel}
        </Text>
      ) : null}

      <Pressable onPress={onPress} disabled={disabled}>
        <TextInput
          mode="outlined"
          label={label}
          value={value}
          editable={false}
          disabled={disabled}
          pointerEvents="none"
          error={Boolean(error)}
          left={<TextInput.Icon icon="clock-outline" />}
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
