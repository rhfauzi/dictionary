import moment from 'moment'

export default function dateFormat(date: string, withTime?: boolean) {
  const isValid = moment(date).isValid() === true
  const dateFormated = isValid ? moment(date).format(`DD MMM YYYY ${withTime ? 'HH:mm:ss' : ''}`) : '-'
  return dateFormated
}


export const convertDateInput = (date) => {
  return moment(date).format("YYYY-MM-DD")
}


export const formatDateInput = 'DD MMM YYYY'
export const formatMonthInput = 'MMM YYYY'

export const dateFormatWithMinutes = (date?: string, withTime?: boolean) => {
  const isValid = moment(date).isValid() === true
  const dateFormated = isValid ? moment(date).local().format(`DD MMM YYYY ${withTime ? 'HH:mm' : ''}`) : ''
  return dateFormated
}

export const dateFormatFull = (date: any, withTime?: boolean) => {
  const isValid = moment(date).isValid()
  const dateFormated = isValid ? moment(date).format(`DD MMMM YYYY${withTime ? ', HH:mm' : ''}`) : ''
  return dateFormated
}

export const getTotalWeekOrDays = (field: string) => {
  const now = moment();
  const currentMonth = now.month();
  const currentWeekInMonth = now.week() - moment(`${now.year()}-${currentMonth + 1}-01`).week() + 1;
  const daysInCurrentMonth = now.date();

  return field === 'week' ? currentWeekInMonth : daysInCurrentMonth
}