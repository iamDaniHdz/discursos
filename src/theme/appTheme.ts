import {
  MD3LightTheme,
  type MD3Theme,
} from 'react-native-paper';

export const appTheme: MD3Theme = {
  ...MD3LightTheme,

  roundness: 12,

  colors: {
    ...MD3LightTheme.colors,

    primary: '#345995',
    onPrimary: '#FFFFFF',

    secondary: '#006D77',
    onSecondary: '#FFFFFF',

    tertiary: '#8A4F18',
    onTertiary: '#FFFFFF',

    background: '#F9F9FF',
    onBackground: '#1A1B20',

    surface: '#FFFFFF',
    onSurface: '#1A1B20',

    outline: '#757780',

    error: '#BA1A1A',
    onError: '#FFFFFF',
  },
};