import { useAppSelector } from '@components'
import { contact } from '@utils/types/customer'

const page = (contact: contact) => {
  const counter = useAppSelector(state => state.counter.value)
  return (
    <div className="contact">
      <h4>contact {counter}</h4>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" value={contact.name} />
      </div>
      <div className="item">
        <label htmlFor="email">email</label>
        <input type="text" value={contact.email} />
      </div>
      <div className="item">
        <label htmlFor="tel">tel</label>
        <input type="text" value={contact.tel} />
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
