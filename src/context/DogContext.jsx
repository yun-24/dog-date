import { createContext, useContext, useReducer, useEffect } from 'react';
import {
  getDogs,
  getCurrentDog,
  getMatches,
  getSwipedDogIds,
  likeDog,
  passDog,
  createProfile,
  updateProfile,
} from '../services/api';

const DogContext = createContext(null);

const initialState = {
  currentDog: null,
  dogs: [],
  currentIndex: 0,
  matches: [],
  isLoading: true,
  profileCreated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CURRENT_DOG':
      return { ...state, currentDog: action.payload, profileCreated: !!action.payload };
    case 'SET_DOGS':
      return { ...state, dogs: action.payload, currentIndex: 0 };
    case 'INCREMENT_INDEX':
      return { ...state, currentIndex: state.currentIndex + 1 };
    case 'SET_MATCHES':
      return { ...state, matches: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function DogProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function init() {
      const [currentDog, allDogs, matches] = await Promise.all([
        getCurrentDog(),
        getDogs(),
        getMatches(),
      ]);

      dispatch({ type: 'SET_CURRENT_DOG', payload: currentDog });
      dispatch({ type: 'SET_DOGS', payload: allDogs });
      dispatch({ type: 'SET_MATCHES', payload: matches });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
    init();
  }, []);

  const swipeRight = async () => {
    const dog = state.dogs[state.currentIndex];
    if (!dog) return null;

    const result = await likeDog(dog.id);
    dispatch({ type: 'INCREMENT_INDEX' });
    if (result.isMatch) {
      dispatch({ type: 'SET_MATCHES', payload: result.matches });
    }
    return result;
  };

  const swipeLeft = async () => {
    const dog = state.dogs[state.currentIndex];
    if (!dog) return;
    await passDog(dog.id);
    dispatch({ type: 'INCREMENT_INDEX' });
  };

  const addProfile = async (profile) => {
    await createProfile(profile);
    dispatch({ type: 'SET_CURRENT_DOG', payload: profile });
  };

  const editProfile = async (profile) => {
    await updateProfile(profile);
    dispatch({ type: 'SET_CURRENT_DOG', payload: profile });
  };

  const getNextDog = () => {
    const swipedIds = getSwipedDogIds();
    const availableDogs = state.dogs.filter(
      (d, idx) => idx >= state.currentIndex && !swipedIds.includes(d.id)
    );
    return availableDogs[0] || null;
  };

  return (
    <DogContext.Provider
      value={{
        ...state,
        swipeRight,
        swipeLeft,
        addProfile,
        editProfile,
        getNextDog,
      }}
    >
      {children}
    </DogContext.Provider>
  );
}

export function useDogContext() {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error('useDogContext must be used within DogProvider');
  }
  return context;
}