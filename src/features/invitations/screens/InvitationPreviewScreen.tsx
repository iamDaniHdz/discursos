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

import Share from 'react-native-share';

export function InvitationPreviewScreen({
  route,
}: InvitationPreviewScreenProps): React.JSX.Element {
    const {invitation} = route.params;
    const handleShare = async (): Promise<void> => {
    try {
        const uri = await viewShotRef.current?.capture?.();
        
        if (!uri) {
        return;
        }

        const url = uri.startsWith('file://')
            ? uri
            : `file://${uri}`;


        await Share.open({
        url,
        type: 'image/png',
        failOnCancel: false,
        title: 'Invitación de discurso público',
        message: `Buen día hno. *${invitation.speakerName}*, le comparto su asignación de Discurso Público para discursar en la Congregación *${invitation.hostCongregation}*. Saludos cordiales.`,
        });
    } catch (error) {
        console.error('Error sharing image:', error);
    }
    };
  const viewShotRef =
  useRef<ViewShot>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}>
        <ViewShot
            ref={viewShotRef}
            style={{
                backgroundColor: '#F9F9FF',
                padding: 28,
            }}
            options={{
                format: 'png',
                quality: 1,
            result: 'tmpfile',
        }}>
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
    backgroundColor: '#F5F7FC',
  },

  content: {
    padding: 0,
  },

  footer: {
    padding: 16,
  },
});