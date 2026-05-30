import './MatchModal.css';

export default function MatchModal({ match, currentDog, onClose }) {
  if (!match) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="match-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="match-title">It's a Match!</h2>
        <p className="match-subtitle">
          {currentDog?.name} and {match.name} liked each other
        </p>

        <div className="match-photos">
          <img src={currentDog?.photoUrl} alt={currentDog?.name} className="match-photo" />
          <img src={match.photoUrl} alt={match.name} className="match-photo" />
        </div>

        <button className="match-btn" onClick={onClose}>
          Keep Swiping
        </button>
      </div>
    </div>
  );
}