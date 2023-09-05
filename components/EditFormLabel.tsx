//prettier-ignore
import { BackButton, useAppSelector, useRouter } from '@components'

const EditFormLabel = ({
  label,
  cid,
  children,
}: {
  label: string
  cid: string
  children: React.ReactNode
}) => {
  const router = useRouter()
  const customer = useAppSelector(state => state.customer.customers).filter(
    c => c._id === cid
  )[0]

  if (!customer) {
    return (
      <div className="error">
        <h5>
          ID <i>{cid}</i> not found.
        </h5>
        <button onClick={() => router.push('/')}>home</button>
      </div>
    )
  }

  return (
    <div className="mt-6 place-self-center w-full sm:w-[450px]  flex flex-col ">
      <div className="flex justify-center w-full">
        <span
          className={`rounded-l-md border p-2 border-r-0
        ${label.includes('Network') && 'networkDark'}
        ${label.includes('Solution') && 'solutionDark'}
        ${label.includes('Folder') && 'folderDark'}
        ${label.includes('Email') && 'emailDark'}
        ${label.includes('Device') && 'deviceDark'}
        ${label.includes('Server') && 'serverDark'}
        ${label.includes('Contact') && 'contactDark'}
        ${label.includes('Method') && 'methodDark'}
        `}
        >
          {customer.name}
        </span>
        <span
          className={`rounded-r-md border p-2 
          ${label.includes('Method') && 'methodLight'}
          ${label.includes('Server') && 'serverLight'}
          ${label.includes('Network') && 'networkLight'}
          ${label.includes('Solution') && 'solutionLight'}
          ${label.includes('Folder') && 'folderLight'}
          ${label.includes('Email') && 'emailLight'}
          ${label.includes('Device') && 'deviceLight'}
          ${label.includes('Contact') && 'contactLight'}
        `}
        >
          {label}
        </span>
      </div>
      <div
        className={`editForm border
        ${label.includes('Server') && 'serverLight'}
        ${label.includes('Method') && 'methodLight'}
        ${label.includes('Network') && 'networkLight'}
        ${label.includes('Solution') && 'solutionLight'}
        ${label.includes('Folder') && 'folderLight'}
        ${label.includes('Email') && 'emailLight'}
        ${label.includes('Device') && 'deviceLight'}
        ${label.includes('Contact') && 'contactLight'}
      `}
      >
        {children}
      </div>
      <BackButton cid={cid} />
    </div>
  )
}

export default EditFormLabel
