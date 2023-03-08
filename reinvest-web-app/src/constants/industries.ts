import { SelectOption } from "components/Select";

export const INDUSTRIES = [
  "Accommodation and Food Services",
  "Agriculture, Forestry, Fishing, and Hunting",
  "Arts, Entertainment, and Recreation",
  "Construction",
  "Educational Services",
  "Finance and Insurance",
  "Health Care and Social Assistance",
  "Information",
  "Management of Companies and Enterprises",
  "Manufacturing",
  "Mining, Quarrying, and Oil and Gas Extraction",
  "Other Services (except Public Administration)",
  "Professional, Scientific, and Technical Services",
  "Public Administration",
  "Real Estate and Rental and Leasing",
  "Retail Trade",
  "Transportation and Warehousing",
  "Utilities",
  "Wholesale Trade",
  "Government"
];

export const INDUESTRIES_AS_OPTIONS: SelectOption[] = INDUSTRIES.map((industry) => {
  const value = industry.toLowerCase().replace(/ /g, "-");

  return {
    label: industry,
    value
  }
})

