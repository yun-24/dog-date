import { useState } from 'react';
import './OnboardingForm.css';

const DOG_PHOTOS = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587015990127-424b954e38b5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop',
];

export default function OnboardingForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [photoUrl, setPhotoUrl] = useState(DOG_PHOTOS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      breed: breed.trim() || 'Mixed Breed',
      age: parseInt(age) || 1,
      photoUrl,
    });
  };

  return (
    <form className="onboarding-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Create Your Dog's Profile</h1>
      <p className="form-subtitle">Find love for your furry friend</p>

      <div className="photo-selector">
        <img src={photoUrl} alt="Your dog" className="selected-photo" />
        <div className="photo-options">
          {DOG_PHOTOS.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Option ${i + 1}`}
              className={`photo-option ${photoUrl === url ? 'selected' : ''}`}
              onClick={() => setPhotoUrl(url)}
            />
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Dog's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
        required
      />

      <input
        type="text"
        placeholder="Breed (optional)"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        className="form-input"
      />

      <input
        type="number"
        placeholder="Age in years"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="form-input"
        min="1"
      />

      <button type="submit" className="submit-btn">
        Start Dating!
      </button>
    </form>
  );
}