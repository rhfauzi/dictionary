import moment from 'moment/moment'

export default function generalDateFormat(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format)
}
