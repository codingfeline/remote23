'use client'
//prettier-ignore
import { Link, useState, useAppDispatch, useAppSelector, useEffect, fetchCustomers } from '@components'
import RecentViews from '@components/recentViews'
// import SelectCustomer from '@components/selectCustomer'
import SelectCustomer2 from '@components/selectCustomer2'
import { BiHide, BiShow } from 'react-icons/bi'
import SiteLayout from '@components/SiteLayout'
import ThemeToggle from '@components/context/ThemeToggle'
import AddCustomer from '@components/addCustomer'
import BackgroundOptions from '@components/backgroundOptions'

export default function Home() {
  const [removeRecent, setRemoveRecent] = useState(true)
  const dispatch = useAppDispatch()
  const [valueToPass, setValueToPass] = useState<string>('')

  const handleBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const remove = localStorage.getItem('removeRecent')
    if (remove === '1') {
      localStorage.setItem('removeRecent', '2')
    } else {
      localStorage.setItem('removeRecent', '1')
    }
    setRemoveRecent(!e.target.checked)
  }

  useEffect(() => {
    dispatch(fetchCustomers())
    const nobox = localStorage.getItem('removeRecent')
    nobox === '2' ? setRemoveRecent(true) : setRemoveRecent(false)
  }, [])

  const RecentBox = () => (
    <div className="flex float-right">
      {!removeRecent ? (
        <>
          <BiShow onClick={() => handleBox} /> Recent
        </>
      ) : (
        <>
          <BiHide onClick={() => handleBox} /> Recent
        </>
      )}
    </div>
  )

  const handleClick = () => {
    const newValue = 'This is the value to pass'
    setValueToPass(newValue)
  }

  return (
    <main className="flex flex-col grow bg-[url('/prism.svg')] bg-cover  ">
      <SelectCustomer2 />
      <div className="flex flex-col justify-between px-3 ">
        <div className="flex grow">
          <AddCustomer />
        </div>
        {/* <div className="flex">
          <div className="flex flex-col  ">
            <div className="checkbox">
              <label htmlFor="recent">
                <input
                  type="checkbox"
                  id="recent"
                  onChange={handleBox}
                  checked={!removeRecent}
                />{' '}
                Recent
              </label>
            </div>
            <div className="flex w-[200px]">{!removeRecent ? <RecentViews /> : ''}</div>
          </div>
        </div> */}
      </div>
    </main>
  )
}
