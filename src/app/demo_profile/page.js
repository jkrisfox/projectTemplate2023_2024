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
      <h2>Skills</h2>
      <ul className="skill-list">
        <li className="skill-item">Skill 1</li>
        <li className="skill-item">Skill 2</li>
        <li className="skill-item">Skill 3</li>
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
