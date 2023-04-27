import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import intervalToDuration from 'date-fns/intervalToDuration'
import { addDays, eachDayOfInterval } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { addSpotBookingDB, getSpotBookingsDB } from '../../store/bookings'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


function Booking() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotBookingsObj = useSelector(state => state.bookings.spotBookings);
  const singleSpot = useSelector(state => state.spots.singleSpot)

  // get the target element to toggle
  const refOne = useRef(null);

  const history = useHistory();

  const [disabledDates, setDisabledDates] = useState([]);
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);


  // put existing booking dates into an array so they can be disabled in the calendar
  useEffect(() => {
    if (spotBookingsObj) {
      const spotBookingsArr = Object.values(spotBookingsObj)
      let bookedDatesArr = []
      spotBookingsArr.forEach(booking => {
        const startDate = addDays(parseISO(booking.startDate), 1)
        const endDate = addDays(parseISO(booking.endDate), 1)
        // console.log("startDate",startDate)
        // console.log("endDate",endDate)
        const dateInInterval = eachDayOfInterval({
          start: startDate,
          end: endDate
        })
        bookedDatesArr = bookedDatesArr.concat(dateInInterval)
      })
      // parse string into date format
      // bookedDatesArr.forEach(date => console.log(Date.parse(date)))
      setDisabledDates(bookedDatesArr)
    }
  }, [spotBookingsObj])

  // console.log("disabledDates",disabledDates)


  // hydrate redux store with spotBooking
  useEffect(() => {
    dispatch(getSpotBookingsDB(spotId));
  }, [dispatch, spotId])

  // close date selection on ESC and when user click outside
  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide date selection on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }
  // Hide date selection on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDate = format(range[0].startDate, "yyyy-MM-dd");
    const endDate = format(range[0].endDate, "yyyy-MM-dd");
    console.log(startDate, endDate)

    const newBooking = {
      startDate,
      endDate
    }
    const res = await dispatch(addSpotBookingDB(spotId, newBooking))
    console.log("res", res)

    // redirect to trips page
    history.push('/trips');
    return;
  }

  return (
    <>
      <div className='reservation-date-selection-container'>
        <div className='checkin-checkout-date-container'>
          <div className='checkin-container'>
            <label>CHECK-IN</label>
            <input
              value={format(range[0].startDate, "MM/dd/yyyy")}
              readOnly
              className='check-in-date'
              onClick={() => setOpen(open => !open)}
            />
          </div>
          <div className='checkout-container'>
          <label>CHECK-OUT</label>
          <input
            value={format(range[0].endDate, "MM/dd/yyyy")}
            readOnly
            className='check-out-date'
            onClick={() => setOpen(open => !open)}
          />
          </div>
        </div>
        {open &&
          <div className='date-selection-container' ref={refOne}>
            <DateRange
              editableDateInputs={true}
              onChange={item => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={2}
              minDate={new Date()}
              direction="horizontal"
              disabledDates={disabledDates}
            />
            <button className="date-selection-close-button" onClick={() => setOpen(false)}>Close</button>
          </div>
        }
      </div>
      <div className='estimated-cost-container'>
        <div className='estimated-cost-label'>Estimated cost</div>
        <div className='estimated-cost-number'>${(singleSpot.price * calculateNights(range[0].startDate,range[0].endDate)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>
      <button className='reserve activated' onClick={handleSubmit}>Reserve</button>
    </>
  )
}

export default Booking;


function calculateNights(startDate, endDate) {
  const interval = intervalToDuration({
    start: startDate,
    end: endDate
  });
  return interval.days
}
