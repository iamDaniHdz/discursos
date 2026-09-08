import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Card,
  Text,
  useTheme,
} from 'react-native-paper';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import type {
  InvitationDraft,
} from '../models/invitation.types';

import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export function formatInvitationDate(
  date: string,
): string {
  const formatted = moment(date).format(
    'ddd D MMM YYYY',
  );

  return (
    formatted.charAt(0).toUpperCase() +
    formatted.slice(1)
  );
}

export function formatInvitationTime(
  time: string,
): string {
  return moment(
    time,
    'HH:mm',
  ).format('hh:mm A');
}


interface InvitationCardProps {
  invitation: InvitationDraft;
}

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps): React.JSX.Element {
  return (
    <View style={styles.infoItem}>
      <View style={styles.infoIconContainer}>
        <MaterialDesignIcons
          name={icon}
          size={28}
          color="#1849DC"
        />
      </View>

      <View style={styles.infoContent}>
        <Text
          variant="labelMedium"
          style={styles.infoLabel}>
          {label}
        </Text>

        <Text variant="titleMedium">
          {value}
        </Text>
      </View>
    </View>
  );
}

export function InvitationCard({
  invitation,
}: InvitationCardProps): React.JSX.Element {
  const {colors} = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Content>
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>DISCURSO PÚBLICO</Text>
            </View>

            <Text variant="headlineLarge" style={styles.congregation}>
              {invitation.hostCongregation}
            </Text>

            <View style={[styles.dateRow, {gap: 20}]}>
              <View style={styles.dateRow}>
                <MaterialDesignIcons
                  name="calendar-outline"
                  size={18}
                  color={colors.outline}
                />
                <Text variant="labelLarge" style={styles.infoDate}>
                  {formatInvitationDate(invitation.speechDate)}
                </Text>
              </View>

              <View style={[styles.dateRow]}>
                <MaterialDesignIcons
                  name="clock-outline"
                  size={18}
                  color={colors.outline}
                />
                <Text variant="labelLarge" style={styles.infoDate}>
                  {formatInvitationTime(invitation.speechTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* TEMA */}

        <View style={styles.topicContainer}>
          <View style={styles.topicContent}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                Bosquejo {invitation.outlineNumber}
              </Text>
            </View>

            <Text variant="headlineMedium" style={styles.topic}>
              {invitation.topic}
            </Text>
          </View>
        </View>

        {/* INFORMACIÓN */}

        <View style={styles.infoGrid}>
          <InfoItem
            icon="account-outline"
            label="ORADOR"
            value={invitation.speakerName}
          />

          <InfoItem
            icon="account-group-outline"
            label="CONGREGACIÓN DEL ORADOR"
            value={invitation.speakerCongregation}
          />

          <InfoItem
            icon="phone-outline"
            label="CONTACTO DEL ORADOR"
            value={invitation.speakerContact}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    width: '100%',
  },

  header: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  headerContent: {
    flex: 1,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DAE2FB',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 5,
  },

  badgeText: {
    color: '#1849DC',
    fontWeight: '700',
    letterSpacing: 1,
  },

  congregation: {
    fontWeight: '700',
    marginBottom: 12,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },

  dateText: {
    marginLeft: 0,
  },

  topicContainer: {
    flexDirection: 'row',
    backgroundColor: '#EDF1FD',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  topicContent: {
    flex: 1,
  },

  topic: {
    fontWeight: '700',
    lineHeight: 42,
  },

  infoGrid: {
    gap: 20,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EDF1FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: '#7A7A9D',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoDate:{
    color: '#7A7A9D',
    fontWeight: '600',
  }
});