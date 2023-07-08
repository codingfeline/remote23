import { Contact, Method, Server } from '@components'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col">
      home
      <Contact />
      <Server />
      <Method />
    </main>
  )
}
