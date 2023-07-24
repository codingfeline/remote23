import { Show, Hide, useState, ContactType } from '@components'

const page = ({ contact }: { contact: ContactType[] }) => {
  const [showContact, setshowContact] = useState(false)

  return (
    <div className="contact bg-blue-100">
      <div className="groupMaster group" onClick={() => setshowContact(prev => !prev)}>
        {showContact ? <Show className="groupSub" /> : <Hide className="groupSub" />}
        <span className="groupSub"> Contact</span>
      </div>
      <div className={`transIn ${!showContact && 'transOut'}`}>
        {contact.map(cont => (
          <div className="bg-blue-100 sub">
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
