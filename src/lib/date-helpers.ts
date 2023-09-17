import moment from 'moment';
export function dateToFromNowDaily(myDate: string | Date) {
  // get from-now for this date
  var fromNow = moment(myDate).fromNow();

  // ensure the date is displayed with today and yesterday
  return moment(myDate).calendar(null, {
    // when the date is closer, specify custom values
    lastWeek: "[last] dddd [at] h:mm:ss a",
    lastDay: "[yesterday] [at] h:mm:ss a",
    sameDay: "[today] [at] h:mm:ss a",
    nextDay: "[tomorrow] [at] h:mm:ss a",
    nextWeek: "dddd [at] h:mm:ss a",
    // when the date is further away, use from-now functionality
    sameElse: function () {
      return "[" + fromNow + "]";
    },
  });
}
