import React from 'react'
import LanguageSwitcher from './language-switcher'

export default function Navbar() {
  return (
    <>
    <div className="w-full   p-2">
        <div className="max-w-130 mx-auto flex  justify-end  px-4 sm:px-6 lg:px-8">
            <LanguageSwitcher />
        </div>
    </div>
    </>
  )
}
