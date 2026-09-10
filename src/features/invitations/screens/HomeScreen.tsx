import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';

import { Button, Card, Text, useTheme } from 'react-native-paper';

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
        <Card mode='contained' style={styles.statCard}>
          <Card.Content>
            <Text variant="titleSmall">Invitaciones</Text>

            <Text variant="displaySmall" style={styles.counter}>
              0
            </Text>
          </Card.Content>
        </Card>

        <Card mode='contained' style={styles.statCard}>
          <Card.Content>
            <Text variant="titleSmall">Discursos</Text>

            <Text variant="displaySmall" style={styles.counter}>
              {speechesCount}
            </Text>
          </Card.Content>
        </Card>

        <Card mode='contained' style={styles.statCard}>
          <Card.Content>
            <Text variant="titleSmall">Oradores</Text>

            <Text variant="displaySmall" style={styles.counter}>
              {speakersCount}
            </Text>
          </Card.Content>
        </Card>

        <Card mode='contained' style={styles.statCard}>
          <Card.Content>
            <Text variant="titleSmall">Congregaciones</Text>

            <Text variant="displaySmall" style={styles.counter}>
              {groupsCount}
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
});
