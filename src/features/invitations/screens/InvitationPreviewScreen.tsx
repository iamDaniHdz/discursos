import React, {useRef} from 'react';
import ViewShot from 'react-native-view-shot';
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

  const handleShare = async (): Promise<void> => {
    try {
      const uri = await viewShotRef.current?.capture?.();

      console.log('Image URI:', uri);
    } catch (error) {
      console.error(error);
    }
  };

  const viewShotRef =
  useRef<ViewShot>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}>
        <ViewShot ref={viewShotRef}>
            <InvitationCard invitation={invitation} />
        </ViewShot>
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