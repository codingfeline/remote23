'use client'
import { useRouter } from 'next/navigation'

const UseBack = () => {
  const router = useRouter()
  return (
    <div className="flex justify-center">
      <a href="#" className="link" onClick={() => router.back()}>
        go back
      </a>
    </div>
  )
}

export default UseBack
