import React, { useState } from 'react';
import './EditProfileCard.css';
import './EditProfile.css';

const EditProfileCard = () => {
  const profileImage =
    'https://img.freepik.com/vecteurs-premium/femme-problemes-psychologiques-concept-jeune-fille-confuse-triste-chaos-incertitude-frustration-desespoir-illustration-vectorielle-plate-dessin-anime-isolee-fond-blanc_118813-16573.jpg?w=826';
  
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

  return (
    <section className='edit-section-content'>

      <div className="edit-profile-container">
        <div className="profile-img-wrapper">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-img"
          />


        </div>
  
      
          <div className="profile-info">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Last Name:</strong> {lastName}</p>
            <p><strong>First Name:</strong> {firstName}</p>
            <button className="edit-btn">Edit Profile</button>
          </div>
      </div>

    </section>);

 
};

export default EditProfileCard;
