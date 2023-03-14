import { IconPencil } from 'assets/icons/IconPencil';
import { InputHTMLAttributes } from 'react';

type PrimitveProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'onChange' | 'accept'>;
type Props = PrimitveProps;

export const EditAvatarButton = ({ name, onChange, accept }: Props) => (
  <>
    <input
      type="file"
      id={name}
      name={name}
      className="hidden"
      accept={accept}
      onChange={onChange}
    />

    <div className="grid h-32 w-32 place-items-center rounded-full bg-green-frost-01">
      <IconPencil className="fill-black-01" />
    </div>
  </>
);
