const add = require('date-fns/add');
const parseISO = require('date-fns/parseISO');
const { utcToZonedTime, format } = require('date-fns-tz');

module.exports = (dateFactor) => {
  const parsedTime = add(parseISO('2000-07-03T00:00:00.000Z'), { days: (+dateFactor - 1000) });

  const formatInTimeZone = (date, fmt, tz) => format(
    utcToZonedTime(date, tz),
    fmt,
    { timeZone: tz },
  );

  return formatInTimeZone(parsedTime, 'dd-MM-yyyy', 'UTC');
};
