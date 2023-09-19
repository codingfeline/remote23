export { default as React, Fragment } from 'react'
export { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
export { usePathname } from 'next/navigation'
export { default as Image } from 'next/image'
export { default as Link } from 'next/link'
export { useRouter } from 'next/navigation'
export { default as axios } from './axios'
export type { AxiosResponse } from 'axios'
export { default as UseApiCall } from './useApiCall'

export { default as MyHeader } from '@components/MyHeader'
export { default as Footer } from '@components/Footer'
export { default as SubmitButton } from './submitButton'
export { default as EditFormLabel } from './EditFormLabel'
export { default as BackButton } from './BackButton'
export { default as FormBox } from './FormBox'
export { default as AddSolution } from './addCustomer/AddSolution'
export { default as Error } from './addCustomer/Error'
export { default as AddedSuccessfully } from './addCustomer/AddedSuccessfully'
export { default as SelectSolution } from './addCustomer/SelectSolution'

export { default as Contact } from '@components/contact'
export { default as Server } from '@components/server'
export { default as Method } from '@components/method'
export { default as UserPass } from '@components/usernamePassword'
export { default as Device } from '@components/device'
export { default as Setup } from '@components/setup'
export { default as ScanFolder } from '@components/scanFolder'
export { default as ScanEmail } from '@components/scanEmail'

export type { CustomerType } from '@utils/types/customer'
export type { ContactType } from '@utils/types/customer'
export type { MethodInfoType } from '@utils/types/customer'
export type { ServerType } from '@utils/types/customer'
export type { UserPassType } from '@utils/types/customer'
export type { DevicePasswordType } from '@utils/types/customer'
export type { ScanFolderType } from '@utils/types/customer'
export type { ScanEmailType } from '@utils/types/customer'
export type { ServerSetupType } from '@utils/types/customer'
export type { NetworkType } from '@utils/types/customer'
export type { SolutionType } from '@utils/types/customer'
export { type SolutionInfoType } from '@utils/types/customer'

// export { default as parse } from 'html-react-parser'

export { default as UseProvider } from '@redux/provider'
export { useAppDispatch, useAppSelector } from '@redux/hooks'
export { increment } from '@redux/features/counter/counterSlice'
export { fetchCustomers } from '@redux/features/customer/customerSlice'
export { fetchSolutions, addOneSolution } from '@redux/features/solution/solutionSlice'
export { default as fetchCounter } from '@redux/features/counter/counterSlice'
export { fetchUsers } from '@redux/features/user/userSlice'

// hooks
export { default as ToggleHook } from './useToggle'
export { default as useCopyHook } from './useCopyHook'
export { default as UseBack } from './useBack'
export { default as UseForm } from './HandleForm'
export { default as URL } from './Url'

// inputs
export { default as TextArea } from './TextArea'
export { default as TextInput } from './TextInput'
export { default as TextInputCol } from './TextInputCol'
export { default as FormParent } from './FormParent'
export { default as SubmitButtonCol } from './SubmitButtonCol'

// icons
export { FaBars } from 'react-icons/fa'
export { MdContentCopy as Copy } from 'react-icons/md'
export { MdOutlineEdit as Edit } from 'react-icons/md'
export { MdDone as Check } from 'react-icons/md'
export { MdKeyboardBackspace as Back } from 'react-icons/md'
export { GoHome as Home } from 'react-icons/go'
export { BiCheckCircle as CheckCircle } from 'react-icons/bi'
export { RxCrossCircled as Cross } from 'react-icons/rx'
export { TbSend as Send } from 'react-icons/tb'
export { RiDeleteBinLine as Bin, RiDeleteBin6Line as Bin2 } from 'react-icons/ri'
export { BsChevronCompactLeft as Left } from 'react-icons/bs'
export { BsChevronCompactRight as Right } from 'react-icons/bs'
export { RxDotFilled as Dot } from 'react-icons/rx'
export { RiAddLine as Plus } from 'react-icons/ri'
export { BiHide as Hide, BiShow as Show } from 'react-icons/bi'

export { GrUndo as Undo } from 'react-icons/gr'