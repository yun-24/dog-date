import { useDogContext } from '../context/DogContext';
import './MatchesScreen.css';

export default function MatchesScreen() {
  const { matches } = useDogContext();

  return (
    <div className="screen matches-screen">
      <h1 className="screen-title">My Matches</h1>

      {matches.length === 0 ? (
        <div className="empty-matches">
          <p>No matches yet. Start swiping!</p>
        </div>
      ) : (
        <div className="matches-list">
          {matches.map((match) => (
            <div key={match.id} className="match-item">
              <img src={match.photoUrl} alt={match.name} className="match-avatar" />
              <div className="match-info">
                <h3 className="match-name">{match.name}</h3>
                <p className="match-breed">{match.breed}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}