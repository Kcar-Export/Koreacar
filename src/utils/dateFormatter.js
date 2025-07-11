import moment from 'moment';

export const dateFormatter = (date) => {
  const formattedDate = moment(date).format('MMM D, YYYY');
  return formattedDate
}