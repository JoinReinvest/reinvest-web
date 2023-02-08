import { BlackModal } from 'components/BlackModal';
import { useEffect, useState } from 'react';

import { StepEmail } from './components/StepEmail';

export const PasswordResetForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <BlackModal
      isOpen={isOpen}
      onOpenChange={state => {
        setIsOpen(state);
      }}
    >
      <StepEmail />
    </BlackModal>
  );
};
