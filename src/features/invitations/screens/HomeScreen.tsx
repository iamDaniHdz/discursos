import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Icon, Card, Text, useTheme } from 'react-native-paper';

import groups from '../../../data/groups.json';
import speakers from '../../../data/speakers.json';
import speeches from '../../../data/speeches.json';

import type { Speaker } from '../../invitations/models/speaker.types';

interface SpeechSummary {
  title: string;
  active: boolean;
}

interface HomeScreenProps {
  navigation: {
    navigate: (screen: 'InvitationForm') => void;
  };
}

export function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const theme = useTheme();

  const groupsCount = new Set(groups.map(group => group.id)).size;

  const speakersCount = (speakers as Speaker[]).filter(
    speaker => speaker.active,
  ).length;

  const speechesCount = Object.values(
    speeches as Record<string, SpeechSummary>,
  ).filter(speech => speech.active).length;

  return (
    <ScrollView
      style={[
        styles.screen,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Bienvenido
      </Text>

      <Text variant="bodyLarge" style={styles.subtitle}>
        Gestiona invitaciones para discursos públicos de forma rápida y
        sencilla.
      </Text>

      <View style={styles.statsGrid}>
        <Card mode="contained" style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <View style={styles.statIconContainer}>
              <Icon
                source="file-document-outline"
                size={26}
                color="#345995"
              />
            </View>

            <Text
              variant="headlineMedium"
              style={styles.counter}>
              0
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.statLabel}>
              Invitaciones
            </Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <View style={styles.statIconContainer}>
              <Icon
                source="book-open-outline"
                size={26}
                color="#345995"
              />
            </View>

            <Text
              variant="headlineMedium"
              style={styles.counter}>
              {speechesCount}
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.statLabel}>
              Discursos
            </Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <View style={styles.statIconContainer}>
              <Icon
                source="account-voice"
                size={26}
                color="#345995"
              />
            </View>

            <Text
              variant="headlineMedium"
              style={styles.counter}>
              {speakersCount}
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.statLabel}>
              Oradores
            </Text>
          </Card.Content>
        </Card>

        <Card mode="contained" style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <View style={styles.statIconContainer}>
              <Icon
                source="account-group-outline"
                size={26}
                color="#345995"
              />
            </View>

            <Text
              variant="headlineMedium"
              style={styles.counter}>
              {groupsCount}
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.statLabel}>
              Congregaciones
            </Text>
          </Card.Content>
        </Card>
      </View>

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
    paddingBottom: 40,
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 8,
    lineHeight: 22,
    opacity: 0.7,
  },

  cards: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },

  card: {
    flex: 1,
    borderRadius: 16,
  },

  speechesCard: {
    marginTop: 12,
    borderRadius: 16,
  },

  speechesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },

  cardDescription: {
    marginTop: 4,
    opacity: 0.65,
  },

  counter: {
    marginTop: 8,
    fontWeight: '700',
    color: '#345995'
  },

  button: {
    marginTop: 24,
    borderRadius: 12,
  },

  buttonContent: {
    minHeight: 48,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },

  statCard: {
    width: '48%',
    borderRadius: 16,
    backgroundColor: '#FFF'
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

    backgroundColor: '#EDF3FF',
  },

  statLabel: {
    marginTop: 4,
    opacity: 0.75,
    textAlign: 'center',
  },
});
