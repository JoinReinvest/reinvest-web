import { IconPencil } from 'assets/icons/IconPencil';
import { ChangeEventHandler } from 'react';

interface Props {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
}

export const EditAvatarButton = ({ name, handleChange }: Props) => (
  <>
    <input
      type="file"
      id={name}
      name={name}
      className="hidden"
      accept="image/*"
      onChange={handleChange}
    />

    <div className="grid h-32 w-32 place-items-center rounded-full bg-green-frost-01">
      <IconPencil className="fill-black-01" />
    </div>
  </>
);
