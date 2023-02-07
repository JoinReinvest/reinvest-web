import { Dialog } from '@hookooekoo/ui-dialog'

import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export interface Props {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  children: ReactNode;
}

export const BlackModal = ({ isOpen = false, onOpenChange, children }: Props) => (
  <Dialog
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    className="modal-fullscreen"
  >
    <div className="h-full w-full flex flex-col justify-between items-center overflow-y-hidden py-40 px-20 gap-40 text-white">
      <Header />
      <div className="max-w-330 mx-auto overflow-x-auto">{children}</div>
      <Footer />
    </div>
  </Dialog>
)
