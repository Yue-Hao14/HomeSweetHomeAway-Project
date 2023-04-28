import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotBookingDB } from "../../store/bookings";
import { useState } from "react";

function CancelReservationModal({ bookingId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const handleCancelReservation = async (e) => {
    e.preventDefault();

    const response = await dispatch(deleteSpotBookingDB(bookingId))
    if (response.statusCode !== 200) {
      setError(response.message)
    }
  }

  return (
    <div className="cancel-reservation-container">
      <div className="cancel-reservation-header">
        <div>Cancel Reservation</div>
        <button onClick={closeModal}>X</button>
      </div>
      {error &&
        <div className="cancel-reservation-error">{error}</div>
      }
      <div className="cancel-reservation-message">
        <div>Are you sure you want to cancel this reservation?</div>
      </div>
      <button onClick={handleCancelReservation}>Cancel Reservation</button>
    </div>
  )
}

export default CancelReservationModal
