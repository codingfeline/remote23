import React, { useEffect, useState } from 'react'
import { CustomerType } from '@utils/types/customer'

const CustomerName = ({ id }: { id: string }) => {
  const [data, setData] = useState<CustomerType>({} as CustomerType)

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3121/api/customers/nameId`)
      if (response.ok) {
        const data = await response.json()
        setData(data.filter((c: CustomerType) => c._id === id)[0])
      } else {
        console.error('Failed to fetch data from API')
      }
    } catch (error) {
      console.error('Error fetching data from API:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data.name
}

export default CustomerName
