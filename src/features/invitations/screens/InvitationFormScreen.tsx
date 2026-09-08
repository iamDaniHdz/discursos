import React, { useState } from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button, Text, useTheme } from 'react-native-paper';

import { FormSection } from '../components/FormSection';
import { InvitationDateField } from '../components/InvitationDateField';
import { InvitationTextInput } from '../components/InvitationTextInput';
import { InvitationTimeField } from '../components/InvitationTimeField';

import type { InvitationDraft } from '../models/invitation.types';

import type { InvitationFormScreenProps } from '../../../navigation/navigation.types';

const INITIAL_FORM: InvitationDraft = {
  outlineNumber: '',
  topic: '',
  speechDate: '',
  speechTime: '',
  hostCongregation: '',
  speakerName: '',
  speakerCongregation: '',
  speakerContact: '',
};

export function InvitationFormScreen({
  navigation,
}: InvitationFormScreenProps): React.JSX.Element {
  const [form, setForm] = useState<InvitationDraft>(INITIAL_FORM);

  const theme = useTheme();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const datePickerValue = form.speechDate
    ? new Date(`${form.speechDate}T12:00:00`)
    : new Date();

  const timePickerValue = form.speechTime
    ? new Date(`2000-01-01T${form.speechTime}:00`)
    : new Date();

  const updateField = <K extends keyof InvitationDraft>(
    field: K,
    value: InvitationDraft[K],
  ): void => {
    setForm(previous => ({
      ...previous,
      [field]: value,
    }));
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');

    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const handleDateChange = (_: unknown, selectedDate?: Date): void => {
    setShowDatePicker(false);

    if (!selectedDate) {
      return;
    }

    updateField('speechDate', formatDate(selectedDate));
  };

  const handleTimeChange = (_: unknown, selectedTime?: Date): void => {
    setShowTimePicker(false);

    if (!selectedTime) {
      return;
    }

    updateField('speechTime', formatTime(selectedTime));
  };

  const handleOpenDatePicker = (): void => {
    setShowDatePicker(true);
  };

  const handleOpenTimePicker = (): void => {
    setShowTimePicker(true);
  };

    const handleSubmit = (): void => {
    navigation.navigate(
        'InvitationPreview',
        {
        invitation: form,
        },
    );
    };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <FormSection title="Datos del discurso">
        <InvitationTextInput
            externalLabel="Congregación anfitriona"
            value={form.hostCongregation}
            onChangeText={value =>
                updateField('hostCongregation', value)
            }
            leftIcon="account"
        />    

        <InvitationTextInput
          externalLabel="Número de bosquejo"
          value={form.outlineNumber}
          onChangeText={value => updateField('outlineNumber', value)}
          leftIcon="book"
        />

        <InvitationTextInput
          externalLabel="Tema"
          value={form.topic}
          onChangeText={value => updateField('topic', value)}
          leftIcon="book"
        />

        <InvitationDateField
          externalLabel="Fecha del discurso"
          value={form.speechDate}
          onPress={handleOpenDatePicker}
        />

        <InvitationTimeField
          externalLabel="Hora del discurso"
          value={form.speechTime}
          onPress={handleOpenTimePicker}
        />
      </FormSection>

      <FormSection title="Datos del orador">
        <InvitationTextInput
          externalLabel="Nombre del orador"
          value={form.speakerName}
          onChangeText={value => updateField('speakerName', value)}
          leftIcon="account"
        />

        <InvitationTextInput
          externalLabel="Congregación del orador"
          value={form.speakerCongregation}
          onChangeText={value => updateField('speakerCongregation', value)}
          leftIcon="account"
        />

        <InvitationTextInput
          externalLabel="Contacto del orador"
          value={form.speakerContact}
          onChangeText={value => updateField('speakerContact', value)}
          leftIcon="account"
        />
      </FormSection>

      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        Continuar
      </Button>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={datePickerValue}
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={timePickerValue}
          onChange={handleTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },

  submitButton: {
    marginTop: 24,
    marginBottom: 24,
  },
});
