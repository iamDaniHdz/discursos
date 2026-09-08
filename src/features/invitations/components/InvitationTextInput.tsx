import { HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

interface InvitationTextInputProps {
  value: string;
  onChangeText: (value: string) => void;

  label?: string;
  externalLabel?: string;
  leftIcon?: ComponentProps<typeof TextInput.Icon>['icon'];

  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  maxLength?: number;
}

export function InvitationTextInput({
  value,
  onChangeText,
  label,
  externalLabel,
  leftIcon,
  error,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  disabled = false,
  maxLength,
}: InvitationTextInputProps): React.JSX.Element {
  const theme = useTheme();
  return (
    <View>
      {externalLabel && (
        <Text variant="labelLarge" style={styles.label}>
          {externalLabel}
        </Text>
      )}

      <TextInput
        mode="outlined"
        value={value}
        label={label}
        onChangeText={onChangeText}
        left={
          leftIcon ? (
            <TextInput.Icon icon={leftIcon} color={theme.colors.primary} />
          ) : undefined
        }
        error={Boolean(error)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
        maxLength={maxLength}
        outlineStyle={styles.input}
        theme={{
          colors: {
            primary: theme.colors.primary,
            outline: 'transparent',
          },
        }}
      />

      {error && (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      )}
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
    backgroundColor: '#FFF'
  },
});
