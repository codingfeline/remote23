import React, { useEffect, useState } from 'react'
import { CustomerType } from '@utils/types/customer'
import axios from '@components/axios'
import { useRouter } from 'next/navigation'

const CustomerName = ({ id }: { id: string }) => {
  const router = useRouter()
  const [data, setData] = useState<CustomerType>({} as CustomerType)

  const fetchData = async () => {
    await axios
      .get('customers/nameId')
      .then(res => {
        if (!res.data) alert('error')
        setData(res.data.filter((c: CustomerType) => c._id === id)[0])
      })
      .catch(err => {
        router.push('/')
        console.log(err)
      })
  }
  if (!data) {
    return 'error'
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data.name
}

export default CustomerName
