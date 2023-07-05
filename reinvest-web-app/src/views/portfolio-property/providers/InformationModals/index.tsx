import { useToggler } from 'hooks/toggler';
import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { JobsCreatedModal } from './modals/JobsCreated';
import { ProjectReturnModal } from './modals/ProjectReturn';
import { RatingModal } from './modals/Rating';
import { StructureModal } from './modals/Structure';
import { TotalProjectSizeModal } from './modals/TotalProjectSize';
import { UnitsModal } from './modals/Units';

const PROVIDER_NAME = 'InformationModalsProvider';
export const useInformationModals = createContextConsumer(Context, PROVIDER_NAME);

export function InformationModalsProvider({ children }: PropsWithChildren) {
  const [isProjectReturnModalOpen, toggleIsProjectReturnModalOpen] = useToggler(false);
  const [isStructureModalOpen, toggleIsStructureModalOpen] = useToggler(false);
  const [isRatingModalOpen, toggleIsRatingModalOpen] = useToggler(false);
  const [isUnitsModalOpen, toggleIsUnitsModalOpen] = useToggler(false);
  const [isTotalProjectSizeModalOpen, toggleIsTotalProjectSizeModalOpen] = useToggler(false);
  const [isJobsCreatedModalOpen, toggleIsJobsCreatedModalOpen] = useToggler(false);

  return (
    <Context.Provider
      value={{
        toggleIsProjectReturnModalOpen,
        toggleIsStructureModalOpen,
        toggleIsRatingModalOpen,
        toggleIsUnitsModalOpen,
        toggleIsTotalProjectSizeModalOpen,
        toggleIsJobsCreatedModalOpen,
      }}
    >
      <>
        {children}

        <ProjectReturnModal
          isModalOpen={isProjectReturnModalOpen}
          onModalOpenChange={toggleIsProjectReturnModalOpen}
        />

        <StructureModal
          isModalOpen={isStructureModalOpen}
          onModalOpenChange={toggleIsStructureModalOpen}
        />

        <RatingModal
          isModalOpen={isRatingModalOpen}
          onModalOpenChange={toggleIsRatingModalOpen}
        />

        <UnitsModal
          isModalOpen={isUnitsModalOpen}
          onModalOpenChange={toggleIsUnitsModalOpen}
        />

        <TotalProjectSizeModal
          isModalOpen={isTotalProjectSizeModalOpen}
          onModalOpenChange={toggleIsTotalProjectSizeModalOpen}
        />

        <JobsCreatedModal
          isModalOpen={isJobsCreatedModalOpen}
          onModalOpenChange={toggleIsJobsCreatedModalOpen}
        />
      </>
    </Context.Provider>
  );
}
