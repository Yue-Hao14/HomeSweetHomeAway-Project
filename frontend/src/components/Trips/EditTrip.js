import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getSpotBookingsDB, getUserBookingsDB, updateSpotBookingDB } from "../../store/bookings";
import { useHistory, useParams } from 'react-router-dom';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { addDays, eachDayOfInterval } from 'date-fns'
import { DateRange } from 'react-date-range'
import { calculateNights } from '../../utils/DateFunctions'
import './EditTrip.css'

function EditTrip() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { bookingId, spotId } = useParams();
  const spotBookingsObj = useSelector(state => state.bookings.spotBookings);
  let booking = useSelector(state => state.bookings.userBookings)
  let spot;
  if (booking) {
    booking = booking[bookingId];
    spot = booking.Spot
  }

  const [disabledDates, setDisabledDates] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  // get the target element to toggle
  const refOne = useRef(null);

  // hydrate redux store
  useEffect(() => {
    dispatch(getUserBookingsDB())
      .then(() => dispatch(getSpotBookingsDB(spotId)))
      .then(() => setIsLoaded(true))
  }, [dispatch, spotId, isLoaded])

  // put existing booking dates into an array so they can be disabled in the calendar
  useEffect(() => {
    if (spotBookingsObj) {
      const spotBookingsArr = Object.values(spotBookingsObj)
      let bookedDatesArr = []
      spotBookingsArr.forEach(booking => {
        const startDate = addDays(parseISO(booking.startDate), 2)
        const endDate = addDays(parseISO(booking.endDate), 2)
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

    const updatedBooking = {
      startDate,
      endDate
    };

    await dispatch(updateSpotBookingDB(bookingId, updatedBooking))

    // redirect to trips page
    history.push('/trips');
    return;
  }

  return (
    <div className='edit-trip-container'>
      <h1>Edit Trip</h1>
      {isLoaded &&
        <div className='change-reservation-container'>
          <div className='change-reservation-spot-name'>{spot?.name}</div>
          <div className='change-reservation-spot-address-container'>
            <div className='change-reservation-spot-address-label'>Address:</div>
            <div className='change-reservation-spot-address'>{spot?.address} {spot?.city} {spot?.state}</div>
          </div>
          <div className='change-reservation-spot-price-container'>
          <div className='change-reservation-spot-price-label'>Cost per night:</div>
          <div className='change-reservation-spot-price'>${spot?.price} night</div>
          </div>
          <div className='change-reservation-spot-current-reservation-container'>
            <div className='current-reservation-label'>Current reservation:</div>
            <div className='current-reservation-dates'>{booking?.startDate.slice(0, 10)} to {booking?.endDate.slice(0, 10)}</div>
          </div>
          <div className='change-reservation-spot-current-cost-container'>
            <div className='current-cost-label'>Current cost:</div>
            <div className='current-reservation-costs'>${(spot.price * calculateNights(parseISO(booking.startDate), parseISO(booking.endDate))).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
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
            <div className='change-reservation-date-selection-container' ref={refOne}>
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
              <button className="change-reservation-date-selection-close-button" onClick={() => setOpen(false)}>Close</button>
            </div>
          }
          <div className='estimated-cost-container'>
            <div className='estimated-cost-label'>Estimated new cost</div>
            <div className='estimated-cost-number'>${(spot.price * calculateNights(range[0].startDate, range[0].endDate)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <button className='reserve activated' onClick={handleSubmit}>Change Reservation</button>
        </div>
      }
    </div>
  )
}

export default EditTrip;
