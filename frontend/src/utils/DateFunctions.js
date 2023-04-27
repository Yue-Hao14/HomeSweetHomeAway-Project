import intervalToDuration from 'date-fns/intervalToDuration'

export const calculateNights = (startDate, endDate) => {
  const interval = intervalToDuration({
    start: startDate,
    end: endDate
  });
  return interval.days
}
