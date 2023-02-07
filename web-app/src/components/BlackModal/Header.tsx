import { DialogClose } from '@hookooekoo/ui-dialog'
import { IconArrowLeft } from 'assets/icons/IconArrowLeft'
import { Logo } from 'assets/Logo'

export const Header = () => (
  <header className="w-full">
      <div className="absolute l-20 t-30">
        <DialogClose>
          <IconArrowLeft className="stroke-white" />
        </DialogClose>
      </div>

    <Logo className="fill-white mx-auto" />
  </header>
)
