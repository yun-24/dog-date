# DogDate - MVP Specification

## Overview

A Tinder-style dog dating app where users create a profile for their dog and swipe through other dogs to find matches.

**Core loop**: Upload your dog → See other dogs → Swipe right to like, left to pass → Get matched when both dogs like each other

---

## Technical Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React + Vite | Fast dev, modern tooling |
| Styling | CSS Modules or Tailwind | Scoped, no conflicts |
| State | React Context + useReducer | Simple, no extra deps |
| Data | Local mock API | Easy to swap later |
| Storage | localStorage | Data survives refresh |
| Hosting target | Vercel / Netlify | Free, instant deploy |

---

## Architecture for Evolution

### API Abstraction Layer

Even in MVP, API calls are wrapped in service functions. This makes backend swap-in trivial later.

```
src/
├── services/
│   └── api.js          ← All API calls go here (even if mock)
├── components/         ← Pure UI components
├── hooks/              ← Business logic (useDogs, useMatch)
├── context/            ← App-wide state
└── screens/            ← Page-level components
```

### API Service Interface (mock now, real later)

```javascript
// This stays the same - only implementation changes
getDogs()            → returns list of dogs
getDog(id)           → returns single dog
likeDog(id)          → records a like
createProfile(dog)   → creates user's dog profile
getMatches()          → returns mutual matches
```

### State Shape (stable across versions)

```javascript
{
  currentDog: { id, name, photoUrl, breed, age },
  dogs: [{ id, name, photoUrl, breed, age, liked: null }],
  matches: [{ id, name, photoUrl }],
  profileCreated: boolean
}
```

---

## Screen Flow

```
[Onboarding] → [Swipe] ←→ [Match Modal]
     ↓            ↓
[Profile] ←→ [Match] → [Chat? (future)]
```

---

## Screens

### 1. Onboarding Screen
- Input: Dog's name (required)
- Input: Dog's photo (URL input for MVP, file upload later)
- Input: Breed (text, optional)
- Input: Age (number, optional)
- Action: "Start Swiping" button
- Storage: Saves to localStorage

### 2. Swipe Screen
- Large photo card of a dog
- Dog name + breed + age below photo
- Two buttons: Pass (left) / Like (right)
- Visual feedback on swipe (color flash)
- Card animation: fly off screen on swipe
- When all dogs seen: "No more dogs nearby" message

### 3. Match Modal
- Triggered when mutual like detected
- Shows: "It's a Match!" + both dog photos
- Action: "Keep Swiping" / "View Matches"

### 4. Profile Screen
- Shows current user's dog profile
- Edit button to update name/photo
- Shows match count

### 5. Matches Screen (stretch for MVP)
- List of all matched dogs
- Tap to see dog details

---

## Mock Data

```javascript
const mockDogs = [
  { id: '1', name: 'Buddy', breed: 'Golden Retriever', age: 3, photoUrl: '...' },
  { id: '2', name: 'Max', breed: 'German Shepherd', age: 2, photoUrl: '...' },
  // 10-20 dogs with realistic names, breeds, ages
  // Use picsum.photos or dog CEO API for placeholder images
]
```

---

## MVP Features Checklist

- [ ] Onboarding form with dog name + photo
- [ ] localStorage persistence
- [ ] Swipe right = like, left = pass
- [ ] Match detection (mutual likes)
- [ ] Match celebration modal
- [ ] Mobile-responsive design
- [ ] Graceful "no more dogs" state

---

## What This MVP Does NOT Include (add later)

- User authentication (login/signup)
- Real photo upload (file → URL)
- Push notifications
- Chat/messaging
- Location-based matching
- Real backend/database

---

## Evolution Path → Full Version

| MVP | Full Version |
|-----|--------------|
| localStorage | Supabase/Firebase |
| Mock API | Real REST/GraphQL API |
| Static photo URLs | S3/Cloudinary storage |
| Single user | Multi-user with auth |
| Like/Pass | Filters (breed, age, distance) |
| Mock matches | Real-time match notifications |

**The hook/API layer insulates all UI from data source changes.**

---

## File Structure

```
dog-date/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── services/
│   │   └── api.js           ← API abstraction
│   ├── context/
│   │   └── DogContext.jsx   ← Global state
│   ├── hooks/
│   │   ├── useDogs.js       ← Dog fetching logic
│   │   └── useSwipe.js      ← Swipe detection
│   ├── components/
│   │   ├── DogCard.jsx
│   │   ├── ActionButton.jsx
│   │   ├── MatchModal.jsx
│   │   └── OnboardingForm.jsx
│   └── screens/
│       ├── OnboardingScreen.jsx
│       ├── SwipeScreen.jsx
│       ├── ProfileScreen.jsx
│       └── MatchesScreen.jsx
└── PLAN.md
```

---

## Getting Started

```bash
# 1. Create project
npm create vite@latest dog-date -- --template react
cd dog-date

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

---

## Verification Plan

1. Onboarding → creates profile → stored in localStorage
2. Swipe screen → shows dog cards from mock data
3. Swipe right → dog marked as liked, next card shows
4. Like 2 mock dogs where both "like you back" → Match modal appears
5. Profile screen → shows user's dog info
6. Refresh page → data persists (localStorage)
7. Mobile viewport → still usable (responsive)