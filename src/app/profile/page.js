'use client'

import { useState } from 'react';
import './profile.css'; // Import the CSS from the local file
import { Button, TextField, TextareaAutosize, Avatar } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Padding } from '@mui/icons-material';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPrivate, setPrivate] = useState(false);
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const theme = { spacing: 50 }


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(URL.createObjectURL(selectedPhoto));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const toggleStatus = () => {
    setPrivate(!isPrivate)
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="profile-photo">
          <center>
            <Avatar
              alt="Profile"
              src={photo}
              sx={{ width: 150, height: 150 }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
              id="photo-upload"
            />
            {isEditing &&
              <label htmlFor="photo-upload">
                <Button
                  className="spacing"
                  variant="contained"
                  component="span"
                  size='small'
                  startIcon={<PhotoCamera />}
                >
                  Upload Photo
                </Button>
              </label>
            }
            <Button
              className="spacing"
              variant="text"
              onClick={toggleEditing}
              size='small'
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </center>
        </div>
        <div className="profile-info">
          <div className={`profile-name ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
              <TextField
                className="font"
                label="Your Name"
                size='normal'
                value={name}
                onChange={handleNameChange}
                margin='normal'
              />
            ) : (
              <div className="font">
                <b>{name}</b>
              </div>
            )}
          </div>
          <div className={`profile-bio ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
              <TextField
                placeholder="Short Bio"
                minRows={4}
                value={bio}
                onChange={handleBioChange}
                margin='normal'
              />
            ) : (
              bio
            )}
          </div>
          <div className = "profile-status">
          <Button
              className="spacing"
              variant="contained"
              onClick={toggleStatus}
              size='small'
            >
              {isPrivate ? 'Private' : 'Public'}
            </Button>
          </div>
        </div>
        <div className='middle'>
          <div className='experience-in'>
            <b><p>Experience in:</p></b>
            <TextField/>
          </div>
          <div className='interested-in'>
            <b><p>Interested in:</p></b>
            <TextField/>
          </div>
          <div className='upcoming-event'>
            <b><p>Upcoming Events:</p></b>
            <TextField/>
          </div>
          <div className='forum-activity'>
            <b><p>Forum Activity:</p></b>
            <TextField/>
          </div>
        </div>
      </div>
    </div>
  );
}
