import './DogCard.css';

export default function DogCard({ dog, style }) {
  if (!dog) return null;

  return (
    <div className="dog-card" style={style}>
      <img src={dog.photoUrl} alt={dog.name} className="dog-photo" />
      <div className="dog-info">
        <h2 className="dog-name">{dog.name}</h2>
        <p className="dog-details">
          {dog.breed} · {dog.age} {dog.age === 1 ? 'year' : 'years'} old
        </p>
      </div>
    </div>
  );
}