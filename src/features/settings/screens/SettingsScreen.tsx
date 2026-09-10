import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {
  Card,
  Divider,
  Icon,
  Text,
  useTheme,
} from 'react-native-paper';

import groupsJson from '../../../data/groups.json';
import speakersJson from '../../../data/speakers.json';
import speechesJson from '../../../data/speeches.json';

import type {Group} from '../../invitations/models/group.types';
import type {Speaker} from '../../invitations/models/speaker.types';

interface Speech {
  title: string;
  active: boolean;
}

type SpeechDictionary = Record<string, Speech>;

const groups = groupsJson as Group[];
const speakers = speakersJson as Speaker[];
const speeches = speechesJson as SpeechDictionary;

export function SettingsScreen(): React.JSX.Element {
  const theme = useTheme();

  const groupsCount = new Set(
    groups.map(group => group.id),
  ).size;

  const speakersCount = speakers.filter(
    speaker => speaker.active,
  ).length;

  const speechesCount = Object.values(
    speeches,
  ).filter(speech => speech.active).length;

  return (
    <ScrollView
      style={[
        styles.screen,
        {
          backgroundColor:
            theme.colors.background,
        },
      ]}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text
        variant="headlineMedium"
        style={styles.title}>
        Ajustes
      </Text>

      <Text
        variant="bodyMedium"
        style={styles.subtitle}>
        Información y configuración de la aplicación
      </Text>

      <Text
        variant="titleMedium"
        style={styles.sectionTitle}>
        Aplicación
      </Text>

      <Card
        mode="contained"
        style={[
          styles.card,
          {
            backgroundColor:
              theme.colors.surface,
          },
        ]}>
        <Card.Content>
          <View style={styles.informationRow}>
            <View
              style={[
                styles.iconContainer,
              ]}>
              <Icon
                source="application-outline"
                size={22}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.informationContent}>
              <Text
                variant="labelLarge"
                style={styles.informationLabel}>
                Nombre
              </Text>

              <Text variant="bodyLarge">
                Discursos
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.informationRow}>
            <View
              style={[
                styles.iconContainer,
              ]}>
              <Icon
                source="information-outline"
                size={22}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.informationContent}>
              <Text
                variant="labelLarge"
                style={styles.informationLabel}>
                Versión
              </Text>

              <Text variant="bodyLarge">
                1.0.0
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Text
        variant="titleMedium"
        style={styles.sectionTitle}>
        Acerca de
      </Text>

      <Card
        mode="contained"
        style={[
          styles.card,
          {
            backgroundColor:
              theme.colors.surface,
          },
        ]}>
        <Card.Content>
          <View style={styles.aboutHeader}>
            <View
              style={[
                styles.largeIconContainer,
              ]}>
              <Icon
                source="calendar-text-outline"
                size={32}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.aboutTitleContainer}>
              <Text
                variant="titleLarge"
                style={styles.aboutTitle}>
                Discursos
              </Text>

              <Text
                variant="bodySmall"
                style={styles.aboutCaption}>
                Invitaciones digitales
              </Text>
            </View>
          </View>

          <Text
            variant="bodyMedium"
            style={styles.description}>
            Aplicación para crear, visualizar y compartir
            invitaciones digitales de discursos públicos.
            Permite seleccionar el bosquejo, la congregación
            anfitriona y los datos del orador de forma rápida
            y sencilla.
          </Text>
        </Card.Content>
      </Card>

      <Text
        variant="titleMedium"
        style={styles.sectionTitle}>
        Desarrollo
      </Text>

      <Card
        mode="contained"
        style={[
          styles.card,
          {
            backgroundColor:
              theme.colors.surface,
          },
        ]}>
        <Card.Content>
          <View style={styles.developerRow}>
            <View
              style={[
                styles.developerIcon,
              ]}>
              <Icon
                source="code-tags"
                size={28}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.developerContent}>
              <Text
                variant="labelLarge"
                style={styles.informationLabel}>
                Desarrollado por
              </Text>

              <Text
                variant="titleMedium"
                style={styles.developerName}>
                Daniel Hernández Cauich
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Text
        variant="bodySmall"
        style={styles.footerText}>
        Discursos · Versión 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 0,
    paddingBottom: 40,
  },

  title: {
    marginTop: 16,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 8,
    opacity: 0.7,
  },

  sectionTitle: {
    marginTop:10,
    marginBottom: 10,
    fontWeight: '600',
  },

  card: {
    borderRadius: 16,
  },

  informationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCE8FF'
  },

  informationContent: {
    flex: 1,
    marginLeft: 14,
  },

  informationLabel: {
    marginBottom: 2,
    opacity: 0.65,
  },

  divider: {
    marginVertical: 16,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  statCard: {
    flex: 1,
    borderRadius: 16,
  },

  statContent: {
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: "#DCE8FF"
  },

  statValue: {
    fontWeight: '700',
  },

  statLabel: {
    marginTop: 2,
    textAlign: 'center',
    opacity: 0.7,
  },

  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  largeIconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCE8FF',
  },

  aboutTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },

  aboutTitle: {
    fontWeight: '700',
  },

  aboutCaption: {
    marginTop: 2,
    opacity: 0.65,
  },

  description: {
    marginTop: 18,
    lineHeight: 22,
    opacity: 0.8,
  },

  developerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  developerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCE8FF'
  },

  developerContent: {
    flex: 1,
    marginLeft: 16,
  },

  developerName: {
    fontWeight: '600',
  },

  footerText: {
    marginTop: 28,
    textAlign: 'center',
    opacity: 0.5,
  },
});