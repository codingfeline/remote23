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
    const store = localStorage.getItem('recent') || ''
    const curr = JSON.parse(store)
    //remove the item from current list
    const newArr = curr.filter((item: Option) => item.value !== r_item.value)
    // add the item to the top of the list
    newArr.unshift(r_item)
    localStorage.setItem('recent', JSON.stringify(newArr))
    router.push(`/cust/${r_item.value}`)
  }

  if (!recent.length) return ''

  return (
    <div className="flex flex-col w-[220px] rounded-md">
      <div className="links  items-start bg-indigo-300 p-2 rounded-md border border-indigo-600 text-indigo-800">
        <h6>Recent Views</h6>
        {recent.map(c => {
          return (
            <>
              <div className="recent flex flex-row w-full justify-between items-center">
                <button onClick={() => goRecent(c)}>{c.label}</button>
                <MdClose onClick={() => removeRecent(c.value)} />
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default RecentViews
