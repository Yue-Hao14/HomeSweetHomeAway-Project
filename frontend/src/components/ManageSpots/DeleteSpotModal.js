import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";
import { deleteSpotDB } from "../../store/spots";
import { useHistory } from "react-router-dom";



function DeleteSpotModal({ spotId }) {
  // console.log('DeleteSpotModal function component fired')
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    // console.log('handleDelete fired')
    // console.log(spotId)

    await dispatch(deleteSpotDB(spotId))

    // close modal and redirect to manage spots page
    closeModal();
    history.push('/spots/current')
  }

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  }

  return (
    <>
      <div className="modal-container">
        <h2>Confirm Delete</h2>
        <div>Are you sure you want to remove this spot
          from the listings?</div>
        <button className="activated" onClick={handleDelete}>Yes (Delete Spot)</button>
        <button className="deactivated" onClick={handleCancel}>No (Keep Spot)</button>
      </div>
    </>
  )
}


export default DeleteSpotModal;
