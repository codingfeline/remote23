import { Back, Link, Plus } from '@components'
import { useRouter } from 'next/navigation'

const BackButton = ({ cid }: { cid: string }) => {
  const router = useRouter()
  return (
    <Link
      href={`/cust/${cid}`}
      className="flex bg-gray-100 border border-gray-300 hover:border-gray-400 hover:bg-gray-100 mt-2 p-2 rounded-md w-2/5 justify-center items-center text-gray-500 grow select-none"
    >
      <Back className="text-gray-500 hover:text-gray-500 text-[20px] " />
      Back
    </Link>
  )
}

export default BackButton
