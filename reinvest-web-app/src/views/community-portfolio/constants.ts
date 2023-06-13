// TO-DO: Deprecate and use API once the properties endpoints
// are available.

import { PropertyCharacteristicType, PropertyDetails } from './interfaces';

const NUMBER_OF_PROPERTIES = 6;

const IMAGES = [
  'https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=',
  'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
  'https://img.freepik.com/premium-photo/geometric-facades-residential-building_294094-27.jpg',
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
      author: { uri: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png', initials: '' },
      date: 'Fri, 09 Jun 2023 07:53:38 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet Project update lorem ipsum dolor sit amet Project update lorem ipsum dolor sit amet',
        image: 'https://cdn.pixabay.com/photo/2 017/04/24/13/37/architecture-2256489_1280.jpg',
      },
    },
    {
      author: { uri: 'https://e7.pngegg.com/pngimages/778/849/png-clipart-computer-icons-user-login-avatar-small-icons-angle-heroes.png', initials: '' },
      date: 'Fri, 09 Jun 2023 07:52:39 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet',
      },
    },
    {
      author: { uri: 'https://e7.pngegg.com/pngimages/778/849/png-clipart-computer-icons-user-login-avatar-small-icons-angle-heroes.png', initials: '' },
      date: 'Fri, 09 Jun 2023 07:53:39 GMT',
      content: {
        info: 'Project update lorem ipsum dolor sit amet',
        image: 'https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg',
      },
    },
  ],
};

export const PROPERTIES = new Array(NUMBER_OF_PROPERTIES).fill(PROPERTY).map((property, index) => ({ ...property, id: `${index}` }));
