import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReviewModal.css";
import { useHistory } from "react-router-dom";
import { deleteSpotReviewDB } from "../../store/reviews";

function DeleteReviewModal ({props}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    // console.log('handleDelete fired')
    // console.log('props', props)
    const reviewId = props.reviewId;
    const spotId = props.spotId
    // console.log('reviewId',reviewId)
    // console.log('spotId',spotId)

    await dispatch(deleteSpotReviewDB(reviewId, spotId))

    // close modal and redirect to spots detail page
    closeModal();
    history.push(`/spots/${spotId}`)
  }

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <>
      <div className="modal-container">
        <h2>Confirm Delete</h2>
        <div>Are you sure you want to remove this review?</div>
        <button className="activated" onClick={handleDelete}>Yes (Delete Review)</button>
        <button className="deactivated" onClick={handleCancel}>No (Keep Review)</button>
      </div>
    </>
  )


}

export default DeleteReviewModal;
