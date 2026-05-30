import './ActionButton.css';

export default function ActionButton({ type, onClick }) {
  const isLike = type === 'like';

  return (
    <button
      className={`action-btn action-btn-${type}`}
      onClick={onClick}
      aria-label={isLike ? 'Like' : 'Pass'}
    >
      {isLike ? (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      )}
    </button>
  );
}