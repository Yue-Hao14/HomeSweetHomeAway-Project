import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays, eachDayOfInterval } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { getSpotBookingsDB } from '../../store/bookings'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


function Booking() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotBookingsObj = useSelector(state => state.bookings.spotBookings)

  useEffect (()=> {
    if (spotBookingsObj) {
      const spotBookingsArr = Object.values(spotBookingsObj)
      let bookedDatesArr = []
      spotBookingsArr.forEach(booking => {
        const startDate = addDays(Date.parse(booking.startDate),1)
        const endDate = addDays(Date.parse(booking.endDate),1)
        console.log("startDate",startDate)
        console.log("endDate",endDate)
        const dateInInterval = eachDayOfInterval({
          start:startDate,
          end: endDate
        })
        bookedDatesArr += dateInInterval
      })
      console.log("bookedDatesArr", bookedDatesArr)
    }
  },[spotBookingsObj])


  // get the target element to toggle
  const refOne = useRef(null)

  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  // hydrate redux store with spotBooking
  useEffect(() => {
    dispatch(getSpotBookingsDB(spotId));
  }, [dispatch])

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(format(range[0].startDate,"yyyy-MM-dd"), format(range[0].endDate, "yyyy-MM-dd"))
  }

  return (
    <>
      <div className='reservation-date-selection-container'>
        <div className='checkin-checkout-date-container'>
          <input
            value={format(range[0].startDate, "MM/dd/yyyy")}
            readOnly
            className='check-in-date'
            onClick={() => setOpen(open => !open)}
          />
          <input
            value={format(range[0].endDate, "MM/dd/yyyy")}
            readOnly
            className='check-out-date'
            onClick={() => setOpen(open => !open)}
          />
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
            />
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        }
      </div>
      <button className='reserve activated' onClick={handleSubmit}>Reserve</button>
    </>
  )
}

export default Booking;
