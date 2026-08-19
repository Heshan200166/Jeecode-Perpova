import Logo from '@/components/Logo'
import { getCollections } from '@/data/data'
import { getCurrencies, getLanguages } from '@/data/navigation'
import clsx from 'clsx'
import { FC } from 'react'
import AvatarDropdown from './AvatarDropdown'
import CartBtn from './CartBtn'
import CurrLangDropdown from './CurrLangDropdown'
import HamburgerBtnMenu from './HamburgerBtnMenu'
import NavLinks from './NavLinks'
import SearchBtnPopover from './SearchBtnPopover'

export interface HeaderProps {
  hasBorderBottom?: boolean
}

const Header: FC<HeaderProps> = async ({ hasBorderBottom = true }) => {
  const currencies = await getCurrencies()
  const languages = await getLanguages()

  return (
    <div className="relative z-10">
      <div className="container">
        <div
          className={clsx(
            'flex h-28 justify-between gap-x-2.5 border-neutral-200 dark:border-neutral-700',
            hasBorderBottom && 'border-b',
            !hasBorderBottom && 'has-[.header-popover-full-panel]:border-b'
          )}
        >
          <div className="flex items-center gap-x-6">
            <Logo />
            <NavLinks />
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-2.5 sm:gap-x-5">
            <div className="block lg:hidden">
              <HamburgerBtnMenu />
            </div>
            <CurrLangDropdown currencies={currencies} languages={languages} className="hidden md:block" />
            <SearchBtnPopover />
            <AvatarDropdown />
            <CartBtn />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
