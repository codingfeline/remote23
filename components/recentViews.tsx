import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'

interface Option {
  value: string
  label: string
}

const RecentViews = () => {
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

  return (
    <div className="flex flex-col w-[220px] bg-lime-50">
      <h5>Recent Views</h5>
      <div className="links  items-start">
        {recent.map(c => {
          return (
            <div className="flex flex-row w-full justify-between items-center">
              <Link className="w-full" href={`/cust/${c.value}`}>
                {c.label}
              </Link>
              <MdClose onClick={() => removeRecent(c.value)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentViews
