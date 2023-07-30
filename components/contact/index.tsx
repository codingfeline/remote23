import { useState, ContactType } from '@components'
import ToggleHook from '@components/useToggle'

const page = ({ contact }: { contact: ContactType[] }) => {
  const [showContact, setshowContact] = useState(contact.length ? true : false)

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
      />
      <div className={`transIn ${!showContact && 'transOut'}`}>
        {contact.map(cont => (
          <div key={cont._id} className="sub">
            <div className="bg-blue-100">
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
        ))}
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
