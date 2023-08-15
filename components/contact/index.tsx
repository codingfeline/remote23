import { useState, ContactType, Edit } from '@components'
import ToggleHook from '@components/useToggle'
import { useRouter } from 'next/navigation'

const page = ({ contact, cid }: { contact: ContactType[]; cid: string }) => {
  const router = useRouter()
  const [showContact, setshowContact] = useState(true)
  const handleShowChange = (show: boolean) => {
    setshowContact(show)
  }

  return (
    <div className="contact bg-blue-100 border-blue-300">
      <ToggleHook
        onShowChange={handleShowChange}
        name="Contact"
        length={contact.length}
        compo="addContact"
        cid={cid}
      />
      <div className={`transIn ${!showContact && 'transOut'}`}>
        {contact.map(cont => {
          const id = cont._id
          return (
            <div key={cont._id} className="sub">
              <div className="bg-blue-100">
                <div className="flex justify-between">
                  <Edit onClick={() => router.push(`/editContact/${cid}/${id}`)} />
                </div>
                <div className="item">
                  <label htmlFor="name">name</label>
                  <input type="text" value={cont.name} readOnly />
                </div>
                <div className="item">
                  <label htmlFor="email">email</label>
                  <input type="text" value={cont.email} readOnly />
                </div>
                <div className="item">
                  <label htmlFor="tel">tel</label>
                  <input type="text" value={cont.tel} readOnly />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default page

// type contact = {
//   _id: string
//   name: string
//   tel: string
//   email: string
// }
