import Image from 'next/image';
import './style.css';

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <Image src="/goated.jpg" alt="Profile Picture" width={200} height={200} />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">Your Name</h1>
          <p className="profile-bio">Short bio or description goes here.</p>
        </div>
      </div>
      <h2>Pet Info</h2>
      <ul className="pet-info-list"> {/* Changed class name */}
        <li className="pet-info-item">
          <strong>Species:</strong> Dog
        </li>
        <li className="pet-info-item">
          <strong>Breed:</strong> Labrador Retriever
        </li>
        <li className="pet-info-item">
          <strong>Age:</strong> 3 years
        </li>
        <li className="pet-info-item">
          <strong>Vaccine Status:</strong> Up to date
        </li>
        <li className="pet-info-item">
          <strong>Neuter Status:</strong> Neutered
        </li>
        <li className="pet-info-item">
          <strong>Location:</strong> New York, NY
        </li>
      </ul>
      <h2>Links</h2>
      <ul className="skill-list">
        <li className="skill-item">
          NextJS: <a href="https://nextjs.org/docs" className="profile-link">https://nextjs.org/docs</a>
        </li>
        {/* ... (other links) */}
      </ul>
      <h2>Photo Gallery</h2>
      <div className="photo-gallery">
        <Image src="/kevin2.jpg" alt="Gallery Image 1" width={100} height={100} />
        <Image src="/kevin3.jpg" alt="Gallery Image 2" width={100} height={100} />
        <Image src="/kevin3.jpg" alt="Gallery Image 3" width={100} height={100} />
      </div>
    </div>
  );
}
