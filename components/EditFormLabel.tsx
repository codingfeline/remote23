//prettier-ignore
import { BackButton, useAppSelector } from '@components'

const EditFormLabel = ({
  label,
  cid,
  children,
}: {
  label: string
  cid: string
  children: React.ReactNode
}) => {
  const customer = useAppSelector(state => state.customer.customers).filter(
    c => c._id === cid
  )[0]

  return (
    <div className="mt-6 place-self-center w-full sm:w-3/5 md:w-2/5 flex flex-col ">
      <div className="flex justify-center w-full">
        <span
          className={`rounded-l-md border p-2 border-r-0
        ${label === 'Network' && 'bg-green-200 border-green-300'}
        ${label === 'Scan-to-folder' && 'bg-indigo-200 border-indigo-300'}
        ${label === 'Scan-to-email' && 'bg-red-200 border-red-300'}
        ${label === 'Device' && 'bg-orange-200 border-orange-300'}
        ${label === 'Server' && 'bg-lime-200 border-lime-300'}
        ${label === 'Contact' && 'bg-blue-200 border-blue-300'}
        ${label === 'Remote Method' && 'bg-yellow-200 border-yellow-300'}
        `}
        >
          {customer.name}
        </span>
        <span
          className={`rounded-r-md border p-2
        ${label === 'Network' && 'bg-green-100 border-green-300'}
        ${label === 'Scan-to-folder' && 'bg-indigo-100 border-indigo-300'}
        ${label === 'Scan-to-email' && 'bg-red-100 border-red-300'}
        ${label === 'Device' && 'bg-orange-100 border-orange-300'}
        ${label === 'Server' && 'bg-lime-100 border-lime-300'}
        ${label === 'Contact' && 'bg-blue-100 border-blue-300'}
        ${label === 'Remote Method' && 'bg-yellow-100 border-yellow-300'}
        `}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

export default EditFormLabel
