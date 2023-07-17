import { useEffect, useState } from '@components'

// const useFetch = <T,>(url: string, initialState: T): [T, boolean, boolean] => {
const useFetch = (url: string) => {
  // const [info, setInfo] = useState<T>(initialState)
  const [info, setInfo] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState('checking')

  useEffect(() => {
    fetch(url).then(res => {
      if (!res.ok) {
        throw Error('error occured')
      }
      return res.json()
    })
      .then(data => {
        setInfo(data)
        setIsPending(false)
        setError('fetch ok')
      })
      .catch(err => {
        setIsPending(false)
        setError('unable to fetch data')
      })
    // const filteredData = data.filter((c: CustType) => c._id === params._id)[0]
  }, [url])

  return [info, isPending, error]
}

export default useFetch
