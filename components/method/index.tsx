// prettier-ignore
import { Copy, Edit, Plus, UserPass, useAppDispatch, increment, MethodInfoType } from '@components'

const page = (method: MethodInfoType) => {
  const dispatch = useAppDispatch()
  return (
    <div className="method bg-yellow-100">
      <div className="flex justify-between">
        <Edit />
        <Plus onClick={() => dispatch(increment())} />
      </div>
      <div className="item">
        <label htmlFor="name">name</label>
        <input type="text" id="name" value={method.methodName} />
        <Copy onClick={() => alert([method._id, method.methodName])} />
      </div>
      <div className="item">
        <label htmlFor="url">URL</label>
        <input type="text" value={method.url} />
      </div>
      <UserPass username={method.username} password={method.password} />
      <div className="item">
        <label htmlFor="notes"></label>
        <textarea name="" id="notes" cols={30} rows={3}>
          {method.notes}
        </textarea>
      </div>
    </div>
  )
}

export default page
