import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'
import { useRouter } from 'next/navigation'

interface Option {
  value: string
  label: string
}

const RecentViews = () => {
  const router = useRouter()
  const [recent, setRecent] = useState<Option[]>([])

  useEffect(() => {
    const store = localStorage.getItem('recent')
    if (store) {
      setRecent(JSON.parse(store))
    }
  }, [])

  const removeRecent = (id: string) => {
    const newItems = recent.filter(r => {
      return r.value !== id
    })
    setRecent(newItems)
    localStorage.setItem('recent', JSON.stringify(newItems))
  }

  const goRecent = (r_item: Option) => {
    const store = localStorage.getItem('recent')
    const curr = JSON.parse(store)
    //remove the item from current list
    const newArr = curr.filter((item: Option) => item.value !== r_item.value)
    // add the item to the top of the list
    newArr.unshift(r_item)
    localStorage.setItem('recent', JSON.stringify(newArr))
    router.push(`/cust/${r_item.value}`)
  }

  return (
    <div className="flex flex-col w-[220px] bg-lime-50 rounded-md p-3 ">
      <h5>Recent Views</h5>
      <div className="links  items-start">
        {recent.map(c => {
          return (
            <div className="flex flex-row w-full justify-between items-center">
              <button onClick={() => goRecent(c)}>{c.label}</button>
              <MdClose onClick={() => removeRecent(c.value)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentViews
