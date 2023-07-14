import { useAppSelector } from '@components'
import { ContactType } from '@utils/types/customer'

const page = (contact: ContactType) => {
  const counter = useAppSelector(state => state.counter.value)
  return (
    <div className="contact bg-blue-100">
      <h4>contact</h4>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" value={contact.name} readOnly />
      </div>
      <div className="item">
        <label htmlFor="email">email</label>
        <input type="text" value={contact.email} readOnly />
      </div>
      <div className="item">
        <label htmlFor="tel">tel</label>
        <input type="text" value={contact.tel} readOnly />
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
