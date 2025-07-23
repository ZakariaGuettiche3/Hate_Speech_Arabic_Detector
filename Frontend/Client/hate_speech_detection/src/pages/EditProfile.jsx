import { useRef } from 'react';
import React, { useState, useEffect } from 'react';
import './EditProfile.css';
// import { FaEye, FaCamera } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const EditProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [profileImage, setProfileImage] = useState('https://img.freepik.com/vecteurs-premium/femme-problemes-psychologiques-concept-jeune-fille-confuse-triste-chaos-incertitude-frustration-desespoir-illustration-vectorielle-plate-dessin-anime-isolee-fond-blanc_118813-16573.jpg?w=826');
    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        newPassword: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", values);

    };

    return (

        <section className='edit-section-content'>

            <div className="edit-profile-container">
                <div className="profile-image-wrapper">
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="edit-profile-image"
                    />
                    <div
                        className="camera-icon"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FaCamera size={30} />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>Email</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>First Name</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>Last Name</label>
                    </div>

                    <div className="input-group password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>Password</label>
                        {!showPassword ? (
                            <FaEye
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEyeSlash
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>

                    <div className="input-group password-wrapper">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleInputChange}
                            placeholder=" "
                            required
                        />
                        <label>New Password</label>
                        {!showNewPassword ? (
                            <FaEye
                                className="eye-icon"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            />
                        ) : (
                            <FaEyeSlash
                                className="eye-icon"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            />
                        )}
                    </div>

                    <div className="edit-form-buttons">
                        <button type="submit" className="edit-save-button">Save</button>
                        <button type="button" className="edit-cancel-button">Cancel</button>
                    </div>
                </form>
            </div>

        </section>
    );
};

export default EditProfile;