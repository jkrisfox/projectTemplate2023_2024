'use client'
import Image from 'next/image';
import { useState } from 'react';
import './style.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const petInfo = {
    name: '...',
    species: '...',
    breed: '...',
    age: '...',
    vaccineStatus: '...',
    neuterStatus: '...',
    location: '...',
    bio: '...',
    profileImage: '/goated.jpg', // Example URL for the profile image
  };

  const userInfo = {
    name: "Your Name",
    username: "Your username",
    profileImage: "/goated.jpg"
  }

  const [editedPetInfo, setEditedPetInfo] = useState({ ...petInfo });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the edited pet info to the server
    // You can send a request to update the information here
    // Once the save is successful, set isEditing to false
    const updatedPetInfo = editedPetInfo

    fetch(`api/profile`, {method: "put", body: JSON.stringify(updatedPetInfo)}).then((response) =>{
      if(response.ok){
        console.log("It worked!")
      }
    })
    setIsEditing(false);
  };

  //Updates whatever section got updated. So if name got updated it will update name and if species got updated it updates species textbox
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPetInfo({
      ...editedPetInfo,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; 
    if (imageFile) {
      setEditedPetInfo({
        ...editedPetInfo, 
        profileImage: URL.createObjectURL(imageFile), 
        imageFile
      })
    }

  }

  return (
    <div className="profile-container">
      <div className = "pet-container">
        <div className="profile-header">
          <div className="profile-image">
            {isEditing ? (
              <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
            ) : (
              <Image src={editedPetInfo.profileImage} alt="Profile Picture" width = {200} height ={200} />
            )}
          </div>

          <div className="profile-info">
            <h1 className="profile-name">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  placeholder = "Pet Name"
                  value={editedPetInfo.name}
                  onChange={handleInputChange}
                />
              ) : (
                
                editedPetInfo.name
              )}
            </h1>

            <p className="profile-bio">
              {isEditing ? (
                <textarea
                  name="bio"
                  placeholder="Short bio or description goes here"
                  value={editedPetInfo.bio}
                  onChange={handleInputChange}
                />
              ) : (
                editedPetInfo.bio
              )}
            </p>

          </div>

        </div>

        <h2>Pet Info</h2>
        <ul className="pet-info-list">
          <li className="pet-info-item">
            <strong>Species:</strong>
            {isEditing ? (
              <input
                type="text"
                name="species"
                placeholder = "Dog/Cat ..."

                value={editedPetInfo.species}
                onChange={handleInputChange}
              />
            ) : (
              editedPetInfo.species
            )}
          </li>
          <li className="pet-info-item">
            <strong>Breed:</strong>
            {isEditing ? (
              <input
                type="text"
                name="breed"
                placeholder = "Labrador Retriever ..."
                value={editedPetInfo.breed}
                onChange={handleInputChange}
              />
            ) : (
              editedPetInfo.breed
            )}
          </li>
          <li className="pet-info-item">
            <strong>Age:</strong>
            {isEditing ? (
              <input
                type="number"
                name="age"
                placeholder = "Age of your pet ..."
                value={editedPetInfo.age}
                onChange={handleInputChange}
                min="0"
              />
            ) : (
              editedPetInfo.age
            )}
          </li>
          <li className="pet-info-item">
            <strong>Vaccine Status:</strong>
            {isEditing ? (
              <select
                name="vaccineStatus"
                value={editedPetInfo.vaccineStatus}
                onChange={handleInputChange}
              > 
                <option value = "...">...</option>
                <option value = "Up to Date">Up to date</option>
                <option value = "Not up to Date">Not up to Date</option>
              </select>
            ) : (
              editedPetInfo.vaccineStatus
            )}
          </li>
          <li className="pet-info-item">
            <strong>Neuter Status:</strong>
            {isEditing ? (
              <select
                name="neuterStatus"
                value={editedPetInfo.neuterStatus}
                onChange={handleInputChange}
              > 
                <option value = "...">...</option>
                <option value = "Yes">Yes</option>
                <option value = "No">No</option>
              </select>
            ) : (
              editedPetInfo.neuterStatus
            )}
          </li>
          <li className="pet-info-item">
            <strong>Location:</strong>
            {isEditing ? (
              <input 
              type="text" 
              name="location"
              placeholder = "State, City"
              value={editedPetInfo.location}
              onChange={handleInputChange} />
            ) : (
              editedPetInfo.location
            )}
          </li>
        </ul>

        {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )} 
      </div>
      <div className = "userContainer">
        <p>userinfo</p>
      </div>
    </div>
  );
}
