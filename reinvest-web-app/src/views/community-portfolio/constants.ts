// TO-DO: Deprecate and use API once the properties endpoints
// are available.

import { PropertyCharacteristicType, PropertyDetails } from './interfaces';

const NUMBER_OF_PROPERTIES = 6;

const IMAGES = [
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1292&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1aWxkaW5nc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
];

export const PROPERTY: PropertyDetails = {
  id: '1',
  address: {
    __typename: 'Address',
    addressLine1: '1613 S Park St',
    city: 'Kingsford',
    state: 'MI',
    country: 'US',
    zip: '49802',
  },
  meta: {
    thumbnail: IMAGES.at(0) || '',
    images: IMAGES,
    metrics: {
      key: { projectReturn: '10%', structure: 'Equity', rating: 'A' },
      impact: { units: '10%', totalProjectSize: '-', jobsCreated: '300' },
    },
  },
  location: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  characteristics: [
    { type: PropertyCharacteristicType.transport, value: 'Vehicle-Dependant', info: 'Some public transit available' },
    { type: PropertyCharacteristicType.education, value: 'Good Schools', info: 'Good Schools and education oppertunities' },
  ],
  updates: [
    {
      author: {
        uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
        initials: '',
      },
      date: 'Fri, 09 Jun 2023 07:53:38 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet Project update lorem ipsum dolor sit amet Project update lorem ipsum dolor sit amet',
        image:
          'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      },
    },
    {
      author: {
        uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        initials: '',
      },
      date: 'Fri, 09 Jun 2023 07:52:39 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet',
      },
    },
    {
      author: {
        uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        initials: '',
      },
      date: 'Fri, 09 Jun 2023 07:53:39 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet',
        image:
          'https://images.unsplash.com/photo-1525962898597-a4ae6402826e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      },
    },
  ],
};

export const PROPERTIES = new Array(NUMBER_OF_PROPERTIES).fill(PROPERTY).map((property, index) => ({ ...property, id: `${index}` }));
