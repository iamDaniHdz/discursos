import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {Button} from 'react-native-paper';

import { InvitationCard } from '../components/InvitationCard';

import type {
  InvitationPreviewScreenProps,
} from '../../../navigation/navigation.types';

export function InvitationPreviewScreen({
  route,
}: InvitationPreviewScreenProps): React.JSX.Element {
  const {invitation} = route.params;

  const handleShare = (): void => {
    console.log('Compartir');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}>
        <InvitationCard
          invitation={invitation}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleShare}>
          Compartir invitación
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
  },

  footer: {
    padding: 16,
  },
});