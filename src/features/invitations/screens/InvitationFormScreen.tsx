import React, { useState } from 'react';

import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Button, Text, useTheme } from 'react-native-paper';

import { FormSection } from '../components/FormSection';
import { InvitationDateField } from '../components/InvitationDateField';
import { InvitationTextInput } from '../components/InvitationTextInput';
import { InvitationTimeField } from '../components/InvitationTimeField';

import type { InvitationDraft } from '../models/invitation.types';

import type { InvitationFormScreenProps } from '../../../navigation/navigation.types';
import speeches from '../../../data/speeches.json';
import speakers from '../../../data/speakers.json';
import type {Speaker} from '../models/speaker.types';

import groups from '../../../data/groups.json';

import type {
  Group,
} from '../models/group.types';

import {
  formatDisplayDate,
  formatDisplayTime,
} from '../utils/date.utils';

const INITIAL_FORM: InvitationDraft = {
  speechNumber: '',
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

  const selectedSpeech = speeches[form.speechNumber];

  const [error, setError] = useState('');

  const [speakerSuggestions, setSpeakerSuggestions] = useState<Speaker[]>([]);

  const [groupSuggestions, setGroupSuggestions] = useState<Group[]>([]);

  const datePickerValue = form.speechDate
    ? new Date(`${form.speechDate}T12:00:00`)
    : new Date();

  const timePickerValue = form.speechTime
    ? new Date(`2000-01-01T${form.speechTime}:00`)
    : new Date();

  const isFormValid =
    form.hostCongregation.trim().length > 0 &&
    form.speechNumber.trim().length > 0 &&
    form.topic.trim().length > 0 &&
    form.speechDate.trim().length > 0 &&
    form.speechTime.trim().length > 0 &&
    form.speakerName.trim().length > 0 &&
    form.speakerCongregation.trim().length > 0 &&
    form.speakerContact.trim().length > 0;

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

  const [speechSuggestions, setSpeechSuggestions] =
    useState<
      {
        speechNumber: string;
        title: string;
      }[]
    >([]);

  const handleGroupChange = (
    value: string,
  ): void => {
    updateField(
      'hostCongregation',
      value,
    );

    if (value.trim().length < 2) {
      setGroupSuggestions([]);

      return;
    }

    const matches = (
      groups as Group[]
    )
      .filter(group =>
        group.name
          .toLowerCase()
          .includes(
            value.toLowerCase(),
          ),
      )
      .slice(0, 5);

    setGroupSuggestions(matches);
  };

  const handleGroupSelect = (
    group: Group,
  ): void => {
    updateField(
      'hostCongregation',
      group.name,
    );

    setGroupSuggestions([]);
  };

  const handleSubmit = (): void => {
    if (!isFormValid) {
      setError('Completa todos los datos')
      setTimeout(() => {
        setError('')
      }, 3000);
      
      return;
  }

  const invitation: InvitationDraft = {
      ...form,
      speechNumber: form.speechNumber.trim(),
      topic: form.topic.trim(),
      hostCongregation: form.hostCongregation.trim(),
      speakerName: form.speakerName.trim(),
      speakerCongregation: form.speakerCongregation.trim(),
      speakerContact: form.speakerContact.trim(),
    };

    navigation.navigate('InvitationPreview', {
      invitation,
    });
  };

  const handleSpeechChange = (
    value: string,
  ): void => {
    updateField(
      'speechNumber',
      value,
    );

    // Si borra completamente el número
    if (!value.trim()) {
      updateField('topic', '');

      setSpeechSuggestions([]);

      return;
    }

    const matches = Object.entries(speeches)
      .filter(([speechNumber]) =>
        speechNumber.startsWith(value),
      )
      .slice(0, 5)
      .map(([speechNumber, speech]) => ({
        speechNumber,
        title: speech.title,
      }));

    setSpeechSuggestions(matches);
  };

  const handleSpeechSelect = (
    speech: {
      speechNumber: string;
      title: string;
    },
  ): void => {
    updateField(
      'speechNumber',
      speech.speechNumber,
    );

    updateField(
      'topic',
      speech.title,
    );

    setSpeechSuggestions([]);
  };

  const handleSpeakerChange = (
    value: string,
  ): void => {
    updateField(
      'speakerName',
      value,
    );

    // Si el usuario borra el nombre completo
    if (!value.trim()) {
      updateField(
        'speakerCongregation',
        '',
      );

      updateField(
        'speakerContact',
        '',
      );

      setSpeakerSuggestions([]);

      return;
    }

    const matches = (
      speakers as Speaker[]
    )
      .filter(speaker =>
        speaker.active &&
        speaker.name
          .toLowerCase()
          .includes(value.toLowerCase()),
      )
      .slice(0, 5);

    setSpeakerSuggestions(matches);
  };

  const handleSpeakerSelect = (
    speaker: Speaker,
  ): void => {
    updateField(
      'speakerName',
      speaker.name,
    );

    updateField(
      'speakerCongregation',
      speaker.congregation,
    );

    updateField(
      'speakerContact',
      speaker.contact,
    );

    setSpeakerSuggestions([]);
  };


  return (
    <ScrollView
      contentContainerStyle={[styles.container, {backgroundColor: theme.colors.background}]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <FormSection title="Datos del discurso">
        <InvitationTextInput
          externalLabel="Congregación anfitriona"
          placeholder="Congregación"
          value={form.hostCongregation}
          onChangeText={handleGroupChange}
          leftIcon="account-group-outline"
        />

        {groupSuggestions.length > 0 && (
          <View style={styles.suggestions}>
            {groupSuggestions.map(group => (
              <Pressable
                key={group.id}
                style={styles.suggestionItem}
                onPress={() =>
                  handleGroupSelect(group)
                }>
                <Text
                  variant="titleMedium"
                  style={styles.suggestionName}>
                  {group.name}
                </Text>

                <Text
                  variant="bodySmall"
                  style={styles.suggestionCongregation}>
                  {group.address}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <InvitationTextInput
          externalLabel="Número de bosquejo"
          placeholder="0"
          value={form.speechNumber}
          onChangeText={handleSpeechChange}
          keyboardType="numeric"
          leftIcon="book-outline"
        />

        {speechSuggestions.length > 0 && (
        <View style={styles.suggestions}>
          {speechSuggestions.map(speech => (
            <Pressable
              key={speech.speechNumber}
              style={styles.suggestionItem}
              onPress={() =>
                handleSpeechSelect(speech)
              }>
              <Text style={styles.suggestionName}>
                {speech.speechNumber}
              </Text>

              <Text
                style={
                  styles.suggestionCongregation
                }>
                {speech.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

        <InvitationTextInput
          externalLabel="Tema"
          placeholder="Tema"
          value={form.topic}
          //disabled={Boolean(selectedSpeech)}
          onChangeText={value =>
            updateField('topic', value)
          }
          leftIcon="text-long"
        />

        <InvitationDateField
          externalLabel="Fecha del discurso"
          placeholder='DD/MMMM/YYYY'
          value={formatDisplayDate(
            form.speechDate,
          )}
          onPress={handleOpenDatePicker}
        />

        <InvitationTimeField
          externalLabel="Hora del discurso"
          placeholder='HH:MM'
          value={formatDisplayTime(
            form.speechTime,
          )}
          onPress={handleOpenTimePicker}
        />
      </FormSection>

      <FormSection title="Datos del orador">
        <InvitationTextInput
          externalLabel="Nombre del orador"
          placeholder="Nombre"
          value={form.speakerName}
          onChangeText={handleSpeakerChange}
          leftIcon="account-outline"
        />

        {speakerSuggestions.length > 0 && 
        <View style={styles.suggestions}>
          {speakerSuggestions.map(speaker => (
            <Pressable
              key={speaker.id}
              style={styles.suggestionItem}
              onPress={() =>
                handleSpeakerSelect(speaker)
              }>
              <Text
                variant="titleMedium"
                style={styles.suggestionName}>
                {speaker.name}
              </Text>

              <Text
                variant="bodySmall"
                style={
                  styles.suggestionCongregation
                }>
                {speaker.congregation}
              </Text>
            </Pressable>
          ))}
        </View>
        }

        <InvitationTextInput
          externalLabel="Congregación del orador"
          placeholder="Congregación"
          //disabled={Boolean(form.speakerName)}
          value={form.speakerCongregation}
          onChangeText={value => updateField('speakerCongregation', value)}
          leftIcon="account-group-outline"
        />

        <InvitationTextInput
          externalLabel="Contacto del orador"
          placeholder="999 999 9999"
          //disabled={Boolean(form.speakerName)}
          value={form.speakerContact}
          onChangeText={value => updateField('speakerContact', value)}
          leftIcon="phone-outline"
        />
      </FormSection>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}

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
          minimumDate={new Date()}
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

  suggestions: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderColor: '#E5E9F7',

    overflow: 'hidden',
  },

  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: '#F2F4FA',
  },

  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
  },

  suggestionCongregation: {
    marginTop: 2,
    fontSize: 13,
    color: '#7A7A9D',
  },

  errorContainer: {
    backgroundColor: '#FEECEC',
    borderWidth: 1,
    borderColor: '#F5B8B8',
    borderRadius: 12,

    paddingVertical: 12,
    paddingHorizontal: 16,

    marginTop: 8,
  },

  errorText: {
    color: '#BA1A1A',
    fontSize: 14,
    fontWeight: '500',
  },
});
