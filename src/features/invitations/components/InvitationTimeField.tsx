import React from 'react';

import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

interface InvitationTimeFieldProps {
  value: string;
  placeholder?: string;
  onPress: () => void;
  error?: string;
  externalLabel?: string;
}

export function InvitationTimeField({
  value,
  placeholder,
  onPress,
  error,
  externalLabel,
}: InvitationTimeFieldProps): React.JSX.Element {
  const theme = useTheme();

  return (
    <View>
      {externalLabel ? (
        <Text
          variant="labelLarge"
          style={styles.label}>
          {externalLabel}
        </Text>
      ) : null}

      <Pressable onPress={onPress}>
        <TextInput
          mode="outlined"
          placeholder={placeholder}
          placeholderTextColor={'#97A4AF'}
          value={value}
          editable={false}
          pointerEvents="none"
          left={
            <TextInput.Icon
              icon="clock-outline"
              color={theme.colors.primary}
            />
          }
          error={Boolean(error)}
          outlineStyle={styles.input}
          theme={{
            colors: {
              primary: theme.colors.primary,
              outline: 'transparent',
            },
          }}
        />
      </Pressable>

      {error ? (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
});