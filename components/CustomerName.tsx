import React, { useEffect, useState } from 'react'
import { CustomerType } from '@utils/types/customer'
import axios from '@components/axios'

const CustomerName = ({ id }: { id: string }) => {
  const [data, setData] = useState<CustomerType>({} as CustomerType)

  const fetchData = async () => {
    await axios
      .get('customers/nameId')
      .then(res => {
        console.log(res.data)
        setData(res.data.filter((c: CustomerType) => c._id === id)[0])
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data.name
}

export default CustomerName
