import EducationPage from './education';

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default EducationPage;
