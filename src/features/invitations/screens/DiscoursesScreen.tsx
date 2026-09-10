import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';

export function DiscoursesScreen({
  navigation,
}: any) {
  const theme = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Text variant="headlineMedium">
        Discursos
      </Text>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('InvitationForm')
        }>
        Nueva invitación
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});