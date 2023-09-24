//prettier-ignore
import { BackButton, CustomerType,useAppDispatch, fetchCustomers, useAppSelector, useRouter, useState, useEffect } from '@components'
import {
  useSolutionQuery,
  useSolutionsQuery,
  useAddSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} from '@query/features/solution/solutionSlice'

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
  const dispatch = useAppDispatch()
  const customers = useAppSelector(state => state.customer.customers)
  const cust = customers.filter((c: CustomerType) => c._id === cid)[0]

  // const { data, error, isLoading, isFetching, isSuccess } = useSolutionsQuery()

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (!customers.length) {
    return 'Loading...'
  }

  if (!cust) {
    return (
      <div className="error">
        <h5>
          ID <i>{cid}</i> not found.
        </h5>
        {/* {JSON.stringify(data)} */}
        <button onClick={() => router.push('/')}>home</button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center grow">
      <div className=" w-full sm:w-[450px]   flex flex-col  ">
        <div className="flex justify-center w-full ">
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
            {cust.name}
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
        {/* {JSON.stringify(data)} */}
      </div>
    </div>
  )
}

export default EditFormLabel
