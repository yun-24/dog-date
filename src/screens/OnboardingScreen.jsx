import OnboardingForm from '../components/OnboardingForm';
import { useDogContext } from '../context/DogContext';

export default function OnboardingScreen() {
  const { addProfile } = useDogContext();

  return (
    <div className="screen onboarding-screen">
      <OnboardingForm onSubmit={addProfile} />
    </div>
  );
}