import { useState, useEffect } from 'react';
import DogCard from '../components/DogCard';
import ActionButton from '../components/ActionButton';
import MatchModal from '../components/MatchModal';
import { useDogContext } from '../context/DogContext';
import './SwipeScreen.css';

export default function SwipeScreen() {
  const { currentDog, dogs, currentIndex, swipeRight, swipeLeft, matches } = useDogContext();
  const [matchedDog, setMatchedDog] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(null);

  const swipedIds = matches?.map((m) => m.id) || [];

  const availableDogs = dogs.filter((d) => !swipedIds.includes(d.id));
  const currentDogCard = availableDogs[0];

  const handleSwipe = async (direction) => {
    if (isAnimating || !currentDogCard) return;

    setIsAnimating(true);
    setDirection(direction);

    setTimeout(async () => {
      let result = null;
      if (direction === 'right') {
        result = await swipeRight();
        if (result?.isMatch) {
          setMatchedDog(currentDogCard);
        }
      } else {
        await swipeLeft();
      }
      setIsAnimating(false);
      setDirection(null);
    }, 300);
  };

  if (!currentDogCard) {
    return (
      <div className="screen swipe-screen">
        <div className="empty-state">
          <h2>No more dogs nearby</h2>
          <p>Check back later for more furry friends!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen swipe-screen">
      <div className="swipe-header">
        <h1 className="app-title">DogDate</h1>
        <span className="match-count">{matches.length} matches</span>
      </div>

      <div className="card-container">
        <DogCard
          dog={currentDogCard}
          style={{
            transform: isAnimating
              ? `translateX(${direction === 'right' ? '150%' : '-150%'}) rotate(${direction === 'right' ? '30deg' : '-30deg'})`
              : 'translateX(0) rotate(0)',
            opacity: isAnimating ? 0 : 1,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}
        />
      </div>

      <div className="swipe-actions">
        <ActionButton type="pass" onClick={() => handleSwipe('left')} />
        <ActionButton type="like" onClick={() => handleSwipe('right')} />
      </div>

      {matchedDog && (
        <MatchModal
          match={matchedDog}
          currentDog={currentDog}
          onClose={() => setMatchedDog(null)}
        />
      )}
    </div>
  );
}