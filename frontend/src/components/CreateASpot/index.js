import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as spotActions from "../../store/spots";
import './CreateASpot.css';

function CreateASpot() {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  // const [images, setImages] = useState({});
  const [previewImage, setPreviewImage] = useState('')
  const [otherImage1, setOtherImage1] = useState("")
  const [otherImage2, setOtherImage2] = useState("")
  const [otherImage3, setOtherImage3] = useState("")
  const [otherImage4, setOtherImage4] = useState("")
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let errors = {};
    if (!country.length > 0) errors.emptyCountry = "Country is required";
    if (!address.length > 0) errors.emptyAddress = "Address is required";
    if (!city.length > 0) errors.emptyCity = "City is required";
    if (!state.length > 0) errors.emptyState = "State is required";
    if (!latitude.length > 0) errors.emptyLatitude = "Latitude is required";
    if (!longitude.length > 0) errors.emptyLongitude = "Longitude is required";
    if (!(description.length >= 30)) errors.shortDescription = "Description needs a minimum of 30 characters";
    if (!name.length > 0) errors.emptyName = "Name is required";
    if (!price.length) errors.emptyPrice = "Price is required";
    // if (!Object.values(images).length > 0) errors.noPreviewImage = "Preview image is required";
    // if (Object.values(images).length > 0) {
    //   for (let i = 0; i < Object.values(images).length; i++) {
    //     const image = Object.values(images)[i];
    //     if (!image.endsWith('jpg') && !image.endsWith('png') && !image.endsWith('jpeg')) {
    //       errors[`badImage${i}`] = "Image URL must end in .png, .jpg, or .jpeg"
    //     }
    //   }
    // }
    if (!previewImage.length > 0) errors.emptyPreviewImage = "Preview image is required";
    if (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg')) errors.badPreviewImage = "Image URL must end in .png, .jpg, or .jpeg"
    // console.log('previewImage', previewImage.endsWith('jpg'))
    if (otherImage1 && (!otherImage1.endsWith('.png') && !otherImage1.endsWith('.jpg') && !otherImage1.endsWith('.jpeg'))) errors.badOtherImage1 = "Image URL must end in .png, .jpg, or .jpeg"
    if (otherImage2 && (!otherImage2.endsWith('.png') && !otherImage2.endsWith('.jpg') && !otherImage2.endsWith('.jpeg'))) errors.badOtherImage2 = "Image URL must end in .png, .jpg, or .jpeg"
    if (otherImage3 && (!otherImage3.endsWith('.png') && !otherImage3.endsWith('.jpg') && !otherImage3.endsWith('.jpeg'))) errors.badOtherImage3 = "Image URL must end in .png, .jpg, or .jpeg"
    if (otherImage4 && (!otherImage4.endsWith('.png') && !otherImage4.endsWith('.jpg') && !otherImage4.endsWith('.jpeg'))) errors.badOtherImage4 = "Image URL must end in .png, .jpg, or .jpeg"

    // set the errors obj to validationError state variable
    setValidationErrors(errors);
    // console.log('validationErrors in useEffect',validationErrors)

  }, [country, address, city, state, latitude, longitude, description, name, price, previewImage, otherImage1, otherImage2, otherImage3, otherImage4])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    // console.log('handleSubmitted fired')

    const spotInfo = {
      address,
      city,
      state,
      country,
      lat: latitude,
      lng: longitude,
      name,
      description,
      price
    }
    console.log('spotInfo',spotInfo)

    const imageInfo = {
      previewImage,
      otherImage1,
      otherImage2,
      otherImage3,
      otherImage4
    }
    console.log('imageInfo', imageInfo)

    let spotId = ""
    if (Object.values(validationErrors).length === 0) {
      spotId = await dispatch(spotActions.createSpotDB(spotInfo, imageInfo))

      console.log('spotId from db', spotId)
      // redirect to new spot's detail page
      history.push(`/spots/${spotId}`)
    }

  }

  // // create an imagesObj to hold all the urls so I can set imagesObj as images state variable
  // let imagesObj = {};

  return (
    <div className='outer-container'>
      <form onSubmit={handleSubmit}>
        <h2>Create a New Spot</h2>
        <div className='session-container'>
          <div className='title'>Where's your place located?</div>
          <div>Guests will only get your exact address once they booked a reservation</div>
          <div className='label-input'>
            <label htmlFor="country">Country</label>
            {hasSubmitted && validationErrors.emptyCountry && (<div className='error'>{validationErrors.emptyCountry}</div>)}
            <input
              id="country"
              type="text"
              onChange={e => setCountry(e.target.value)}
              value={country}
              placeholder="Country" />
          </div>
          <div className='label-input'>
            <label htmlFor="address">Street Address</label>
            {hasSubmitted && validationErrors.emptyAddress && (<div className='error'>{validationErrors.emptyAddress}</div>)}
            <input
              id="address"
              type="text"
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Address" />
          </div>
          <div className='label-input'>
            <label htmlFor="city">City</label>
            {hasSubmitted && validationErrors.emptyCity && (<div className='error'>{validationErrors.emptyCity}</div>)}
            <input
              id="city"
              type="text"
              onChange={e => setCity(e.target.value)}
              value={city}
              placeholder="City" />
          </div>
          <div className='label-input'>
            <label htmlFor="state">State</label>
            {hasSubmitted && validationErrors.emptyState && (<div className='error'>{validationErrors.emptyState}</div>)}
            <input
              id="state"
              type="text"
              onChange={e => setState(e.target.value)}
              value={state}
              placeholder="STATE" />
          </div>
          <div className='label-input'>
            <label htmlFor="latitude">Latitude</label>
            {hasSubmitted && validationErrors.emptyLatitude && (<div className='error'>{validationErrors.emptyLatitude}</div>)}
            <input
              id="latitude"
              type="text"
              onChange={e => setLatitude(e.target.value)}
              value={latitude}
              placeholder="Latitude" />
          </div>
          <div className='label-input'>
            <label htmlFor="longitude">Longitude</label>
            {hasSubmitted && validationErrors.emptyLongitude && (<div className='error'>{validationErrors.emptyState}</div>)}
            <input
              id="longitude"
              type="text"
              onChange={e => setLongitude(e.target.value)}
              value={longitude}
              placeholder="Longitude" />
          </div>
        </div>
        <div className='session-container'>
          <div className='title'>Describe your place to guests</div>
          <div>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
          <textarea
            id="description"
            type="text"
            onChange={e => setDescription(e.target.value)}
            value={description}
            placeholder="Please write at least 30 characters"
            rows="7" />
          {hasSubmitted && validationErrors.shortDescription && (<div className='error'>{validationErrors.shortDescription}</div>)}
        </div>
        <div className='session-container'>
          <div className='title'>Create a title for your spot</div>
          <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
          <input
            id="name"
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Name of your spot" />
          {hasSubmitted && validationErrors.emptyName && (<div className='error'>{validationErrors.emptyName}</div>)}
        </div>
        <div className='session-container'>
          <div className='title'>Set a base price for your spot</div>
          <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
          <span>$</span>
          <input
            id="price"
            type="number"
            onChange={e => setPrice(e.target.value)}
            value={price}
            placeholder="Price per night (USD)" />
          {hasSubmitted && validationErrors.emptyPrice && (<div className='error'>{validationErrors.emptyPrice}</div>)}
        </div>
        <div className='session-container'>
          <div className='title'>Liven up your spot with photos</div>
          <div>Submit a link to at least one photo to publish your spot.</div>
          <input
            id="previewImage"
            type="text"
            onChange={e => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder="Preview Image URL" />
          {hasSubmitted && validationErrors.emptyPreviewImage && (<div className='error'>{validationErrors.emptyPreviewImage}</div>)}
          {/* {console.log('validationError in JSX', validationErrors)} */}
          {hasSubmitted && !validationErrors.emptyPreviewImage && validationErrors.badPreviewImage && (<div className='error'>{validationErrors.badPreviewImage}</div>)}
          <input
            id="otherImage1"
            type="text"
            onChange={e => setOtherImage1(e.target.value)}
            value={otherImage1}
            placeholder="Image URL" />
          {hasSubmitted && validationErrors.badOtherImage1 && (<div className='error'>{validationErrors.badOtherImage1}</div>)}
          <input
            id="otherImage2"
            type="text"
            onChange={e => setOtherImage2(e.target.value)}
            value={otherImage2}
            placeholder="Image URL" />
          {hasSubmitted && validationErrors.badOtherImage2 && (<div className='error'>{validationErrors.badOtherImage2}</div>)}
          <input
            id="otherImage3"
            type="text"
            onChange={e => setOtherImage3(e.target.value)}
            value={otherImage3}
            placeholder="Image URL" />
          {hasSubmitted && validationErrors.badOtherImage3 && (<div className='error'>{validationErrors.badOtherImage3}</div>)}
          <input
            id="otherImage4"
            type="text"
            onChange={e => setOtherImage4(e.target.value)}
            value={otherImage4}
            placeholder="Image URL" />
          {hasSubmitted && validationErrors.badOtherImage4 && (<div className='error'>{validationErrors.badOtherImage4}</div>)}
        </div>
        <button>Create Spot</button>
      </form>
    </div>
  )
}

export default CreateASpot;
