import moment from 'moment'

export default function dateIndFormat(date: string, withTime?: boolean) {
    var idLocale = require('moment/locale/id'); 
    moment.locale('id', idLocale);
    const isValid = moment(date).isValid() === true
    const dateFormated = isValid ? moment(date).format(`LL ${withTime ? 'HH:mm' : ''}`) : '-'
    return dateFormated
  }