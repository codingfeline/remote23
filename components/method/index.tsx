// prettier-ignore
import { Copy, Edit, Plus, UserPass, useAppDispatch, increment, MethodType } from '@components'

const page = (method: MethodType) => {
  const dispatch = useAppDispatch()
  return (
    <div className="method">
      <div className="flex justify-between">
        <Edit />
        <Plus onClick={() => dispatch(increment())} />
      </div>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" id="name" value={method.methodName} />
        <Copy />
      </div>
      <div className="item">
        <label htmlFor="url">URL</label>
        <input type="text" value={method.url} />
      </div>
      <div className="item">
        <label htmlFor="notes"></label>
        <textarea name="" id="notes" cols={30} rows={3}>
          {method.notes}
        </textarea>
      </div>
      <UserPass />
    </div>
  )
}

export default page
