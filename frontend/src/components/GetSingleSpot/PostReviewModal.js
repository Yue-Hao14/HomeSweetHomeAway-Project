import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReviewModal.css";
import { deleteSpotDB } from "../../store/spots";
import { useHistory } from "react-router-dom";
import { postSpotReviewDB } from "../../store/reviews";

function PostReviewModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();

  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [stars, setStar] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // error validations
  useEffect(() => {
    // console.log('review length:', review.length)
    // console.log('stars:', stars)
    // console.log('error before',error)
    if (!review.length > 10 || !stars ) {
      setError('either review or stars not right')
    } else {
      setError('')
    }
    // console.log('error after',error)
  }, [review, stars])



  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewInfo = {
      review,
      stars
    }
    // console.log(reviewInfo)


    // dispatch to post review
    dispatch(postSpotReviewDB(spotId, reviewInfo))

    // close modal and redirect to manage spots page
    closeModal();
    history.push(`/spots/${spotId}`)
  }

  return (
    <div className="post-review-modal-container">
      <h2>How was your stay?</h2>
      <textarea
        placeholder="Leave your review here..."
        value={review}
        rows="5"
        cols="33"
        onChange={(e) => setReview(e.target.value)}></textarea>
      <div className="stars-rating-container">
        <div className="rating">
          {/* <span id={stars <= 5 ? "solid-stars" : ""} onClick={() => setStar(5)}>☆</span>
          <span id={stars <= 4 ? "solid-stars" : ""} onClick={() => setStar(4)}>☆</span>
          <span id={stars <= 3 ? "solid-stars" : ""} onClick={() => setStar(3)}>☆</span>
          <span id={stars <= 2 ? "solid-stars" : ""} onClick={() => setStar(2)}>☆</span>
          <span id={stars <= 1 ? "solid-stars" : ""} onClick={() => setStar(1)}>☆</span> */}

          <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" onClick={() => setStar(5)}></label>
          <input type="radio" id="star4" name="rating" value="4" /><label class="full" for="star4" onClick={() => setStar(4)}></label>
          <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" onClick={() => setStar(3)}></label>
          <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" onClick={() => setStar(2)}></label>
          <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" onClick={() => setStar(1)}></label>
        </div>
        <div>  Stars</div>
      </div>
      <button
        disabled={error.length > 0}
        onClick={handleSubmit}>Submit Your Review</button>
    </div>


  )

}

export default PostReviewModal;
