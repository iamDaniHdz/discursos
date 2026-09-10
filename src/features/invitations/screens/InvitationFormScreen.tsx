import React, {useState} from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Button,
  SegmentedButtons,
  Text,
  useTheme,
} from 'react-native-paper';

import {FormSection} from '../components/FormSection';
import {InvitationDateField} from '../components/InvitationDateField';
import {InvitationTextInput} from '../components/InvitationTextInput';
import {InvitationTimeField} from '../components/InvitationTimeField';

import type {InvitationDraft} from '../models/invitation.types';
import type {Group} from '../models/group.types';
import type {Speaker} from '../models/speaker.types';

import type {
  InvitationFormScreenProps,
} from '../../../navigation/navigation.types';

import groupsJson from '../../../data/groups.json';
import speakersJson from '../../../data/speakers.json';
import speechesJson from '../../../data/speeches.json';

import {
  formatDisplayDate,
  formatDisplayTime,
} from '../utils/date.utils';

interface Speech {
  title: string;
  active: boolean;
}

type SpeechDictionary = Record<string, Speech>;

interface SpeechSuggestion {
  speechNumber: string;
  title: string;
}

type FormSectionName = 'speech' | 'speaker';

const speeches = speechesJson as SpeechDictionary;
const speakers = speakersJson as Speaker[];
const groups = groupsJson as Group[];

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
  const theme = useTheme();

  const [form, setForm] =
    useState<InvitationDraft>(INITIAL_FORM);

  const [activeSection, setActiveSection] =
    useState<FormSectionName>('speech');

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [showTimePicker, setShowTimePicker] =
    useState(false);

  const [error, setError] =
    useState('');

  const [speechSuggestions, setSpeechSuggestions] =
    useState<SpeechSuggestion[]>([]);

  const [speakerSuggestions, setSpeakerSuggestions] =
    useState<Speaker[]>([]);

  const [groupSuggestions, setGroupSuggestions] =
    useState<Group[]>([]);

  const datePickerValue = form.speechDate
    ? new Date(`${form.speechDate}T12:00:00`)
    : new Date();

  const timePickerValue = form.speechTime
    ? new Date(`2000-01-01T${form.speechTime}:00`)
    : new Date();

  const isSpeechSectionValid =
    form.hostCongregation.trim().length > 0 &&
    form.speechNumber.trim().length > 0 &&
    form.topic.trim().length > 0 &&
    form.speechDate.trim().length > 0 &&
    form.speechTime.trim().length > 0;

  const isSpeakerSectionValid =
    form.speakerName.trim().length > 0 &&
    form.speakerCongregation.trim().length > 0 &&
    form.speakerContact.trim().length > 0;

  const isFormValid =
    isSpeechSectionValid &&
    isSpeakerSectionValid;

  const updateField = <K extends keyof InvitationDraft>(
    field: K,
    value: InvitationDraft[K],
  ): void => {
    setForm(previous => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const showError = (
    message: string,
  ): void => {
    setError(message);
  };

  const formatDate = (
    date: Date,
  ): string => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1,
    ).padStart(2, '0');

    const day = String(
      date.getDate(),
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatTime = (
    date: Date,
  ): string => {
    const hours = String(
      date.getHours(),
    ).padStart(2, '0');

    const minutes = String(
      date.getMinutes(),
    ).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const handleDateChange = (
    _: unknown,
    selectedDate?: Date,
  ): void => {
    setShowDatePicker(false);

    if (!selectedDate) {
      return;
    }

    updateField(
      'speechDate',
      formatDate(selectedDate),
    );
  };

  const handleTimeChange = (
    _: unknown,
    selectedTime?: Date,
  ): void => {
    setShowTimePicker(false);

    if (!selectedTime) {
      return;
    }

    updateField(
      'speechTime',
      formatTime(selectedTime),
    );
  };

  const handleOpenDatePicker = (): void => {
    setShowDatePicker(true);
  };

  const handleOpenTimePicker = (): void => {
    setShowTimePicker(true);
  };

  const handleGroupChange = (
    value: string,
  ): void => {
    updateField(
      'hostCongregation',
      value,
    );

    const normalizedValue =
      value.trim().toLocaleLowerCase('es-MX');

    if (normalizedValue.length < 2) {
      setGroupSuggestions([]);

      return;
    }

    const matches = groups
      .filter(group =>
        group.name
          .toLocaleLowerCase('es-MX')
          .includes(normalizedValue),
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

  const handleSpeechChange = (
    value: string,
  ): void => {
    updateField(
      'speechNumber',
      value,
    );

    if (!value.trim()) {
      updateField('topic', '');
      setSpeechSuggestions([]);

      return;
    }

    /*
     * El tema se limpia cuando el usuario modifica
     * el número, pero solamente se autocompleta al
     * seleccionar una opción de la lista.
     */
    updateField('topic', '');

    const matches = Object.entries(speeches)
      .filter(
        ([speechNumber, speech]) =>
          speech.active &&
          speechNumber.startsWith(value),
      )
      .sort(
        ([firstNumber], [secondNumber]) =>
          Number(firstNumber) -
          Number(secondNumber),
      )
      .slice(0, 5)
      .map(
        ([
          speechNumber,
          speech,
        ]): SpeechSuggestion => ({
          speechNumber,
          title: speech.title,
        }),
      );

    setSpeechSuggestions(matches);
  };

  const handleSpeechSelect = (
    speech: SpeechSuggestion,
  ): void => {
    setForm(previous => ({
      ...previous,
      speechNumber:
        speech.speechNumber,
      topic: speech.title,
    }));

    setSpeechSuggestions([]);
    setError('');
  };

  const handleSpeakerChange = (
    value: string,
  ): void => {
    setForm(previous => ({
      ...previous,
      speakerName: value,
      speakerCongregation: '',
      speakerContact: '',
    }));

    if (error) {
      setError('');
    }

    const normalizedValue =
      value.trim().toLocaleLowerCase('es-MX');

    if (normalizedValue.length < 2) {
      setSpeakerSuggestions([]);

      return;
    }

    const matches = speakers
      .filter(
        speaker =>
          speaker.active &&
          speaker.name
            .toLocaleLowerCase('es-MX')
            .includes(normalizedValue),
      )
      .slice(0, 5);

    setSpeakerSuggestions(matches);
  };

  const handleSpeakerSelect = (
    speaker: Speaker,
  ): void => {
    setForm(previous => ({
      ...previous,
      speakerName: speaker.name,
      speakerCongregation:
        speaker.congregation,
      speakerContact: speaker.contact,
    }));

    setSpeakerSuggestions([]);
    setError('');
  };

  const handleNextSection = (): void => {
    if (!isSpeechSectionValid) {
      showError(
        'Completa todos los datos del discurso.',
      );

      return;
    }

    setError('');
    setGroupSuggestions([]);
    setSpeechSuggestions([]);
    setActiveSection('speaker');
  };

  const handlePreviousSection = (): void => {
    setError('');
    setSpeakerSuggestions([]);
    setActiveSection('speech');
  };

  const handleSectionChange = (
    value: string,
  ): void => {
    if (
      value !== 'speech' &&
      value !== 'speaker'
    ) {
      return;
    }

    if (value == 'speaker' && !isSpeechSectionValid) {
      showError(
        'Completa todos los datos del discurso.',
      );

      return;
    }

    setError('');
    setGroupSuggestions([]);
    setSpeechSuggestions([]);
    setSpeakerSuggestions([]);
    setActiveSection(value);
  };

  const handleSubmit = (): void => {
    if (!isSpeechSectionValid) {
      setActiveSection('speech');

      showError(
        'Completa todos los datos del discurso.',
      );

      return;
    }

    if (!isSpeakerSectionValid) {
      setActiveSection('speaker');

      showError(
        'Completa todos los datos del orador.',
      );

      return;
    }

    if (!isFormValid) {
      showError(
        'Completa todos los datos.',
      );

      return;
    }

    const invitation: InvitationDraft = {
      ...form,
      speechNumber:
        form.speechNumber.trim(),
      topic: form.topic.trim(),
      speechDate:
        form.speechDate.trim(),
      speechTime:
        form.speechTime.trim(),
      hostCongregation:
        form.hostCongregation.trim(),
      speakerName:
        form.speakerName.trim(),
      speakerCongregation:
        form.speakerCongregation.trim(),
      speakerContact:
        form.speakerContact.trim(),
    };

    navigation.navigate(
      'InvitationPreview',
      {
        invitation,
      },
    );
  };

  const renderError = (): React.JSX.Element | null => {
    if (!error) {
      return null;
    }

    return (
      <View
        style={[
          styles.errorContainer,
          {
            backgroundColor:
              theme.colors.errorContainer,
            borderColor:
              theme.colors.errorContainer,
          },
        ]}>
        <Text
          variant="bodyMedium"
          style={[
            styles.errorText,
            {
              color:
                theme.colors
                  .error,
            },
          ]}>
          {error}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor:
            theme.colors.background,
        },
      ]}>
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <SegmentedButtons
          value={activeSection}
          onValueChange={
            handleSectionChange
          }
          buttons={[
            {
              value: 'speech',
              label: 'Discurso',
              icon: 'book-outline',
            },
            {
              value: 'speaker',
              label: 'Orador',
              icon: 'account-outline',
            },
          ]}
          theme={{
            colors: {
              outline: '#D6DDEF',
              secondaryContainer: '#DCE8FF', // fondo del seleccionado
              onSecondaryContainer: '#1D4ED8', // texto e icono seleccionado
              },
            }}
          style={styles.segmentedButtons}
        />

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressItem,
              {
                backgroundColor:
                  activeSection === 'speech'
                    ? theme.colors.primary
                    : '#DCE8FF',
              },
            ]}
          />

          <View
            style={[
              styles.progressItem,
              {
                backgroundColor:
                  activeSection === 'speaker'
                    ? theme.colors.primary
                    : '#DCE8FF',
              },
            ]}
          />
        </View>

        {activeSection === 'speech' ? (
          <>
            <FormSection title="Datos del discurso">
              <InvitationTextInput
                externalLabel="Congregación anfitriona"
                placeholder="Congregación"
                value={
                  form.hostCongregation
                }
                onChangeText={
                  handleGroupChange
                }
                leftIcon="account-group-outline"
              />

              {groupSuggestions.length > 0 ? (
                <View
                  style={[
                    styles.suggestions,
                    {
                      backgroundColor:
                        theme.colors.surface,
                    },
                  ]}>
                  {groupSuggestions.map(
                    (group, index) => {
                      const isLast =
                        index ===
                        groupSuggestions.length -
                          1;

                      return (
                        <Pressable
                          key={group.id}
                          style={[
                            styles.suggestionItem,
                            isLast &&
                              styles.suggestionItemLast,
                          ]}
                          onPress={() =>
                            handleGroupSelect(
                              group,
                            )
                          }>
                          <Text
                            variant="titleMedium"
                            style={
                              styles.suggestionName
                            }>
                            {group.name}
                          </Text>

                          <Text
                            variant="bodySmall"
                            numberOfLines={2}
                            style={
                              styles.suggestionDescription
                            }>
                            {group.address}
                          </Text>
                        </Pressable>
                      );
                    },
                  )}
                </View>
              ) : null}

              <InvitationTextInput
                externalLabel="Número de bosquejo"
                placeholder="0"
                value={form.speechNumber}
                onChangeText={
                  handleSpeechChange
                }
                keyboardType="numeric"
                leftIcon="book-outline"
              />

              {speechSuggestions.length > 0 ? (
                <View
                  style={[
                    styles.suggestions,
                    {
                      backgroundColor:
                        theme.colors.surface,
                    },
                  ]}>
                  {speechSuggestions.map(
                    (speech, index) => {
                      const isLast =
                        index ===
                        speechSuggestions.length -
                          1;

                      return (
                        <Pressable
                          key={
                            speech.speechNumber
                          }
                          style={[
                            styles.suggestionItem,
                            isLast &&
                              styles.suggestionItemLast,
                          ]}
                          onPress={() =>
                            handleSpeechSelect(
                              speech,
                            )
                          }>
                          <Text
                            variant="titleMedium"
                            style={
                              styles.suggestionName
                            }>
                            Bosquejo{' '}
                            {speech.speechNumber}
                          </Text>

                          <Text
                            variant="bodySmall"
                            style={
                              styles.suggestionDescription
                            }>
                            {speech.title}
                          </Text>
                        </Pressable>
                      );
                    },
                  )}
                </View>
              ) : null}

              <InvitationTextInput
                externalLabel="Tema"
                placeholder="Tema"
                value={form.topic}
                onChangeText={value =>
                  updateField(
                    'topic',
                    value,
                  )
                }
                leftIcon="text-long"
              />

              <InvitationDateField
                externalLabel="Fecha del discurso"
                placeholder="DD/MM/AAAA"
                value={formatDisplayDate(
                  form.speechDate,
                )}
                onPress={
                  handleOpenDatePicker
                }
              />

              <InvitationTimeField
                externalLabel="Hora del discurso"
                placeholder="HH:MM"
                value={formatDisplayTime(
                  form.speechTime,
                )}
                onPress={
                  handleOpenTimePicker
                }
              />
            </FormSection>

            {renderError()}

            <Button
              mode="contained"
              icon="arrow-right"
              contentStyle={
                styles.primaryButtonContent
              }
              style={styles.primaryButton}
              onPress={
                handleNextSection
              }>
              Siguiente
            </Button>
          </>
        ) : (
          <>
            <FormSection title="Datos del orador">
              <InvitationTextInput
                externalLabel="Nombre del orador"
                placeholder="Nombre"
                value={form.speakerName}
                onChangeText={
                  handleSpeakerChange
                }
                leftIcon="account-outline"
              />

              {speakerSuggestions.length >
              0 ? (
                <View
                  style={[
                    styles.suggestions,
                    {
                      backgroundColor:
                        theme.colors.surface,
                    },
                  ]}>
                  {speakerSuggestions.map(
                    (speaker, index) => {
                      const isLast =
                        index ===
                        speakerSuggestions.length -
                          1;

                      return (
                        <Pressable
                          key={speaker.id}
                          style={[
                            styles.suggestionItem,
                            isLast &&
                              styles.suggestionItemLast,
                          ]}
                          onPress={() =>
                            handleSpeakerSelect(
                              speaker,
                            )
                          }>
                          <Text
                            variant="titleMedium"
                            style={
                              styles.suggestionName
                            }>
                            {speaker.name}
                          </Text>

                          <Text
                            variant="bodySmall"
                            style={
                              styles.suggestionDescription
                            }>
                            {
                              speaker.congregation
                            }
                          </Text>
                        </Pressable>
                      );
                    },
                  )}
                </View>
              ) : null}

              <InvitationTextInput
                externalLabel="Congregación del orador"
                placeholder="Congregación"
                value={
                  form.speakerCongregation
                }
                onChangeText={value =>
                  updateField(
                    'speakerCongregation',
                    value,
                  )
                }
                leftIcon="account-group-outline"
              />

              <InvitationTextInput
                externalLabel="Contacto del orador"
                placeholder="999 999 9999"
                value={
                  form.speakerContact
                }
                onChangeText={value =>
                  updateField(
                    'speakerContact',
                    value,
                  )
                }
                keyboardType="phone-pad"
                leftIcon="phone-outline"
              />
            </FormSection>

            {renderError()}

            <View style={styles.actions}>
              <Button
                mode="outlined"
                icon="arrow-left"
                style={styles.actionButton}
                contentStyle={
                  styles.secondaryButtonContent
                }
                onPress={
                  handlePreviousSection
                }>
                Atrás
              </Button>

              <Button
                mode="contained"
                icon="eye-outline"
                style={styles.actionButton}
                contentStyle={
                  styles.primaryButtonContent
                }
                onPress={handleSubmit}>
                Vista previa
              </Button>
            </View>
          </>
        )}

        {showDatePicker ? (
          <DateTimePicker
            mode="date"
            value={datePickerValue}
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        ) : null}

        {showTimePicker ? (
          <DateTimePicker
            mode="time"
            value={timePickerValue}
            is24Hour={false}
            onChange={handleTimeChange}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },

  segmentedButtons: {
    marginBottom: 12,
  },

  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },

  progressItem: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },

  suggestions: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E9F7',
    overflow: 'hidden',
  },

  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F4FA',
  },

  suggestionItemLast: {
    borderBottomWidth: 0,
  },

  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
  },

  suggestionDescription: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    color: '#7A7A9D',
  },

  errorContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  errorText: {
    fontSize: 14,
    fontWeight: '500',
  },

  primaryButton: {
    borderRadius: 12,
  },

  primaryButtonContent: {
    minHeight: 48,
    flexDirection: 'row-reverse',
  },

  secondaryButtonContent: {
    minHeight: 48,
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
  },

  actionButton: {
    flex: 1,
    borderRadius: 12,
    borderColor: "#345995"
  },
});