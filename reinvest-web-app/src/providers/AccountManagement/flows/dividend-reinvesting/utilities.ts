enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export const getStatusValue = (state: boolean) => {
  return state ? Status.ACTIVE : Status.INACTIVE;
};
