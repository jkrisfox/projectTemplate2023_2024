import Image from 'next/image';
import './style.css';

export default function SearchPage() {
  return (
    <div className="search-page-container">
      <div className="search-bar">
        <input type="text" placeholder="Search Profiles" className="search-input" />
        <button className="search-button">Search</button>
      </div>
      <div className="profile-list">
        {/* Profile Card 1 */}
        <div className="profile-card">
          <div className="profile-image">
            <Image src="/profile-picture.jpg" alt="Profile Picture" width={200} height={200} />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Alex</h2>
            <p className="profile-species">Species: Bird</p>
            <p className="profile-breed">Breed: Blue Macaw</p>
            <p className="profile-location">Location: Rio, BZ</p>
          </div>
        </div>
        
        {/* Profile Card 2 (You can add more profiles) */}
        <div className="profile-card">
          <div className="profile-image">
            <Image src="/profile-picture.jpg" alt="Profile Picture" width={200} height={200} />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Jithan</h2>
            <p className="profile-species">Species: Cat</p>
            <p className="profile-breed">Breed: Siamese</p>
            <p className="profile-location">Location: Los Angeles, CA</p>
          </div>
        </div>
        {/* Profile Card 3 (You can add more profiles) */}
        <div className="profile-card">
          <div className="profile-image">
            <Image src="/profile-picture.jpg" alt="Profile Picture" width={200} height={200} />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Gus</h2>
            <p className="profile-species">Species: Dog</p>
            <p className="profile-breed">Breed: Chonker</p>
            <p className="profile-location">Location: San Diego, CA</p>
          </div>
        </div>
        {/* Profile Card 4 (You can add more profiles) */}
        <div className="profile-card">
          <div className="profile-image">
            <Image src="/profile-picture.jpg" alt="Profile Picture" width={200} height={200} />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Muhammad</h2>
            <p className="profile-species">Species: Cat</p>
            <p className="profile-breed">Breed: Garfield</p>
            <p className="profile-location">Location: Where ever Garfield from, CA</p>
          </div>
        </div>
        {/* Profile Card 5 (You can add more profiles) */}
        <div className="profile-card">
          <div className="profile-image">
            <Image src="/profile-picture.jpg" alt="Profile Picture" width={200} height={200} />
          </div>
          <div className="profile-details">
            <h2 className="profile-name">Ricky</h2>
            <p className="profile-species">Species: Dog</p>
            <p className="profile-breed">Breed: Pupper</p>
            <p className="profile-location">Location: Las Vegas, NV</p>
          </div>
        </div>
      </div>
    </div>
  );
}