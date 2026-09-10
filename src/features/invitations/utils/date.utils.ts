import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export function formatDisplayDate(
  date: string,
): string {
  if (!date) {
    return '';
  }

  const formatted = moment(date).format(
    'dddd D [de] MMMM [del] YYYY',
  );

  return (
    formatted.charAt(0).toUpperCase() +
    formatted.slice(1)
  );
}

export function formatDisplayTime(
  time: string,
): string {
  if (!time) {
    return '';
  }

  return moment(time, 'HH:mm')
    .format('h:mm A')
    .replace('AM', 'a. m.')
    .replace('PM', 'p. m.');
}