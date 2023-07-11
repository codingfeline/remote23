export { default as React, Fragment } from 'react'
export { useEffect, useState } from 'react'
export { usePathname } from 'next/navigation'
export { default as Image } from 'next/image'
export { default as Link } from 'next/link'

export { default as Header } from '@components/Header'
export { default as Footer } from '@components/Footer'

export { default as Contact } from '@components/contact'
export { default as Server } from '@components/server'
export { default as Method } from '@components/method'
export { default as UserPass } from '@components/usernamePassword'
export { default as Device } from '@components/device'

export { default as axios } from 'axios'
// export { default as parse } from 'html-react-parser'

export { default as UseProvider } from '@redux/provider'
export { useAppDispatch, useAppSelector } from '@redux/hooks'
export { increment } from '@redux/features/counter/counterSlice'

// export { Dialog, Transition } from '@headlessui/react'
export { FaBars } from 'react-icons/fa'
export { MdContentCopy as Copy } from 'react-icons/md'
export { MdOutlineEdit as Edit } from 'react-icons/md'

// export { default as Modal } from './Modal'

// export { default as ContentEditable } from 'react-contenteditable'

// icons
export { BsChevronCompactLeft as Left } from 'react-icons/bs'
export { BsChevronCompactRight as Right } from 'react-icons/bs'
export { RxDotFilled as Dot } from 'react-icons/rx'
export { RiAddLine as Plus } from 'react-icons/ri'
export { BiHide as Hide, BiShow as Show } from 'react-icons/bi'