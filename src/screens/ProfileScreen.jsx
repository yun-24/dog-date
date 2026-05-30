import { useState } from 'react';
import { useDogContext } from '../context/DogContext';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const { currentDog, matches, editProfile } = useDogContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentDog?.name || '');
  const [breed, setBreed] = useState(currentDog?.breed || '');
  const [age, setAge] = useState(currentDog?.age || '');

  const handleSave = async () => {
    await editProfile({
      ...currentDog,
      name: name.trim() || currentDog.name,
      breed: breed.trim() || currentDog.breed,
      age: parseInt(age) || currentDog.age,
    });
    setIsEditing(false);
  };

  if (!currentDog) return null;

  if (isEditing) {
    return (
      <div className="screen profile-screen">
        <h1 className="screen-title">Edit Profile</h1>
        <div className="edit-form">
          <img src={currentDog.photoUrl} alt={currentDog.name} className="profile-photo" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dog's name"
            className="form-input"
          />
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="Breed"
            className="form-input"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            className="form-input"
            min="1"
          />
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen profile-screen">
      <h1 className="screen-title">My Profile</h1>
      <img src={currentDog.photoUrl} alt={currentDog.name} className="profile-photo" />
      <h2 className="profile-name">{currentDog.name}</h2>
      <p className="profile-details">
        {currentDog.breed} · {currentDog.age} {currentDog.age === 1 ? 'year' : 'years'} old
      </p>
      <p className="profile-matches">{matches.length} matches</p>
      <button className="edit-btn" onClick={() => setIsEditing(true)}>
        Edit Profile
      </button>
    </div>
  );
}