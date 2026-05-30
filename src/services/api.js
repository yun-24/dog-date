const MOCK_DOGS = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop',
    likesUser: true,
  },
  {
    id: '2',
    name: 'Max',
    breed: 'German Shepherd',
    age: 2,
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=400&fit=crop',
    likesUser: false,
  },
  {
    id: '3',
    name: 'Luna',
    breed: 'Labrador',
    age: 4,
    photoUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    likesUser: true,
  },
  {
    id: '4',
    name: 'Charlie',
    breed: 'Beagle',
    age: 1,
    photoUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&h=400&fit=crop',
    likesUser: false,
  },
  {
    id: '5',
    name: 'Bella',
    breed: 'Poodle',
    age: 5,
    photoUrl: 'https://images.unsplash.com/photo-1594149929911-78975a43d4f5?w=400&h=400&fit=crop',
    likesUser: true,
  },
  {
    id: '6',
    name: 'Rocky',
    breed: 'Bulldog',
    age: 3,
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
    likesUser: false,
  },
  {
    id: '7',
    name: 'Daisy',
    breed: 'Shih Tzu',
    age: 2,
    photoUrl: 'https://images.unsplash.com/photo-1587015990127-424b954e38b5?w=400&h=400&fit=crop',
    likesUser: false,
  },
  {
    id: '8',
    name: 'Duke',
    breed: 'Husky',
    age: 4,
    photoUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&h=400&fit=crop',
    likesUser: true,
  },
  {
    id: '9',
    name: 'Sadie',
    breed: 'Corgi',
    age: 3,
    photoUrl: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=400&h=400&fit=crop',
    likesUser: false,
  },
  {
    id: '10',
    name: 'Tucker',
    breed: 'Australian Shepherd',
    age: 2,
    photoUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop',
    likesUser: true,
  },
  {
    id: '11',
    name: 'Molly',
    breed: 'Border Collie',
    age: 1,
    photoUrl: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400&h=400&fit=crop',
    likesUser: true,
  },
  {
    id: '12',
    name: 'Cooper',
    breed: 'Rottweiler',
    age: 3,
    photoUrl: 'https://images.unsplash.com/photo-1568287200943-2b8b4cd5e1b8?w=400&h=400&fit=crop',
    likesUser: false,
  },
];

const STORAGE_KEY = 'dogdate_data';

function getStoredData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getDogs() {
  return Promise.resolve([...MOCK_DOGS]);
}

export function getDog(id) {
  const dog = MOCK_DOGS.find((d) => d.id === id);
  return Promise.resolve(dog || null);
}

export function createProfile(profile) {
  const data = getStoredData() || {};
  const updated = { ...data, currentDog: profile, profileCreated: true };
  saveData(updated);
  return Promise.resolve(profile);
}

export function updateProfile(profile) {
  const data = getStoredData() || {};
  const updated = { ...data, currentDog: profile };
  saveData(updated);
  return Promise.resolve(profile);
}

export function getCurrentDog() {
  const data = getStoredData();
  return Promise.resolve(data?.currentDog || null);
}

export function likeDog(id) {
  const data = getStoredData() || { dogs: [], matches: [] };

  let dogs = data.dogs || [];
  const likedDogs = [...dogs, id];

  const dog = MOCK_DOGS.find((d) => d.id === id);
  const isMatch = dog?.likesUser === true;

  let matches = data.matches || [];
  if (isMatch && !matches.find((m) => m.id === id)) {
    matches = [...matches, { ...dog, matchedAt: Date.now() }];
  }

  const updated = { ...data, dogs: likedDogs, matches };
  saveData(updated);

  return Promise.resolve({ success: true, isMatch, matches });
}

export function passDog(id) {
  const data = getStoredData() || { dogs: [] };
  const dogs = [...(data.dogs || []), id];
  saveData({ ...data, dogs });
  return Promise.resolve({ success: true });
}

export function getMatches() {
  const data = getStoredData();
  return Promise.resolve(data?.matches || []);
}

export function getSwipedDogIds() {
  const data = getStoredData();
  return data?.dogs || [];
}