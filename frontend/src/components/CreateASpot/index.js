import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from "../../store/spots";
import { useEffect } from 'react';
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
  const [previewImage, setPreviewImage] = useState('')
  const [otherImage, setOtherImage] = useState('')


  return (
    <div className='outer-container'>
      <h2>Create a New Spot</h2>
      <div className='title'>Where's your place located?</div>
      <div>Guests will only get your exact address once they booked a reservation</div>
      <form>
        <div className='location-info-fields'>
          <div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              onChange={e => setCountry(e.target.value)}
              value={country}
              placeholder="Country" />
          </div>
          <div>
            <label htmlFor="address">Street Address</label>
            <input
              id="address"
              type="text"
              onChange={e => setAddress(e.target.value)}
              value={address}
              placeholder="Address" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              onChange={e => setCity(e.target.value)}
              value={city}
              placeholder="City" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              onChange={e => setState(e.target.value)}
              value={state}
              placeholder="STATE" />
          </div>
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input
              id="latitude"
              type="text"
              onChange={e => setLatitude(e.target.value)}
              value={latitude}
              placeholder="Latitude" />
          </div>
          <div>
            <label htmlFor="longitude">Longitude</label>
            <input
              id="longitude"
              type="text"
              onChange={e => setLongitude(e.target.value)}
              value={longitude}
              placeholder="Longitude" />
          </div>
        </div>
        <div className='description-fields'>
          <div className='title'>Describe your place to guests</div>
          <div>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
          <textarea
            id="description"
            type="text"
            onChange={e => setDescription(e.target.value)}
            value={description}
            placeholder="Please write at least 30 characters"
            rows="7" />
        </div>
        <div className='spot-name-fields'>
          <div className='title'>Create a title for your spot</div>
          <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
          <input
            id="name"
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Name of your spot" />
        </div>
        <div className='price-fields'>
          <div className='title'>Set a base price for your spot</div>
          <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
          <span>$</span>
          <input
            id="price"
            type="number"
            onChange={e => setPrice(e.target.value)}
            value={price}
            placeholder="Price per night (USD)" />
        </div>
        <div className='spot-image-fields'>
          <div className='title'>Liven up your spot with photos</div>
          <div>Submit a link to at least one photo to publish your spot.</div>
          <input
            id="previewImage"
            type="text"
            onChange={e => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder="Preview Image URL" />
          <input
            id="otherImage"
            type="text"
            onChange={e => setPreviewImage(e.target.value)}
            value={otherImage}
            placeholder="Image URL" />
          <input
            id="otherImage"
            type="text"
            onChange={e => setPreviewImage(e.target.value)}
            value={otherImage}
            placeholder="Image URL" />
          <input
            id="otherImage"
            type="text"
            onChange={e => setPreviewImage(e.target.value)}
            value={otherImage}
            placeholder="Image URL" />
          <input
            id="otherImage"
            type="text"
            onChange={e => setPreviewImage(e.target.value)}
            value={otherImage}
            placeholder="Image URL" />
        </div>
        <button>Create Spot</button>
      </form>
    </div>
  )
}

export default CreateASpot;
