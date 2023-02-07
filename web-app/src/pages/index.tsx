import { NextPage } from 'next';

import { BlackModal } from '../components/BlackModal';
import { MainLayout } from '../layouts/MainLayout';

const Index: NextPage = () => {
  return (
    <MainLayout>
      Content
      <BlackModal
        isOpen={true}
        onOpenChange={() => console.log(1)}
      >
       modal content
      </BlackModal>
    </MainLayout>
  );
};

export default Index;
