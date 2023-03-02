import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';

interface CountryWithCallingCode {
  callingCode: string;
  country: string;
}

const countries = getCountries();

const sortCountriesByCallingCode = (currentCountry: CountryWithCallingCode, nextCountry: CountryWithCallingCode) => {
  const currentCountryCallingCode = parseInt(currentCountry.callingCode);
  const nextCountryCallingCode = parseInt(nextCountry.callingCode);

  return currentCountryCallingCode - nextCountryCallingCode;
};

const filterCountriesWithUniqueCallingCodes = (country: CountryWithCallingCode, index: number, countries: CountryWithCallingCode[]) => {
  const indexInCountries = countries.findIndex(({ callingCode }) => callingCode === country.callingCode);

  const doIndexMatch = indexInCountries === index;

  return doIndexMatch;
};

const mapCountriesWithCallingCodes = (country: CountryCode) => ({
  country,
  callingCode: getCountryCallingCode(country),
});

export const COUNTRIES_WITH_CALLING_CODES = countries
  .map(mapCountriesWithCallingCodes)
  .filter(filterCountriesWithUniqueCallingCodes)
  .sort(sortCountriesByCallingCode);
