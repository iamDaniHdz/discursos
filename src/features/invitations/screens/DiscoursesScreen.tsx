import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Text, useTheme } from 'react-native-paper';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

export function DiscoursesScreen({ navigation }: any): React.JSX.Element {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.emptyState}>
        <MaterialDesignIcons
          name="book-search-outline"
          size={80}
          color={theme.colors.primary}
          style={{marginBottom: 20}}
        />

        <Text variant="headlineSmall" style={styles.title}>
          No hay discursos creados
        </Text>

        <Text variant="bodyMedium" style={styles.description}>
          Comienza creando tu primera invitación para gestionar discursos y
          compartirlos fácilmente.
        </Text>

        <Button
          mode="contained"
          icon="plus"
          contentStyle={styles.buttonContent}
          onPress={() => navigation.navigate('InvitationForm')}
        >
          Crear invitación
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  emptyState: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 72,
    marginBottom: 16,
  },

  title: {
    textAlign: 'center',
    marginBottom: 8,

    fontWeight: '600',
  },

  description: {
    textAlign: 'center',

    maxWidth: 280,

    lineHeight: 22,

    marginBottom: 24,

    opacity: 0.7,
  },

  buttonContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
