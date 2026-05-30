import { useState } from 'react';
import { DogProvider, useDogContext } from './context/DogContext';
import OnboardingScreen from './screens/OnboardingScreen';
import SwipeScreen from './screens/SwipeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MatchesScreen from './screens/MatchesScreen';
import './App.css';

function Navigation() {
  const { profileCreated } = useDogContext();
  const [activeTab, setActiveTab] = useState('home');

  if (!profileCreated) {
    return <OnboardingScreen />;
  }

  return (
    <div className="app-container">
      <div className="screen-container">
        {activeTab === 'home' && <SwipeScreen />}
        {activeTab === 'matches' && <MatchesScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </div>
      <nav className="bottom-nav">
        <button
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          className={`nav-link ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
        <button
          className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>
    </div>
  );
}

function App() {
  return (
    <DogProvider>
      <Navigation />
    </DogProvider>
  );
}

export default App;